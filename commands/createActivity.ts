import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { checkbox, confirm, input, select } from '@inquirer/prompts'
import pc from 'picocolors'

interface CreateActivityOptions {
  selectedApp: string
  folder: string
  folderName: string
  activityTitle: string
  needI18n: boolean
  targetRelativePath: string
  selectedLanguages: string[]
}

async function createActivity() {
  console.warn(pc.cyan('\n🚀 开始创建新活动...\n'))

  // --- 1. 交互询问 ---
  const folderName = await input({
    message: pc.blue('请输入文件夹名称 (用于路径):'),
    validate: val => /^\w+$/.test(val) ? true : pc.red('只允许字母、数字、下划线'),
  })

  const activityTitle = await input({
    message: pc.blue('请输入活动显示名称 (HTML Title):'),
    default: folderName,
  })

  const selectedApp = await select({
    message: pc.blue('请选择所属应用:'),
    choices: [{ name: 'dino', value: 'dino' }],
  })

  const appPath = path.join(selectedApp)
  const availableFolders = fs.existsSync(appPath)
    ? fs.readdirSync(appPath, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)
    : []

  const folderChoice = await select({
    message: pc.blue('请选择父级目录:'),
    choices: [
      ...availableFolders.map(f => ({ name: f, value: f })),
      { name: pc.magenta('+ 新建目录'), value: 'new' },
    ],
  })

  const folder = folderChoice === 'new'
    ? await input({ message: pc.blue('请输入新目录名:'), validate: v => v.trim() ? true : '必填' })
    : folderChoice

  const targetPath = path.join(selectedApp, folder, folderName)
  if (fs.existsSync(targetPath)) {
    console.error(pc.red(`\n❌ 错误：路径 ${targetPath} 已存在`))
    process.exit(1)
  }

  const needI18n = await confirm({ message: pc.blue('是否启用 i18n 国际化？') })

  let selectedLanguages: string[] = []
  if (needI18n) {
    selectedLanguages = await checkbox({
      message: pc.blue('请选择需要的语言包:'),
      choices: [
        { name: 'zh-CN', value: 'zh-CN', checked: false },
        { name: 'zh-TW', value: 'zh-TW', checked: false },
        { name: 'vi-VN', value: 'vi-VN', checked: false },
        { name: 'ko-KR', value: 'ko-KR', checked: false },
        { name: 'en-US', value: 'en-US', checked: false },
      ],
      required: true,
    })
  }

  // --- 2. 生成阶段 ---
  try {
    console.warn(pc.gray('\n正在处理并生成文件...'))
    fs.mkdirSync(targetPath, { recursive: true })

    const options: CreateActivityOptions = {
      selectedApp,
      folder,
      folderName,
      activityTitle,
      needI18n,
      targetRelativePath: targetPath,
      selectedLanguages,
    }

    const activityName = [options.selectedApp, options.folder, options.folderName].join(':')

    copyAndProcessTemplate('template', targetPath, options)

    console.warn(`\n${pc.green('─'.repeat(45))}`)
    console.warn(pc.green('✨ 活动创建成功！'))
    console.warn(`${pc.bold('📂 目录路径:')} ${pc.cyan(targetPath)}`)
    console.warn(`${pc.bold('🏷️  页面标题:')} ${pc.cyan(activityTitle)}`)
    console.warn(`${pc.bold('🌍 国际化:')}   ${needI18n ? pc.green(`已启用 (${selectedLanguages.join(', ')})`) : pc.gray('未启用')}`)
    console.warn(`${pc.green('─'.repeat(45))}\n`)

    // --- 3. 运行询问 ---
    const shouldRun = await confirm({
      message: pc.yellow(`是否立即运行该活动？(pnpm dev ${targetPath})`),
      default: true,
    })

    if (shouldRun) {
      console.warn(pc.cyan(`\n🚀 启动服务中...\n`))
      spawn('pnpm', ['dev', activityName], { stdio: 'inherit', shell: true })
    }
  }
  catch (err) {
    console.error(pc.red('\n❌ 创建失败:'), err)
  }
}

/** 内容替换 */
function processFile(sourcePath: string, targetPath: string, fileName: string, options: CreateActivityOptions) {
  const textExtensions = ['.ts', '.js', '.vue', '.json', '.html', '.scss', '.css']
  if (!textExtensions.includes(path.extname(fileName))) {
    fs.copyFileSync(sourcePath, targetPath)
    return
  }

  let content = fs.readFileSync(sourcePath, 'utf-8')

  switch (fileName) {
    case 'constants.ts': {
      const languagesArrayStr = options.selectedLanguages.length > 0
        ? `[${options.selectedLanguages.map(lang => `'${lang}'`).join(', ')}]`
        : '[]'
      const activityName = [options.selectedApp, options.folder, options.folderName].join(':')

      content = content
        .replace(/'\{\{FOLDER_NAME\}\}'/g, `'${activityName}'`)
        .replace(/Boolean\('\{\{IS_USE_I18N\}\}'\)/g, String(options.needI18n))
        .replace(/'\{\{LANGUAGES_LIST\}\}'/g, languagesArrayStr)
      break
    }
    case 'index.html': {
      content = content.includes('{{TITLE}}')
        ? content.replace(/\{\{TITLE\}\}/g, options.activityTitle)
        : content.replace(/<title>[\s\S]*?<\/title>/i, `<title>${options.activityTitle}</title>`)
      break
    }
    case 'main.ts': {
      content = processConditionalBlocks(content, {
        needI18n: options.needI18n,
      })
      break
    }
    case 'tsconfig.json': {
      const depth = options.targetRelativePath.split(path.sep).length
      content = content.replace(/\.\.\//g, '../'.repeat(depth))
      break
    }
  }
  fs.writeFileSync(targetPath, content, 'utf-8')
}
/**
 * 递归复制
 */
function copyAndProcessTemplate(source: string, target: string, options: CreateActivityOptions) {
  const files = fs.readdirSync(source)
  for (const file of files) {
    if (file === 'components') continue
    const sourcePath = path.join(source, file)
    const targetPath = path.join(target, file)
    if (fs.statSync(sourcePath).isDirectory()) {
      if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath, { recursive: true })
      copyAndProcessTemplate(sourcePath, targetPath, options)
    }
    else {
      processFile(sourcePath, targetPath, file, options)
    }
  }
}

function processConditionalBlocks(content: string, flags: Record<string, boolean>) {
  const regex = /\/\/\s*<%\s*if\s*\((\w+)\)\s*%>\n?([\s\S]*?)\/\/\s*<%\s*endif\s*%>\n?/g
  return content.replace(regex, (_, key, blockContent) => flags[key] ? blockContent : '')
}

createActivity()
