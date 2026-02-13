/*
 * @Author: linkaiyan
 * @Date: 2025-09-12 11:45:33
 * @LastEditTime: 2026-01-15 11:38:58
 * @LastEditors: linkaiyan
 * @Description:
 */
import { existsSync, readdirSync } from 'node:fs'
import { extname, resolve } from 'node:path'
import { input, select } from '@inquirer/prompts'
import Fontmin from 'fontmin'
import pc from 'picocolors'
import vaildParams from '../vite/utils/vaildParams'

async function main() {
  const argv = process.argv
  const appPath = vaildParams(argv[argv.length - 1])

  const inputPath = resolve(appPath)

  // 检查 fonts 目录是否存在
  const fontsDir = resolve(inputPath, 'fonts')

  if (!existsSync(fontsDir)) {
    console.error(pc.red(`字体目录不存在: ${fontsDir}`))
    process.exit(1)
  }

  // 读取 fonts 目录下的所有字体文件
  const fontExtensions = ['.ttf', '.otf', '.woff', '.woff2', '.eot']
  const files = readdirSync(fontsDir)
  const fontFiles = files.filter((file) => {
    const extension = extname(file).toLowerCase()
    return fontExtensions.includes(extension)
  })

  if (fontFiles.length === 0) {
    console.error(pc.red(`字体目录中没有找到字体文件: ${fontsDir}`))
    console.warn(pc.yellow(`支持的字体格式: ${fontExtensions.join(', ')}`))
    process.exit(1)
  }

  // 让用户选择一个字体文件
  const selectedFont = await select({
    message: pc.green('请选择要压缩的字体文件'),
    choices: fontFiles.map(file => ({
      name: file,
      value: resolve(fontsDir, file),
    })),
  })

  const retainTxt = await input({
    message: pc.green('请输入需要保留的文字'),
    validate: (v: string) => v ? true : '保留文字不能为空',
  })

  // 使用 Fontmin 压缩字体
  const fontmin = new Fontmin()
    .src(selectedFont)
    .use(Fontmin.glyph({ text: retainTxt }))
    .dest(fontsDir)

  fontmin.run((err: Error | null) => {
    if (err) {
      console.error(pc.red('字体提取失败:'), err)
      process.exit(1)
    }

    console.warn(pc.green('字体提取成功，已生成新字体文件在'), pc.blue(fontsDir))
  })
}

main()
