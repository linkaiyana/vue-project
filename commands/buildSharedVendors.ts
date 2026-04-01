import { createHash } from 'node:crypto'
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pc from 'picocolors'

type SharedVendorFormat = 'esm' | 'global'

interface SharedVendorManifestSourceItem {
  version: string
  source: string
  fileName: string
  format: SharedVendorFormat
  specifier?: string
  global?: string
}

interface SharedVendorManifestRuntimeItem extends SharedVendorManifestSourceItem {
  version: string
  path: string
  size: number
  sha256: string
}

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const outputDir = path.resolve(projectRoot, 'dist/vendor')
const manifestSourcePath = path.resolve(projectRoot, 'sharedVendor.manifest.json')
const remotePrefix = normalizePath(process.env.SHARED_VENDOR_REMOTE_PREFIX || 'shared/vendor')

function normalizePath(value: string) {
  return value.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '')
}

function readManifestSource() {
  if (!existsSync(manifestSourcePath))
    throw new Error(`Missing shared vendor manifest source: ${manifestSourcePath}`)

  return JSON.parse(readFileSync(manifestSourcePath, 'utf-8')) as Record<string, SharedVendorManifestSourceItem>
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

function resolveConfiguredVersion(packageName: string, configuredVersion: string) {
  const installedVersion = readPackageVersion(packageName)
  if (installedVersion !== configuredVersion) {
    throw new Error(
      `Shared vendor version mismatch for ${packageName}: manifest=${configuredVersion}, installed=${installedVersion}. Update sharedVendor.manifest.json or reinstall dependencies.`,
    )
  }

  return configuredVersion
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
  rmSync(outputDir, { recursive: true, force: true })
  mkdirSync(outputDir, { recursive: true })
}

function buildSharedVendors() {
  const manifestSource = readManifestSource()
  const runtimeManifest: Record<string, SharedVendorManifestRuntimeItem> = {}

  for (const [packageName, config] of Object.entries(manifestSource)) {
    const version = resolveConfiguredVersion(packageName, config.version)
    const packageRoot = resolvePackageRoot(packageName)
    const sourcePath = path.join(packageRoot, config.source)

    ensureFileExists(sourcePath, `${packageName} browser build`)

    const vendorOutputDir = path.join(outputDir, packageName, version)
    const outputFilePath = path.join(vendorOutputDir, config.fileName)

    mkdirSync(vendorOutputDir, { recursive: true })
    cpSync(sourcePath, outputFilePath)

    const size = readFileSync(outputFilePath).byteLength
    const remotePath = `${remotePrefix}/${packageName}/${version}/${config.fileName}`

    runtimeManifest[packageName] = {
      ...config,
      version,
      path: remotePath,
      size,
      sha256: sha256(outputFilePath),
    }

    console.warn(
      `${pc.green('√')} ${pc.bold(packageName)} ${pc.dim(version)} -> ${pc.cyan(normalizePath(path.relative(projectRoot, outputFilePath)))}`,
    )
  }

  const runtimeManifestPath = path.join(outputDir, 'manifest.json')
  writeFileSync(runtimeManifestPath, `${JSON.stringify(runtimeManifest, null, 2)}\n`, 'utf-8')
  console.warn(`${pc.green('√')} manifest -> ${pc.cyan(normalizePath(path.relative(projectRoot, runtimeManifestPath)))}`)
}

function main() {
  console.warn(pc.cyan('\nBuilding shared vendor assets...\n'))
  prepareOutputDirectory()
  buildSharedVendors()
  console.warn(pc.green(`\nShared vendor assets are ready in ${normalizePath(path.relative(projectRoot, outputDir))}\n`))
}

main()
