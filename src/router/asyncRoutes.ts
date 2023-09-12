import Layout from '@/views/layout/Layout.vue'
import EmptyLayout from '@/views/layout/EmptyLayout.vue'
import { RouteRecordRaw } from 'vue-router'

const layout = (window as any).__POWERED_BY_QIANKUN__ ? EmptyLayout : Layout

const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/subscription',
    name: 'subscription',
    component: layout,
    redirect: '/subscription/page1',
    meta: { title: 'subscription', icon: 'change' },
    children: [
      {
        path: 'page1',
        name: 'page1',
        code: 'menu-subscription-page1',
        component: () => import('@/views/demo/page1.vue'),
        meta: { title: '高级搜索' }
      },
      {
        path: 'page2',
        name: 'page2',
        code: 'menu-subscription-page2',
        component: () => import('@/views/demo/page2.vue'),
        meta: { title: 'Page+Row布局' }
      },
      {
        path: 'page3',
        name: 'page3',
        code: 'menu-subscription-page3',
        component: () => import('@/views/demo/page3.vue'),
        meta: { title: 'Row基本使用' }
      }
    ]
  },
  {
    path: '/subscription2',
    name: 'subscription2',
    component: layout,
    redirect: '/subscription2/page2-1',
    meta: { title: 'subscription2' },
    children: [
      {
        path: 'page2-1',
        name: 'page2-1',
        component: () => import('@/views/demo/page4.vue'),
        meta: { title: '国际化' }
      }
    ]
  }
]

export default asyncRoutes
