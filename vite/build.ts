/*
 * @Author: linkaiyan
 * @Date: 2026-04-07 10:27:39
 * @LastEditTime: 2026-04-09 15:33:30
 * @LastEditors: linkaiyan
 * @Description:
 */
import type { BuildOptions } from 'vite'
import type { SharedVendorRuntimeConfig } from './plugins/sharedVendor'
import { resolve } from 'node:path'

// unplugin-auto-import 和 external导致的警告，忽略
function shouldIgnoreWarning(warning: { code?: string, message: string }) {
  return warning.code === 'UNUSED_EXTERNAL_IMPORT'
    && warning.message.includes('"resolveComponent" is imported from external module "vue" but never used')
}

function manualChunks(id: string) {
  if (!id.includes('node_modules'))
    return

  const normalizedId = id.replace(/\\/g, '/')

  if (normalizedId.includes('/@sentry/'))
    return 'vendor-sentry'

  if (normalizedId.includes('/vant/'))
    return 'vendor-vant'

  return 'vendor'
}

export default (
  rootDir: string,
  appPath: string,
  sharedVendor: SharedVendorRuntimeConfig,
): BuildOptions => {
  const customEntry = appPath ? resolve(rootDir, appPath) : ''
  const outDir = resolve(rootDir, `dist/${appPath}`)

  return {
    outDir,
    rollupOptions: {
      input: resolve(customEntry, 'index.html'),
      external: sharedVendor.external,
      onwarn(warning, warn) {
        if (shouldIgnoreWarning(warning))
          return

        warn(warning)
      },
      output: {
        manualChunks,
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  }
}
