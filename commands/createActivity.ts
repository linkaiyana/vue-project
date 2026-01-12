import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { confirm, input, select } from '@inquirer/prompts'
import pc from 'picocolors'

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
    console.error(pc.red(`\n❌ 错误: 路径 ${targetPath} 已存在`))
    process.exit(1)
  }

  const needI18n = await confirm({ message: pc.blue('是否启用 i18n 国际化?') })
  const useUnocss = await confirm({ message: pc.blue('是否启用 UnoCSS?'), default: true })

  // --- 2. 生成阶段 ---
  try {
    console.warn(pc.gray('\n正在处理并生成文件...'))
    fs.mkdirSync(targetPath, { recursive: true })

    const options = {
      folderName,
      activityTitle,
      needI18n,
      useUnocss,
      targetRelativePath: targetPath,
    }

    copyAndProcessTemplate('template', targetPath, options)

    console.warn(`\n${pc.green('─'.repeat(45))}`)
    console.warn(pc.green('✨ 活动创建成功！'))
    console.warn(`${pc.bold('📂 目录路径:')} ${pc.cyan(targetPath)}`)
    console.warn(`${pc.bold('🏷️ 页面标题:')} ${pc.cyan(activityTitle)}`)
    console.warn(`${pc.bold('🎨 UnoCSS:')}   ${useUnocss ? pc.green('已启用') : pc.gray('未启用')}`)
    console.warn(`${pc.bold('🌍 国际化:')}   ${needI18n ? pc.green('已启用') : pc.gray('未启用')}`)
    console.warn(`${pc.green('─'.repeat(45))}\n`)

    // --- 3. 运行询问 ---
    const shouldRun = await confirm({
      message: pc.yellow(`是否立即运行该活动? (pnpm dev ${targetPath})`),
      default: true,
    })

    if (shouldRun) {
      console.warn(pc.cyan(`\n🚀 启动服务中...\n`))
      spawn('pnpm', ['dev', targetPath], { stdio: 'inherit', shell: true })
    }
  }
  catch (err) {
    console.error(pc.red('\n❌ 创建失败:'), err)
  }
}

/** 核心处理器：修正了 constant.ts 的占位符替换 */
function processFile(sourcePath: string, targetPath: string, fileName: string, options: any) {
  const textExtensions = ['.ts', '.js', '.vue', '.json', '.html', '.scss', '.css']
  if (!textExtensions.includes(path.extname(fileName))) {
    fs.copyFileSync(sourcePath, targetPath)
    return
  }

  let content = fs.readFileSync(sourcePath, 'utf-8')

  switch (fileName) {
    case 'constant.ts': {
      // 替换逻辑：匹配 Boolean('...') 结构并替换为真正的 true/false
      content = content
        .replace(/'\{\{FOLDER_NAME\}\}'/g, `'${options.folderName}'`)
        .replace(/Boolean\('\{\{IS_USE_UNOCSS\}\}'\)/g, String(options.useUnocss))
        .replace(/Boolean\('\{\{IS_USE_I18N\}\}'\)/g, String(options.needI18n))
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
        useUnocss: options.useUnocss,
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
 * 递归复制函数
 */
function copyAndProcessTemplate(source: string, target: string, options: any) {
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
