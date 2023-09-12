var agreement = 'http://'
var defaultHost = '10.0.0.54:14001' // api网关ip和端口
var oauthHost = '10.0.0.54:12001' // 认证服务ip和端口
var env = {
  // 基础请求地址
  baseUrl: agreement + defaultHost,
  // 认证服务
  authUrl: agreement + oauthHost,
  clientId: 'J8Kq169h56tm',
  clientSecret: 'dd1492ee1c6e2c0cc72f963134534375',
  // auth登录方式 iot ,iot2
  authType: 'iot',
  // 使用主应用中的资源[service， components, directives]
  useMainResources: [],
  // 重复请求的超时时间
  cancelTokenTimeout: 500,
  // 服务名
  api: {
    ica: 'ica',
    userCenter: '/api/user-center-optimization' // 用户中心服务
  }
}
