/*
 * @Author: linkaiyan
 * @Date: 2026-04-07 10:27:39
 * @LastEditTime: 2026-04-07 10:58:41
 * @LastEditors: linkaiyan
 * @Description:
 */
import type { BuildOptions } from 'vite'
import type { SharedVendorRuntimeConfig } from './plugins/sharedVendor'
import { resolve } from 'node:path'

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
      output: {
        manualChunks,
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  }
}
