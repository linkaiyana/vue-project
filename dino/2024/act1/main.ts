/*
 * @Author: linkaiyan
 * @Date: 2025-12-03 15:00:50
 * @LastEditTime: 2026-03-30 11:23:04
 * @LastEditors: linkaiyan
 * @Description:
 */
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import creatI18n from '@/plugins/i18n'
import createSentry from '@/plugins/sentry'

import App from './App.vue'
import { activityName } from './constants'
import router from './router'

// reset css
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css' // 确保在重置样式之后引入 UnoCSS

const app = createApp(App)

app.use(createPinia())
app.use(creatI18n)
app.use(createSentry({ activityName }))
app.use(router)

app.mount('#app')
