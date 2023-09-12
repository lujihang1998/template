import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/user'
import { UserInfoResponseData } from '@/api/user/types'
import { UserState } from '../types/user'

const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    username: '',
    name: '',
    avatar: '',
    id: '',
    email: '',
    mobilePhone: '',
    introduction: '',
    menus: [],
    elements: {},
    companyId: ''
  }),
  getters: {
    getCompanyId(state): string {
      return state.companyId
    }
  },
  actions: {
    // 获取用户信息
    async GetUserInfo() {
      try {
        const res: UserInfoResponseData = await getUserInfo()
        const { menus, elements, name, username, email, mobilePhone, id, avatar, introduction, companyId } = res.data
        const elementsMap = (elements || []).reduce((result: { [x: string]: boolean }, current) => {
          result[current.code] = true
          return result
        }, {})
        this.elements = elementsMap
        this.menus = menus || []
        this.name = name
        this.username = username
        this.email = email
        this.mobilePhone = mobilePhone
        this.id = id
        this.avatar = avatar
        this.introduction = introduction
        if (!window.__POWERED_BY_QIANKUN__) {
          this.companyId = companyId
        }
        return res.data
      } catch (error) {
        return Promise.reject(error)
      }
    },

    LogOut(): Promise<void> {
      return new Promise((resolve) => {
        this.menus = []
        resolve()
      })
    }
  }
})

export default useUserStore
