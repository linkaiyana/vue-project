/*
 * @Author: linkaiyan
 * @Date: 2026-04-07 10:27:39
 * @LastEditTime: 2026-04-07 10:58:09
 * @LastEditors: linkaiyan
 * @Description:
 */
import type { AliasOptions } from 'vite'
import { resolve } from 'node:path'

export default (rootDir: string, appPath: string): AliasOptions => {
  return {
    '@': resolve(rootDir, 'common'),
    '@CC': resolve(rootDir, 'common/components'),
    '@CF': resolve(rootDir, 'common/fonts'),
    '@CU': resolve(rootDir, 'common/utils'),
    '@CS': resolve(rootDir, 'common/store'),

    '@PF': resolve(rootDir, appPath),
    '@PFC': resolve(rootDir, `${appPath}/components`),
    '@PFF': resolve(rootDir, `${appPath}/fonts`),
    '@PFU': resolve(rootDir, `${appPath}/utils`),
    '@PFS': resolve(rootDir, `${appPath}/store`),
  }
}
