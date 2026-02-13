/*
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:33:47
 * @LastEditTime: 2026-01-27 14:21:56
 * @LastEditors: linkaiyan
 * @Description:
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '~pages'

console.log('%c [ routes ]-10', 'font-size:13px; background:pink; color:#bf2c9f;', routes)

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
