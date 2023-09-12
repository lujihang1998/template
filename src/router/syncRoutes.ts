import Layout from '@/views/layout/Layout.vue'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'root',
    meta: { title: 'root' },
    redirect: '/main/auth'
  },
  {
    path: '/main',
    name: 'main',
    component: Layout,
    meta: { title: 'main' },
    redirect: '/main/auth',
    children: [
      {
        path: 'auth',
        name: 'auth',
        component: () => import('@/views/auth/index.vue'),
        meta: { title: '权限判断', icon: 'auth' }
      }
    ]
  }
]

export default routes
