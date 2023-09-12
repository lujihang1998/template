import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    breadcrumb?: boolean
    activeMenu?: string
    clickDisabled?: boolean
    fullBody?: boolean
    fullMain?: string
    breadcrumbExtra?: string[]
    keepAlive?: string[]
    containerPadding?: string
  }

  interface _RouteRecordBase {
    code?: string
    orderNum?: number
    hidden?: boolean
    alwaysShow?: boolean,
    matched?: _RouteRecordBase[]
  }
}