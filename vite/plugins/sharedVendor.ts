import type { Plugin } from 'vite'
import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { resolve } from 'node:path'

type SharedVendorFormat = 'esm' | 'global'

export interface SharedVendorManifestSourceItem {
  version: string
  source: string
  fileName: string
  format: SharedVendorFormat
  specifier?: string
  global?: string
}

export interface SharedVendorRuntimeConfig {
  enabled: boolean
  external: string[]
  importMap: Record<string, string>
}

const require = createRequire(import.meta.url)

function normalizePath(value: string) {
  return value.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '')
}

function joinUrl(baseUrl: string, relativePath: string) {
  return `${baseUrl.replace(/\/+$/g, '')}/${normalizePath(relativePath)}`
}

function readManifestSource(projectRoot: string) {
  const manifestPath = resolve(projectRoot, 'sharedVendor.manifest.json')
  if (!existsSync(manifestPath))
    return null

  return JSON.parse(readFileSync(manifestPath, 'utf-8')) as Record<string, SharedVendorManifestSourceItem>
}

function readPackageVersion(packageName: string) {
  const packageJsonPath = require.resolve(`${packageName}/package.json`)
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as { version: string }
  return packageJson.version
}

function resolveConfiguredVersion(packageName: string, configuredVersion: string) {
  const installedVersion = readPackageVersion(packageName)
  if (installedVersion !== configuredVersion) {
    throw new Error(
      `Shared vendor version mismatch for ${packageName}: manifest=${configuredVersion}, installed=${installedVersion}. Update sharedVendor.manifest.json or reinstall dependencies.`,
    )
  }

  return configuredVersion
}

function readSharedVendorConfig(projectRoot: string, env: Record<string, string>) {
  const manifestSource = readManifestSource(projectRoot)
  const sharedVendorBaseUrl = normalizePath(env.VITE_SHARED_VENDOR_BASE_URL || process.env.VITE_SHARED_VENDOR_BASE_URL || '')
  const remotePrefix = normalizePath(process.env.SHARED_VENDOR_REMOTE_PREFIX || 'vendor')

  if (!manifestSource) {
    return {
      enabled: false,
      external: [],
      importMap: {},
    } satisfies SharedVendorRuntimeConfig
  }

  if (!sharedVendorBaseUrl) {
    throw new Error('Missing VITE_SHARED_VENDOR_BASE_URL. Publish shared vendors first and configure the shared vendor base URL before building activities.')
  }

  const esmEntries = Object.entries(manifestSource)
    .map(([packageName, config]) => ({
      packageName,
      ...config,
      version: resolveConfiguredVersion(packageName, config.version),
    }))
    .filter(item => item.format === 'esm' && item.specifier)

  return {
    enabled: esmEntries.length > 0,
    external: esmEntries.map(item => item.specifier!),
    importMap: Object.fromEntries(
      esmEntries.map(item => [
        item.specifier!,
        joinUrl(sharedVendorBaseUrl, `${remotePrefix}/${item.packageName}/${item.version}/${item.fileName}`),
      ]),
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
