import type { AxiosRequestConfig } from 'axios'

export interface HttpContext {
  app?: string
  token?: string
  languageCode?: string
  deviceId?: string
  isEmulator?: string | number | boolean
  deviceType?: string
  deviceCode?: string
  openid?: string
  isApp?: boolean
  isfaster?: string | number | boolean
}

export interface BusinessResponse<T = unknown> {
  code: number
  data: T
  msg?: string
  message?: string
}

export interface RequestConfig<D = unknown> extends AxiosRequestConfig<D> {
  silent?: boolean
  rawResponse?: boolean
}

export interface RawResponseRequestConfig<D = unknown> extends RequestConfig<D> {
  rawResponse: true
}

export type RequestMeta = Pick<RequestConfig, 'silent' | 'rawResponse'>
