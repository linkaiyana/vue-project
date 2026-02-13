/*
 * @Author: linkaiyan
 * @Date: 2025-12-03 15:00:50
 * @LastEditTime: 2026-01-28 11:11:19
 * @LastEditors: linkaiyan
 * @Description:
 */
import { createPinia } from 'pinia'
import { createApp } from 'vue'
// <% if (needI18n) %>
import creatI18n from '@/plugins/i18n'
// <% endif %>

import App from './App.vue'
import router from './router'

// reset css
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css' // 确保在重置样式之后引入 UnoCSS

const app = createApp(App)

app.use(createPinia())
app.use(router)
// <% if (needI18n) %>
app.use(creatI18n)
// <% endif %>

console.log(app)

app.mount('#app')
