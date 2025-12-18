/*
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:01:44
 * @LastEditTime: 2025-12-18 16:35:36
 * @LastEditors: linkaiyan
 * @Description:
 */
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path'
import vaildParams from './vite/utils/vaildParams'
import AutoImportDeps from './vite/plugins/autoImport'
import AutoRegistryComponents from './vite/plugins/components'

// 解析命令行参数，获取 appPath
const argv = process.argv.slice(0)

const appPath = vaildParams(argv[argv.length - 1])

console.log('%c [ appPath ]-12', 'font-size:13px; background:pink; color:#bf2c9f;', appPath)

export default defineConfig((ctx) => {
  console.log('%c [ command ]-22', 'font-size:13px; background:pink; color:#bf2c9f;', ctx)
  // 如果提供了应用路径参数，则使用指定路径作为入口
  const customEntry = appPath ? resolve(__dirname, `${appPath}`) : undefined

  return {
    plugins: [vue(), vueDevTools(), AutoImportDeps(), AutoRegistryComponents()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'common'),
        '@CC': resolve(__dirname, 'common/components'),
        '@CF': resolve(__dirname, 'common/fonts'),
        '@CU': resolve(__dirname, 'common/utils'),
        '@CS': resolve(__dirname, 'common/store'),

        '@PF': resolve(__dirname, `${appPath}`),
        '@PFC': resolve(__dirname, `${appPath}/components`),
        '@PFF': resolve(__dirname, `${appPath}/fonts`),
        '@PFU': resolve(__dirname, `${appPath}/utils`),
        '@PFS': resolve(__dirname, `${appPath}/store`),
      },
    },
    root: ctx.isPreview ? '' : `${appPath}`,
    build: {
      outDir: resolve(__dirname, `dist/${appPath}`),
      rollupOptions: {
        input: resolve(customEntry, 'index.html'),
      },
    },

    preview: {
      open: true,
      port: 8888,
    },
  }
})
