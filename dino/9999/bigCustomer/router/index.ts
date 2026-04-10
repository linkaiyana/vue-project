/*
 * @Author: linkaiyan
 * @Date: 2026-04-09 16:02:54
 * @LastEditTime: 2026-04-10 17:45:23
 * @LastEditors: linkaiyan
 * @Description:
 */
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
// import { activityPath } from '../constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
