/*
 * @Author: linkaiyan
 * @Date: 2025-12-03 15:00:50
 * @LastEditTime: 2026-03-26 11:24:50
 * @LastEditors: linkaiyan
 * @Description:
 */
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { isDebug } from '@/constants'
import creatI18n from '@/plugins/i18n'
import createSentry from '@/plugins/sentry'

import App from './App.vue'
import router from './router'

// reset css
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css' // 确保在重置样式之后引入 UnoCSS

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(creatI18n)
app.use(createSentry)

if (isDebug) {
  setTimeout(() => {
    if ('VConsole' in window && window.VConsole) {
      new (window.VConsole as any)()
    }
  }, 2000)
}

app.mount('#app')
