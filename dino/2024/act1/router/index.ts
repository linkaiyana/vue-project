/*
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:33:47
 * @LastEditTime: 2026-04-10 17:44:22
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
