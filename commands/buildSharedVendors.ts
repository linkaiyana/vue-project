import { createHash } from 'node:crypto'
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pc from 'picocolors'

type SharedVendorName = 'vue' | 'vue-router' | 'vue-i18n' | 'svga' | 'pinia'
type SharedVendorFormat = 'esm' | 'global'

interface SharedVendorConfig {
  source: string
  fileName: string
  format: SharedVendorFormat
  specifier?: string
  global?: string
}

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

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const outputRoot = path.resolve(projectRoot, '.shared-dist')
const outputDir = path.join(outputRoot, 'vendor')
const remotePrefix = normalizePath(process.env.SHARED_VENDOR_REMOTE_PREFIX || 'shared/vendor')

const sharedVendorConfigs: Record<SharedVendorName, SharedVendorConfig> = {
  'vue': {
    source: 'dist/vue.runtime.esm-browser.prod.js',
    fileName: 'vue.runtime.esm-browser.prod.js',
    format: 'esm',
    specifier: 'vue',
  },
  'vue-router': {
    source: 'dist/vue-router.esm-browser.prod.js',
    fileName: 'vue-router.esm-browser.prod.js',
    format: 'esm',
    specifier: 'vue-router',
  },
  'vue-i18n': {
    source: 'dist/vue-i18n.runtime.esm-browser.prod.js',
    fileName: 'vue-i18n.runtime.esm-browser.prod.js',
    format: 'esm',
    specifier: 'vue-i18n',
  },
  'svga': {
    source: 'dist/index.esm.min.js',
    fileName: 'index.esm.min.js',
    format: 'esm',
    specifier: 'svga',
  },
  'pinia': {
    source: 'dist/pinia.iife.prod.js',
    fileName: 'pinia.iife.prod.js',
    format: 'global',
    global: 'Pinia',
  },
}

function normalizePath(value: string) {
  return value.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '')
}

function resolvePackageRoot(packageName: string) {
  const packageJsonPath = require.resolve(`${packageName}/package.json`)
  return path.dirname(packageJsonPath)
}

function readPackageVersion(packageName: string) {
  const packageJsonPath = require.resolve(`${packageName}/package.json`)
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as { version: string }
  return packageJson.version
}

function ensureFileExists(filePath: string, label: string) {
  if (!existsSync(filePath))
    throw new Error(`Missing ${label}: ${filePath}`)
}

function sha256(filePath: string) {
  const buffer = readFileSync(filePath)
  return createHash('sha256').update(buffer).digest('hex')
}

function prepareOutputDirectory() {
  rmSync(outputRoot, { recursive: true, force: true })
  mkdirSync(outputDir, { recursive: true })
}

function buildManifest() {
  const manifest: Record<string, SharedVendorManifestItem> = {}

  for (const [packageName, config] of Object.entries(sharedVendorConfigs) as Array<[SharedVendorName, SharedVendorConfig]>) {
    const version = readPackageVersion(packageName)
    const packageRoot = resolvePackageRoot(packageName)
    const sourcePath = path.join(packageRoot, config.source)

    ensureFileExists(sourcePath, `${packageName} browser build`)

    const vendorOutputDir = path.join(outputDir, packageName, version)
    const outputFilePath = path.join(vendorOutputDir, config.fileName)

    mkdirSync(vendorOutputDir, { recursive: true })
    cpSync(sourcePath, outputFilePath)

    const size = readFileSync(outputFilePath).byteLength
    const remotePath = `${remotePrefix}/${packageName}/${version}/${config.fileName}`

    manifest[packageName] = {
      version,
      fileName: config.fileName,
      path: remotePath,
      size,
      sha256: sha256(outputFilePath),
      format: config.format,
      specifier: config.specifier,
      global: config.global,
    }

    console.warn(
      `${pc.green('√')} ${pc.bold(packageName)} ${pc.dim(version)} -> ${pc.cyan(normalizePath(path.relative(projectRoot, outputFilePath)))}`,
    )
  }

  const manifestPath = path.join(outputDir, 'manifest.json')
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf-8')
  console.warn(`${pc.green('√')} manifest -> ${pc.cyan(normalizePath(path.relative(projectRoot, manifestPath)))}`)
}

function main() {
  console.warn(pc.cyan('\nBuilding shared vendor assets...\n'))
  prepareOutputDirectory()
  buildManifest()
  console.warn(pc.green(`\nShared vendor assets are ready in ${normalizePath(path.relative(projectRoot, outputDir))}\n`))
}

main()
