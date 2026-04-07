/*
 * @Author: linkaiyan
 * @Date: 2025-12-03 15:00:50
 * @LastEditTime: 2026-04-07 16:20:36
 * @LastEditors: linkaiyan
 * @Description:
 */
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import creatI18n from '@/plugins/i18n'
import createSentry from '@/plugins/sentry'
import useClientStore from '@/store/clientStore'
import App from './App.vue'
import { activityName } from './constants'
import router from './router'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

const app = createApp(App)

app.use(createPinia())
app.use(creatI18n)
app.use(createSentry({ activityName }))
app.use(router)

function init() {
  const clientStore = useClientStore()
  clientStore.getClientInfo()
}

init()

app.mount('#app')
