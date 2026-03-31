/*
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:01:44
 * @LastEditTime: 2026-03-31 16:13:13
 * @LastEditors: linkaiyan
 * @Description:
 */
import { resolve } from 'node:path'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImportDeps from './vite/plugins/autoImport'
import AutoRegistryComponents from './vite/plugins/components'
import AutoPages from './vite/plugins/pages'
import transformCss from './vite/plugins/postcss'
import { createSharedVendorPlugin, readSharedVendorConfig } from './vite/plugins/sharedVendor'
import initVConsole from './vite/plugins/vConsole'
import vaildParams from './vite/utils/vaildParams'

// Parse the current activity path from the CLI arguments.
const argv = process.argv
const appPath = vaildParams(argv[argv.length - 1])

export default defineConfig((ctx) => {
  const env = loadEnv(ctx.mode, resolve(__dirname), '')
  const customEntry = appPath ? resolve(__dirname, `${appPath}`) : ''
  const outDir = resolve(__dirname, `dist/${appPath}`)
  const sharedVendor = readSharedVendorConfig(resolve(__dirname), env)
  const isDev = ctx.mode === 'development'
  const isTest = ctx.mode === 'test'
  const shouldUseLegacy = !isDev

  return {
    base: './',
    assetsInclude: ['**/*.svga'],
    plugins: [
      vue(),
      isDev && vueDevTools(),
      AutoImportDeps(),
      AutoRegistryComponents(),
      AutoPages(),
      UnoCSS(),
      isTest && initVConsole(),
      shouldUseLegacy && legacy(),
      createSharedVendorPlugin(sharedVendor),
    ].filter(Boolean),
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
    envDir: resolve(__dirname),
    build: {
      outDir,
      rollupOptions: {
        input: resolve(customEntry, 'index.html'),
        external: sharedVendor.external,
        output: {
          manualChunks: (id) => {
            if (!id.includes('node_modules'))
              return

            const normalizedId = id.replace(/\\/g, '/')

            if (normalizedId.includes('/@sentry/'))
              return 'vendor-sentry'

            if (normalizedId.includes('/vant/'))
              return 'vendor-vant'

            return 'vendor'
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },

    server: {
      host: '0.0.0.0',
      port: 9999,
    },

    preview: {
      open: false,
      port: 8888,
    },
  }
})
