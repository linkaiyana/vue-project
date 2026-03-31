/*
 * @Author: linkaiyan
 * @Date: 2026-01-14 16:07:41
 * @LastEditTime: 2026-03-31 16:13:07
 * @LastEditors: linkaiyan
 * @Description:
 */
import type { Plugin } from 'vite'

export default function initVConsole(): Plugin {
  return {
    name: 'vite-plugin-vconsole',
    transformIndexHtml(html) {
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
            children: 'new window.VConsole();',
            injectTo: 'body',
          },
        ],
      }
    },
  }
}
