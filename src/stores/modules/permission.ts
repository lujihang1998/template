import { defineStore } from 'pinia'
import useUserStore from './user'
import { mapRoutes } from '@/utils'
import { RouteRecordRaw } from 'vue-router'
import { PermissionState } from '../types/permission'
import { Menus, UserInfo } from '@/api/user/types'
import { asyncRoutesMap, syncRoutesMap } from '@/router/index'

// 判断是否有权限
function hasPermission(roles: Menus[], route: RouteRecordRaw) {
  return roles.find((role) => route.name === role.code)
}

function filterAsyncRouter(routes: RouteRecordRaw[], roles: Menus[]) {
  if (!roles || !roles.length) return []

  const result = routes.filter((route) => {
    const role = hasPermission(roles, route)
    if (role) {
      const { orderNum, zhTitle, enTitle } = role
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      route.orderNum = orderNum
      route.meta = { ...(route.meta || {}), zhTitle, enTitle }
      return true
    }
    return false
  })

  const sortResult = result.sort((a, b) => (a?.orderNum || 0) - (b?.orderNum || 0))
  return sortResult
}

const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: []
  }),
  actions: {
    SET_ROUTES(routes: any) {
      this.routes = mapRoutes([...routes])
    },

    generateRoutes() {
      return useUserStore()
        .GetUserInfo()
        .then((data: UserInfo) => {
          // const routes = filterAsyncRouter(asyncRoutesMap, data.menus)
          const routes = asyncRoutesMap
          this.SET_ROUTES(routes)
          return routes
        })
    }
  }
})

export default usePermissionStore
