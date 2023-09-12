import { UserInfo } from '@/api/user/types'

type properties =
  | 'id'
  | 'name'
  | 'username'
  | 'email'
  | 'menus'
  | 'mobilePhone'
  | 'avatar'
  | 'introduction'
  | 'companyId'

export type PickProperties = Pick<UserInfo, properties>

export type UserState = PickProperties & { elements: Record<string, boolean> }
