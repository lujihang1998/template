import request from '@/utils/request'
import { UserInfoResponseData } from './types'

const PREFIX = window.env.api.userCenter
enum API {
  FETCHUSERINFO = '/user/front/info'
}

export function getUserInfo(params: { category: string } = { category: 'handle' }) {
  return request.get<any, UserInfoResponseData>(`${PREFIX}${API.FETCHUSERINFO}`, { params })
}
