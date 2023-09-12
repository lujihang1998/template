import { createApp } from 'vue'

import App from './App.vue'
import i18n from '../i18n/index'
import pinia from '@/stores/index'
import setupSvg from '@/assets/icons'
import router from './router'
import { isLogin, login } from '@/utils/login'
import { RouteRecordRaw } from 'vue-router'
import usePermissionStore from '@/stores/modules/permission'

import './styles/index.scss'
import 'virtual:uno.css'

const init = async () => {
  const app = createApp(App)
  if (!window.__POWERED_BY_QIANKUN__) {
    // directivesCb(app)
    // filtersCb(app)
  }
  setupSvg(app)
  app.use(i18n)
  app.use(pinia)
  const routes = await usePermissionStore().generateRoutes()
  routes.forEach((item: RouteRecordRaw) => router.addRoute(item))
  app.use(router)
  await router.isReady()
  app.mount('#app')
}

if (isLogin()) {
  init()
} else {
  ;(login() as Promise<unknown>).then(() => init())
}
