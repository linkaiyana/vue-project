/*
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:01:44
 * @LastEditTime: 2026-04-07 10:59:16
 * @LastEditors: linkaiyan
 * @Description:
 */
import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import createViteAlias from './vite/alias'
import createViteBuild from './vite/build'
import createVitePlugin from './vite/plugins'
import transformCss from './vite/plugins/postcss'
import { readSharedVendorConfig } from './vite/plugins/sharedVendor'
import vaildParams from './vite/utils/vaildParams'

// Parse the current activity path from the CLI arguments.
const argv = process.argv
const appPath = vaildParams(argv[argv.length - 1])

function joinUrl(baseUrl: string, path: string) {
  return `${baseUrl.replace(/\/+$/g, '')}/${path.replace(/^\/+/, '')}`
}

export default defineConfig((ctx) => {
  const env = loadEnv(ctx.mode, resolve(__dirname), '')
  const activityBase = appPath ? `/${appPath.replace(/\\/g, '/')}/` : '/'
  const shouldUseAbsoluteAssetBase = ctx.command === 'build' && appPath === 'dino/2024/act1'
  const assetBase = shouldUseAbsoluteAssetBase
    ? joinUrl(env.VITE_SHARED_VENDOR_BASE_URL || process.env.VITE_SHARED_VENDOR_BASE_URL || '', activityBase)
    : activityBase
  const sharedVendor = readSharedVendorConfig(resolve(__dirname), env)

  return {
    base: assetBase,
    define: {
      __ACTIVITY_BASE_PATH__: JSON.stringify(activityBase),
    },
    assetsInclude: ['**/*.svga'],
    plugins: createVitePlugin(sharedVendor, ctx.mode),
    resolve: {
      alias: createViteAlias(__dirname, appPath),
    },
    css: transformCss(),
    root: ctx.isPreview ? '' : `${appPath}`,
    envDir: resolve(__dirname),
    build: createViteBuild(__dirname, appPath, sharedVendor),

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
