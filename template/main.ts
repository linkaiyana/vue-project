/*
 * @Author: linkaiyan
 * @Date: 2025-12-03 15:00:50
 * @LastEditTime: 2026-04-08 16:08:17
 * @LastEditors: linkaiyan
 * @Description:
 */
import { createPinia } from 'pinia'
import { Lazyload } from 'vant'
import { createApp } from 'vue'
// <% if (needI18n) %>
import creatI18n from '@/plugins/i18n'
// <% endif %>
import createSentry from '@/plugins/sentry'
import useClientStore from '@/store/clientStore'
import App from './App.vue'
import { activityName } from './constants'
import router from './router'

// reset css
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css' // 确保在重置样式之后引入 UnoCSS
import '@/styles/reset.css'

const app = createApp(App)

app.use(createPinia())
app.use(createSentry({ activityName }))
app.use(router)
app.use(Lazyload)

function init() {
  const clientStore = useClientStore()
  clientStore.getClientInfo()
}

init()

// <% if (needI18n) %>
app.use(creatI18n)
// <% endif %>

app.mount('#app')
