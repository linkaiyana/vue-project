/*
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:33:47
 * @LastEditTime: 2026-04-09 16:10:33
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
