/*
 * @Author: linkaiyan
 * @Date: 2026-04-07 10:07:21
 * @LastEditTime: 2026-04-07 10:55:53
 * @LastEditors: linkaiyan
 * @Description:
 */
import type { PluginOption } from 'vite'
import type { SharedVendorRuntimeConfig } from './plugins/sharedVendor'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImportDeps from './plugins/autoImport'
import AutoRegistryComponents from './plugins/components'
import AutoPages from './plugins/pages'
import { createSharedVendorPlugin } from './plugins/sharedVendor'

import initVConsole from './plugins/vConsole'

export default (sharedVendor: SharedVendorRuntimeConfig, mode: string): PluginOption[] => {
  const isDev = mode === 'development'
  const isTest = mode === 'test'

  return [
    vue(),
    isDev && vueDevTools(),
    AutoImportDeps(),
    AutoRegistryComponents(),
    AutoPages(),
    UnoCSS(),
    isTest && initVConsole(),
    !isDev && legacy(),
    createSharedVendorPlugin(sharedVendor),
  ].filter(Boolean)
}
