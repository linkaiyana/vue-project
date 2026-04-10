/*
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:33:47
 * @LastEditTime: 2026-03-30 10:57:58
 * @LastEditors: linkaiyan
 * @Description:
 */
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import { activityPath } from '../constants'

const router = createRouter({
  history: createWebHistory(activityPath),
  routes,
})

export default router
