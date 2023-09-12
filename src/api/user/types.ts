interface ResponseData {
  code: number | string
  message: string | null
  success: boolean | null
}

export interface Menus {
  id: string
  parentId: string
  children: any[]
  code: string
  title: string
  href: null | string
  icon: null | string
  type: string
  orderNum: number
  description: string
  path: string
  module: string
  category: null
  parentCode: null
  zhTitle: string
  enTitle: string
  hidden: null
}

export interface Elements {
  id: string
  code: string
  type: null
  name: string
  uri: string
  method: string
  description: string
  menuId: string
}

export interface Roles {
  id: string
  name: string
  code: string
  groupId: string
  organizationId: null
  isBind: null
}

export interface Factories {
  id: string
  name: string
  code: string
  groupId: string
  organizationId: null
  isBind: null
}

export interface Companies {
  companyId: string
  name: string
  socialCredit: string
  address: null | string
  status: number
  isAdmin: boolean
  certify: boolean
  factories: Factories[]
  default: boolean
}

export interface UserInfo {
  id: string
  username: string
  name: string
  mobilePhone: string
  email: string
  description: null
  crtTime: string
  menus: Menus[]
  elements: Elements[]
  roles: Roles[]
  companies: Companies[]
  companyId: string
  isSuper: null
  status: null
  authType: number
  bindStatus: number
  avatar?: string
  introduction?: string
}

export interface UserInfoResponseData extends ResponseData {
  data: UserInfo
}
