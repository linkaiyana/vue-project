/*
 * @Author: linkaiyan
 * @Date: 2026-01-14 16:07:41
 * @LastEditTime: 2026-01-14 16:12:56
 * @LastEditors: linkaiyan
 * @Description:
 */
export default function initVConsole(enable) {
  return {
    name: 'vite-plugin-vconsole', // 插件名称
    // 转换 index.html 的钩子
    transformIndexHtml(html): string | void {
      if (!enable) return html

      // 注入 vConsole 的 CDN 脚本和初始化代码
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: { src: 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js' },
            injectTo: 'head',
          },
          {
            tag: 'script',
            children: 'var vConsole = new window.VConsole();',
            injectTo: 'body',
          },
        ],
      }
    },
  }
}
