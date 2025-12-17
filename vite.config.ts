/*
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:01:44
 * @LastEditTime: 2025-12-08 11:58:23
 * @LastEditors: linkaiyan
 * @Description:
 */
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path'

// 解析命令行参数，获取 appPath
const argv = process.argv.slice(0)

console.log('%c [ argv[0] ]-18', 'font-size:13px; background:pink; color:#bf2c9f;', argv[0])
console.log('%c [ argv[1] ]-18', 'font-size:13px; background:pink; color:#bf2c9f;', argv[1])
console.log('%c [ argv[2] ]-18', 'font-size:13px; background:pink; color:#bf2c9f;', argv[2])
console.log('%c [ argv[3] ]-18', 'font-size:13px; background:pink; color:#bf2c9f;', argv[3])
console.log('%c [ argv[4] ]-18', 'font-size:13px; background:pink; color:#bf2c9f;', argv[4])

const appPath = argv[4].replaceAll(':', '/')

console.log('%c [ appPath ]-12', 'font-size:13px; background:pink; color:#bf2c9f;', appPath)

export default defineConfig((ctx) => {
  console.log('%c [ command ]-22', 'font-size:13px; background:pink; color:#bf2c9f;', ctx)
  // 如果提供了应用路径参数，则使用指定路径作为入口
  const customEntry = appPath ? resolve(__dirname, `${appPath}`) : undefined
  console.log(
    '%c [ customEntry ]-25',
    'font-size:13px; background:pink; color:#bf2c9f;',
    customEntry,
    '=====',
  )

  return {
    plugins: [vue(), vueDevTools()],
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
    // 如果指定了路径，则设置自定义入口
    ...(customEntry && {
      root: ctx.isPreview ? '' : `${appPath}`,
      emptyOutDir: true,
      build: {
        outDir: resolve(__dirname, `dist/${appPath}`),
        rollupOptions: {
          input: resolve(customEntry, 'index.html'),
        },
      },
    }),
    preview: {
      open: true,
      port: 8888,
    },
  }
})
