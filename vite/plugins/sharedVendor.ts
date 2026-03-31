import type { Plugin } from 'vite'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

type SharedVendorFormat = 'esm' | 'global'

interface SharedVendorManifestItem {
  version: string
  fileName: string
  path: string
  size: number
  sha256: string
  format: SharedVendorFormat
  specifier?: string
  global?: string
}

interface SharedVendorRuntimeConfig {
  enabled: boolean
  external: string[]
  importMap: Record<string, string>
}

function normalizePath(value: string) {
  return value.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '')
}

function joinUrl(baseUrl: string, relativePath: string) {
  return `${baseUrl.replace(/\/+$/g, '')}/${normalizePath(relativePath)}`
}

function readSharedVendorManifest(projectRoot: string) {
  const manifestPath = resolve(projectRoot, '.shared-dist/vendor/manifest.json')
  if (!existsSync(manifestPath))
    return null

  return JSON.parse(readFileSync(manifestPath, 'utf-8')) as Record<string, SharedVendorManifestItem>
}

function readSharedVendorConfig(projectRoot: string, env: Record<string, string>) {
  const manifest = readSharedVendorManifest(projectRoot)
  const sharedVendorBaseUrl = normalizePath(env.VITE_SHARED_VENDOR_BASE_URL || process.env.VITE_SHARED_VENDOR_BASE_URL || '')

  if (!manifest) {
    return {
      enabled: false,
      external: [],
      importMap: {},
    } satisfies SharedVendorRuntimeConfig
  }

  if (!sharedVendorBaseUrl) {
    throw new Error('Missing VITE_SHARED_VENDOR_BASE_URL. Publish shared vendors first and configure the shared vendor base URL before building activities.')
  }

  const esmEntries = Object.values(manifest).filter(
    item => item.format === 'esm' && item.specifier,
  )

  return {
    enabled: esmEntries.length > 0,
    external: esmEntries.map(item => item.specifier!),
    importMap: Object.fromEntries(
      esmEntries.map(item => [item.specifier!, joinUrl(sharedVendorBaseUrl, item.path)]),
    ),
  } satisfies SharedVendorRuntimeConfig
}

function createSharedVendorPlugin(sharedVendor: SharedVendorRuntimeConfig): Plugin {
  return {
    name: 'shared-vendor-importmap',
    apply: 'build',
    transformIndexHtml(html) {
      if (!sharedVendor.enabled)
        return html
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: { type: 'importmap' },
            children: `${JSON.stringify({ imports: sharedVendor.importMap }, null, 2)}`,
            injectTo: 'head-prepend',
          },
        ],
      }
    },
  }
}

export {
  createSharedVendorPlugin,
  readSharedVendorConfig,
}
