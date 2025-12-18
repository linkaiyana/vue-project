/*
 * @Author: linkaiyan
 * @Date: 2025-12-18 10:17:44
 * @LastEditTime: 2025-12-18 14:55:59
 * @LastEditors: linkaiyan
 * @Description:
 */
import { execSync } from 'child_process'
import { argv } from 'process'
import ora from 'ora'
import vaildParams from '../vite/utils/vaildParams'

// 执行的命令
const command = argv[2]

// 执行参数
const params = argv[argv.length - 1]

// 入口
const basePath = vaildParams(params)

switch (command) {
  case 'build':
    let loadingTxt = 'start type-check...'
    const spinner = ora(loadingTxt).start()
    execSync(`vue-tsc --noEmit -p ${basePath}/tsconfig.json`, { stdio: 'inherit' })
    spinner.color = 'green'
    spinner.succeed('check success')
    loadingTxt = 'start building...'
    spinner.start(loadingTxt)

    execSync(`vite build --emptyOutDir -- ${params}`, { stdio: 'inherit' })
    spinner.succeed('build done')
    break
  case 'check':
    console.log('start type-check...')
    execSync(`vue-tsc --noEmit -p ${basePath}/tsconfig.json`, { stdio: 'inherit' })
    console.log('check done')
    break
  case 'lint':
    execSync(`eslint ${basePath} --cache`, { stdio: 'inherit' })
    break
  case 'lint:fix':
    execSync(`eslint ${basePath} --fix --cache`, { stdio: 'inherit' })
    break
  case 'preview':
    execSync(`vite preview --outDir dist/${basePath}`, { stdio: 'inherit' })
    break
  default:
    console.error(`Unknown command: ${command}`)
    process.exit(1)
}
