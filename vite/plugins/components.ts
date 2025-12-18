/*
 * @Author: linkaiyan
 * @Date: 2025-12-18 16:33:30
 * @LastEditTime: 2025-12-18 17:51:00
 * @LastEditors: linkaiyan
 * @Description: 按需加载，自动引入组件
 */
import { VantResolver } from '@vant/auto-import-resolver'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'

function AutoRegistryComponents() {
  return Components({
    dts: 'types/components.d.ts',
    resolvers: [VantResolver()],
    dirs: [resolve(process.cwd(), 'common/components'), 'components'],
  })
}

export default AutoRegistryComponents
