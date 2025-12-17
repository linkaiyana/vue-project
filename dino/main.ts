/*
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:01:44
 * @LastEditTime: 2025-12-08 14:57:07
 * @LastEditors: linkaiyan
 * @Description:
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
