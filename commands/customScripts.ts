import { spawn } from 'node:child_process'
import { argv } from 'node:process'
import ora from 'ora'
import pc from 'picocolors'
// 假设你的路径校验工具
import vaildParams from '../vite/utils/vaildParams'

// 1. 解析参数
const command = argv[2]
const params = argv[argv.length - 1]
const basePath = vaildParams(params)

// 注入全局环境变量，供 vite.config.ts 使用
process.env.CURRENT_ACTIVITY_PATH = basePath

/**
 * 封装 spawn 为 Promise，解决 ora 动画卡顿并实时打印日志
 */
function runCommand(cmd: string, args: string[]) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env },
    })

    child.on('close', (code) => {
      if (code === 0) resolve(code)
      else reject(new Error(`命令执行失败: ${cmd} ${args.join(' ')}`))
    })

    child.on('error', err => reject(err))
  })
}

/**
 * 主逻辑
 */
async function main() {
  console.warn(pc.cyan(`\n🛠️  正在执行任务: ${pc.bold(command)} | 目标: ${pc.bold(basePath)}\n`))

  const spinner = ora()

  try {
    switch (command) {
      case 'build': {
        // --- 步骤 1: 类型检查 ---
        spinner.start(pc.blue('正在进行类型检查 (vue-tsc)...'))
        await runCommand('vue-tsc', ['--noEmit', '-p', `${basePath}/tsconfig.json`])
        spinner.succeed(pc.green('类型检查通过！'))

        // --- 步骤 2: Vite 构建 ---
        spinner.start(pc.blue('正在开始打包构建...'))
        await runCommand('vite', ['build', '--emptyOutDir', '--', params])

        console.warn(`\n${pc.green('─'.repeat(45))}`)
        spinner.succeed(pc.green('项目构建完成！'))
        console.warn(`${pc.bold('📂 输出目录:')} ${pc.cyan(`dist/${basePath}`)}`)
        console.warn(`${pc.green('─'.repeat(45))}\n`)
        break
      }

      case 'check': {
        console.warn(pc.yellow('开始项目类型检查...'))
        await runCommand('vue-tsc', ['--noEmit', '-p', `${basePath}/tsconfig.json`])
        console.warn(pc.green('✨ 检查完成，未发现错误。'))
        break
      }

      case 'lint':
      case 'lint:fix': {
        const isFix = command.includes('fix')
        spinner.start(pc.blue(isFix ? '正在修复代码格式...' : '正在检查代码格式...'))
        const args = [basePath, '--cache']
        if (isFix) args.push('--fix')

        await runCommand('eslint', args)
        spinner.succeed(pc.green(isFix ? '代码修复完成！' : '代码检查通过！'))
        break
      }

      case 'preview': {
        console.warn(pc.cyan('正在启动预览服务...'))
        await runCommand('vite', ['preview', '--outDir', `dist/${basePath}`])
        break
      }

      default: {
        console.error(pc.red(`❌ 未知命令: ${command}`))
        process.exit(1)
      }
    }
  }
  catch (error) {
    spinner.fail(pc.red('任务执行失败'))
    console.error(`\n${pc.red(error instanceof Error ? error.message : String(error))}`)
    process.exit(1)
  }
}

main()
