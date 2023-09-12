import type { InternalAxiosRequestConfig, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

export interface HttpRequestConfig extends InternalAxiosRequestConfig {
  beforeRequestCallback?: (request: HttpRequestConfig) => void
  beforeResponseCallback?: (response: HttpResoponse) => void
  cancelMessage?: boolean
}

export interface HttpRequestConfigRes extends AxiosRequestConfig {
  cancelMessage?: boolean
}

export interface HttpResoponse extends AxiosResponse {
  cancelMessage?: boolean
}

export interface HttpError extends AxiosError {
  isCancelRequest?: boolean
}
