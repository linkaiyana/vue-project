/*
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:33:47
 * @LastEditTime: 2025-12-04 18:17:16
 * @LastEditors: linkaiyan
 * @Description:
 */
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@PF/views/HomePage.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@PF/views/AboutPage.vue'),
    },
    {
      path: '/about2',
      name: 'about2',
      component: () => import('@CC/outerComponents.vue'),
    },
  ],
})

export default router
