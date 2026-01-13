/*
 * @Author: linkaiyan
 * @Date: 2025-12-18 16:09:59
 * @LastEditTime: 2026-01-13 11:24:53
 * @LastEditors: linkaiyan
 * @Description: 自动导入依赖
 */
import { resolve } from 'node:path'
import { VantResolver } from '@vant/auto-import-resolver'
import AutoImport from 'unplugin-auto-import/vite'

function AutoImportDeps() {
  return AutoImport({
    dts: resolve(process.cwd(), 'types/auto-imports.d.ts'),
    imports: ['vue', 'vue-router', 'pinia'],
    resolvers: [VantResolver()],
    dirs: [],
    vueTemplate: true,
  })
}

export default AutoImportDeps
