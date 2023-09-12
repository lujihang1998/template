import _ from 'lodash'
import type { RouteRecordRaw, _RouteRecordBase } from 'vue-router'

/**
 * 获取url中的参数值
 * @param name 参数名称
 */
export function getQueryString(name: string) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}

/**
 * 删除url中的指定参数并返回新url
 * @param url 需要截取的url
 * @param ref 需要删除的参数名称
 */
export function delQueryString(url: string, ref: string, isEnCode = false) {
  let str = ''
  let newUrl = ''
  let hash = ''
  if (url.indexOf('#') !== -1) {
    hash = url.substr(url.indexOf('#'))
    url = url.split(hash)[0]
  }
  if (url.indexOf('?') !== -1) {
    str = url.substr(url.indexOf('?') + 1)
  } else {
    newUrl = url
  }

  let returnurl = ''
  if (str.indexOf('&') !== -1) {
    const arr = str.split('&')
    if (!arr.length) return
    let index
    for (index in arr) {
      if (arr[index].split('=')[0] !== ref) {
        returnurl = returnurl + arr[index].split('=')[0] + '=' + arr[index].split('=')[1] + '&'
      }
    }
    newUrl = url.substr(0, url.indexOf('?')) + '?' + returnurl.substr(0, returnurl.length - 1)
  } else {
    const arr = str.split('=')
    if (arr[0] === ref) {
      newUrl = url.substr(0, url.indexOf('?'))
    } else {
      newUrl = url
    }
  }
  newUrl = newUrl + hash
  return isEnCode ? encodeURIComponent(newUrl) : newUrl
}

export function queryParams(params: Record<string, any>) {
  let paramStr = ''
  Object.keys(params).forEach((item) => {
    if (paramStr === '') {
      paramStr = `${item}=${params[item]}`
    } else {
      paramStr = `${paramStr}&${item}=${params[item]}`
    }
  })
  return paramStr
}

// 遍历子应用路由
export function mapRoutes(routes: RouteRecordRaw[], matched: _RouteRecordBase[] = []) {
  routes.forEach((route) => {
    const { enTitle, zhTitle, title } = route.meta || {}
    route.matched = [_.cloneDeep(route), ...matched]
    route.meta = {
      ...(route.meta || {}),
      newTitle: (localStorage.getItem('lang') === 'en' ? enTitle : zhTitle) || title
    }
    if (route.children?.length) {
      mapRoutes(route.children, route.matched)
    }
  })

  return routes
}
