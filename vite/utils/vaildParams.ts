/*
 * @Author: linkaiyan
 * @Date: 2025-12-18 11:40:43
 * @LastEditTime: 2025-12-18 14:53:56
 * @LastEditors: linkaiyan
 * @Description:
 */
import { resolve } from 'path'
import { existsSync } from 'fs'

const vaildParams = (params: string) => {
  const pathSegments = params.split(':')

  const directoryPath = pathSegments.join('/')
  const htmlPath = resolve(directoryPath, 'index.html')
  console.log('%c [ htmlPath ]-12', 'font-size:13px; background:pink; color:#bf2c9f;', htmlPath)

  const exists = existsSync(htmlPath)

  if (exists) {
    console.log(`当前入口：${directoryPath}`)
    return directoryPath
  } else {
    console.error(`无效的入口：${directoryPath}`)
    process.exit(1)
  }
}

export default vaildParams
