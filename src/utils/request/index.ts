import axios from 'axios'
import { HttpRequestConfig, HttpRequestConfigRes, HttpResoponse, HttpError } from './types'
import { logout } from '@/utils/login'
import { getCookie } from '@/utils/cookie'
import useUserStore from '@/stores/modules/user'

const request = axios.create({
  baseURL: window.env.baseUrl,
  timeout: 100000
})

request.interceptors.request.use(
  (config: HttpRequestConfig) => {
    const userStore = useUserStore()
    config.headers.Authorization = getCookie('tk')
    config.headers.username = getCookie('username')
    config.headers.tenantCode = userStore.getCompanyId
    config.headers.companyId = userStore.getCompanyId
    return config
  },
  (error) => Promise.reject(error)
)

request.interceptors.response.use(
  (response: HttpResoponse) => {
    const { data = {}, config = {}, headers = {} } = response || {}
    const { code, message } = data
    const { url = '', cancelMessage, responseType }: HttpRequestConfigRes = config
    if (!response || (code && ![200, '200'].includes(code))) {
      ElMessage.error({ message: message || '未知错误' })
      return Promise.reject()
    }

    if (responseType === 'blob') {
      const disposition = headers['content-disposition'] as string
      const fileName = disposition.split('=')[1]
      if (fileName) {
        const contentType = headers['content-type']
        return { data, fileName, contentType }
      } else {
        const fileReader = new FileReader()
        fileReader.readAsText(data, 'utf-8')

        fileReader.onload = () => {
          if (fileReader?.result) {
            const msg = JSON.parse(fileReader?.result as any)?.message
            ElMessage.error({ message: msg || '未知错误' })
          }
        }
        return Promise.reject()
      }
    }

    if (!cancelMessage && !/visits|list/g.test(url) && [200, '200'].includes(code) && message) {
      ElMessage.success({ message })
    }
    return data
  },
  (error: HttpError) => {
    const { response = { status: '', data: {} } } = error
    const { status, data = {} } = response
    const { message = '系统错误' }: any = data

    if (status === 401) {
      // 401后直接退出
      logout(window.location.href)
    } else {
      ElMessage({ type: 'error', message, showClose: true })
    }
    return Promise.reject(error)
  }
)

export default request
