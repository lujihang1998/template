import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { AppState } from '../types/app'

const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    sidebarOpened: false,
    fullMain: false,
    lang: 'zh_CN',
    hasI18n: true
  }),
  actions: {
    toggleSideBar(status?: boolean) {
      this.sidebarOpened = status ?? !this.sidebarOpened
      if (!this.sidebarOpened) {
        Cookies.set('sidebarStatus', '1')
      } else {
        Cookies.set('sidebarStatus', '0')
      }
    }
  }
})

export default useAppStore
