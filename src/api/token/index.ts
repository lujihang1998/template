import axios from 'axios'
import { queryParams } from '@/utils'
import { logout } from '@/utils/login'

// 允许携带cookie
axios.defaults.withCredentials = true

const request = axios.create({
  baseURL: window.env.authUrl,
  timeout: 100000
})

// response拦截器
request.interceptors.response.use(
  (res) => res,
  (error) => {
    logout(window.location.href)
    throw new Error('获取token失败', error)
  }
)

export function getTokenApi(params: Record<string, any> = {}) {
  return request.post(`/uni/oauth/token?${queryParams(params)}`)
}
