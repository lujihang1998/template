// declare global {} 在 TS 3.4 以后就被废弃掉, 备注: 声明完在tsconfig.json includes 该文件
interface Window {
  agreement: string
  defaultHost: string
  oauthHost: string
  env: {
    baseUrl: string
    authUrl: string
    clientId: string
    clientSecret: string
    authType: string
    useMainResources: Array<string>
    cancelTokenTimeout: number
    api: {
      prefix: string,
      userCenter: string
    },
  },
  __POWERED_BY_QIANKUN__?: boolean
}