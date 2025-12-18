import { VantResolver } from '@vant/auto-import-resolver'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'

/**
 * @name AutoImportDeps
 * @description 按需加载，自动引入方法
 */
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
