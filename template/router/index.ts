/*
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:33:47
 * @LastEditTime: 2026-04-09 15:12:06
 * @LastEditors: linkaiyan
 * @Description:
 */
import { activityPath } from '@PF/constants'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'

const router = createRouter({
  history: createWebHistory(activityPath),
  routes,
})

export default router
