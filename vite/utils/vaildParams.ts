/*
 * @Author: linkaiyan
 * @Date: 2025-12-18 11:40:43
 * @LastEditTime: 2026-01-12 16:40:03
 * @LastEditors: linkaiyan
 * @Description:
 */
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

function vaildParams(params: string) {
  const pathSegments = params.split(':')

  const directoryPath = pathSegments.join('/')
  const htmlPath = resolve(directoryPath, 'index.html')

  const exists = existsSync(htmlPath)

  if (exists) {
    return directoryPath
  }
  else {
    console.error(`无效的入口：${directoryPath}`)
    process.exit(1)
  }
}

export default vaildParams
