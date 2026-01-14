/*
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:01:44
 * @LastEditTime: 2026-01-14 16:24:56
 * @LastEditors: linkaiyan
 * @Description:
 */
import { resolve } from 'node:path'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImportDeps from './vite/plugins/autoImport'
import AutoRegistryComponents from './vite/plugins/components'
import AutoPages from './vite/plugins/pages'
import transformCss from './vite/plugins/postcss'
import vaildParams from './vite/utils/vaildParams'

// 解析命令行参数，获取 appPath
const argv = process.argv
const appPath = vaildParams(argv[argv.length - 1])

export default defineConfig((ctx) => {
  // 如果提供了应用路径参数，则使用指定路径作为入口
  const customEntry = appPath ? resolve(__dirname, `${appPath}`) : ''

  return {
    plugins: [
      vue(),
      vueDevTools(),
      AutoImportDeps(),
      AutoRegistryComponents(),
      AutoPages(),
      UnoCSS(),
      legacy(),
      visualizer({
        open: true, // 打包完成后自动打开分析页面
        filename: `dist/${appPath}/stats.html`, // 生成的分析文件名
        gzipSize: true, // 显示 gzip 后的体积
      }),
    ],
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
    css: transformCss(),
    root: ctx.isPreview ? '' : `${appPath}`,
    envDir: resolve(__dirname), // 强制 Vite 在项目根目录寻找环境文件
    build: {
      outDir: resolve(__dirname, `dist/${appPath}`),
      rollupOptions: {
        input: resolve(customEntry, 'index.html'),
        output: {
          // 这里的优化点：手动拆分大库
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              const name = id.toString().split('node_modules/')[1].split('/')[1]
              if (name.includes('vue-i18n')) return 'vendor-vue-i18n'
              if (name.includes('vue')) return 'vendor-vue'
              return 'vendor' // 其他第三方库
            }
          },
          // 用于保持 dist 目录结构整洁
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },

    preview: {
      open: true,
      port: 8888,
    },
  }
})
