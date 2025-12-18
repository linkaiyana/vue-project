/*
 * @Author: linkaiyan
 * @Date: 2025-12-18 17:22:13
 * @LastEditTime: 2025-12-18 17:50:53
 * @LastEditors: linkaiyan
 * @Description: 自动注册页面
 */
import Pages from 'vite-plugin-pages'

function AutoPages() {
  return Pages({
    extensions: ['vue'],
    dirs: 'pages',
  })
}

export default AutoPages
