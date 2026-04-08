/*
 * @Author: linkaiyan
 * @Date: 2025-12-03 15:00:50
 * @LastEditTime: 2026-04-08 16:07:54
 * @LastEditors: linkaiyan
 * @Description:
 */
import { createPinia } from 'pinia'
import { Lazyload } from 'vant'
import { createApp } from 'vue'
import useClientStore from '@/store/clientStore'

import App from './App.vue'
import router from './router'

// reset css
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css' // 确保在重置样式之后引入 UnoCSS

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(Lazyload)

function init() {
  const clientStore = useClientStore()
  clientStore.getClientInfo()
}

init()

app.mount('#app')
