/*
 * @Author: linkaiyan
 * @Date: 2025-12-18 16:33:30
 * @LastEditTime: 2025-12-18 16:41:46
 * @LastEditors: linkaiyan
 * @Description:
 */
import { VantResolver } from '@vant/auto-import-resolver'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'

/**
 * @name  AutoRegistryComponents
 * @description 按需加载，自动引入组件
 */
function AutoRegistryComponents() {
  return Components({
    dts: 'types/components.d.ts',
    resolvers: [VantResolver()],
    dirs: [resolve(process.cwd(), 'common/components'), 'components'],
  })
}

export default AutoRegistryComponents
