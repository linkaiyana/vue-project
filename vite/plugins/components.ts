/*
 * @Author: linkaiyan
 * @Date: 2025-12-18 16:33:30
 * @LastEditTime: 2026-01-13 11:24:46
 * @LastEditors: linkaiyan
 * @Description: 按需加载，自动引入组件
 */
import { resolve } from 'node:path'
import { VantResolver } from '@vant/auto-import-resolver'
import Components from 'unplugin-vue-components/vite'

function AutoRegistryComponents() {
  return Components({
    dts: 'types/components.d.ts',
    resolvers: [VantResolver()],
    dirs: [resolve(process.cwd(), 'common/components'), 'components'],
  })
}

export default AutoRegistryComponents
