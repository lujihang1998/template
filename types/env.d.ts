/// <reference types="vite/client" />

/**
 * 备注：
 * 1. vue-router 的路由增加自定义字段定义 会与 windows 上增加的自定义字段定义 冲突
 * 2. 使用多个文件存储这些自定义信息 例：路由的 types/router.d.ts, windows: types/env.d.ts
*/
interface ImportMetaEnv {
  readonly VITE_BASE_API: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}