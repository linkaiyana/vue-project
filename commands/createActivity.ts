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
  selectedComponents: string[]
}

function getTemplateComponents(dir = path.join('template', 'components'), baseDir = dir) {
  if (!fs.existsSync(dir))
    return []

  const result: Array<{ name: string, value: string, checked: false }> = []

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/')

    if (entry.isDirectory()) {
      result.push(...getTemplateComponents(fullPath, baseDir))
    }
    else {
      result.push({
        name: relativePath,
        value: relativePath,
        checked: false,
      })
    }
  }

  return result
}

function copyDirectory(source: string, target: string) {
  fs.mkdirSync(target, { recursive: true })
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name)
    const targetPath = path.join(target, entry.name)

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, targetPath)
    }
    else {
      fs.copyFileSync(sourcePath, targetPath)
    }
  }
}

function copySelectedComponents(targetPath: string, selectedComponents: string[]) {
  if (!selectedComponents.length)
    return

  const sourceRoot = path.join('template', 'components')
  const targetRoot = path.join(targetPath, 'components')

  fs.mkdirSync(targetRoot, { recursive: true })

  for (const componentPath of selectedComponents) {
    const sourcePath = path.join(sourceRoot, componentPath)
    const targetComponentPath = path.join(targetRoot, componentPath)

    if (!fs.existsSync(sourcePath))
      continue

    const stat = fs.statSync(sourcePath)
    if (stat.isDirectory()) {
      copyDirectory(sourcePath, targetComponentPath)
    }
    else {
      fs.mkdirSync(path.dirname(targetComponentPath), { recursive: true })
      fs.copyFileSync(sourcePath, targetComponentPath)
    }
  }
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
    ? await input({
        message: pc.blue('请输入新目录名'),
        validate: v => v.trim() ? true : '必填',
      })
    : folderChoice

  const targetPath = path.join(selectedApp, folder, folderName)
  if (fs.existsSync(targetPath)) {
    console.error(pc.red(`\n❌ 错误：路径 ${targetPath} 已存在`))
    process.exit(1)
  }

  const needI18n = await confirm({
    message: pc.blue('是否启用 i18n 国际化？'),
  })

  // --- 2. 生成阶段 ---
  const templateComponents = getTemplateComponents()
  const selectedComponents = templateComponents.length
    ? await checkbox({
        message: pc.blue('请选择活动模板组件:'),
        choices: templateComponents,
        required: false,
      })
    : []

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
      selectedComponents,
    }

    const activityName = [options.selectedApp, options.folder, options.folderName].join(':')

    copyAndProcessTemplate('template', targetPath, options)
    copySelectedComponents(targetPath, selectedComponents)

    console.warn(`\n${pc.green('─'.repeat(45))}`)
    console.warn(pc.green('✨ 活动创建成功！'))
    console.warn(`${pc.bold('📂 目录路径:')} ${pc.cyan(targetPath)}`)
    console.warn(`${pc.bold('🏷️  页面标题:')} ${pc.cyan(activityTitle)}`)
    console.warn(`${pc.bold('🌍 国际化:')}   ${needI18n ? pc.green(`已启用`) : pc.gray('未启用')}`)
    console.warn(`${pc.bold('🧩 模板组件:')} ${selectedComponents.length ? pc.green(selectedComponents.join(', ')) : pc.gray('未选择')}`)
    console.warn(`${pc.green('─'.repeat(45))}\n`)

    // --- 3. 运行询问 ---
    const shouldRun = await confirm({
      message: pc.yellow(`是否立即运行该活动？(pnpm dev ${activityName})`),
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
      const activityName = [options.selectedApp, options.folder, options.folderName].join(':')

      content = content
        .replace(/'\{\{FOLDER_NAME\}\}'/g, `'${activityName}'`)
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
    if (file === 'components')
      continue

    const sourcePath = path.join(source, file)
    const targetPath = path.join(target, file)

    if (fs.statSync(sourcePath).isDirectory()) {
      if (!fs.existsSync(targetPath))
        fs.mkdirSync(targetPath, { recursive: true })
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
