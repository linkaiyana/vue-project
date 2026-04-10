/*
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:01:44
 * @LastEditTime: 2026-04-10 17:07:54
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

  const normalizedAppPath = appPath ? appPath.replace(/\\/g, '/') : ''
  const isYunxiaoPipeline = Boolean(process.env.PIPELINE_ID && process.env.BUILD_NUMBER)
  const shouldUseAbsoluteAssetBase = ctx.command === 'build' && isYunxiaoPipeline
  const sharedVendorBaseUrl = env.VITE_CDN_URL || process.env.VITE_CDN_URL || ''
  const sharedVendor = readSharedVendorConfig(resolve(__dirname), env)

  return {
    base: normalizedAppPath ? `/${normalizedAppPath}/` : '/',
    assetsInclude: ['**/*.svga'],
    plugins: createVitePlugin(sharedVendor, ctx.mode),
    resolve: {
      alias: createViteAlias(__dirname, appPath),
    },
    css: transformCss(),
    root: ctx.isPreview ? '' : `${appPath}`,
    envDir: resolve(__dirname),
    build: createViteBuild(__dirname, appPath, sharedVendor),
    experimental: {
      renderBuiltUrl(filename) {
        if (!shouldUseAbsoluteAssetBase)
          return

        return joinUrl(sharedVendorBaseUrl, `${normalizedAppPath}/${filename}`)
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
