import { createRouter, createWebHistory } from 'vue-router'
import asyncRoutesMap from './asyncRoutes'
import syncRoutesMap from './syncRoutes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: syncRoutesMap,
  strict: true,
  scrollBehavior(_, from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) {
        return savedPosition
      } else {
        if (from.meta.saveSrollTop) {
          const top: number = document.documentElement.scrollTop || document.body.scrollTop
          resolve({ left: 0, top })
        }
      }
    })
  }
})

export { asyncRoutesMap, syncRoutesMap }
export default router
