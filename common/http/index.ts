import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import type {
  HttpContext,
  RequestConfig,
} from './types'
import axios from 'axios'
import { showToast } from 'vant'
import useClientStore from '@/store/clientStore'

const APP_HEADERS = {
  version: '2.7.3',
  port: '1',
} as const

const HTTP_SUCCESS_STATUS = 200
const BUSINESS_SUCCESS_CODE = 0

function getHttpContext(): HttpContext | null | undefined {
  const clientStore = useClientStore()
  return clientStore.clientInfo
}

function normalizeLanguageCode(languageCode?: string) {
  return languageCode === 'en-US' ? 'GB' : languageCode
}

function resolveBaseURL(context?: HttpContext | null) {
  return `${context?.isfaster}` === '1'
    ? import.meta.env.VITE_BACKEND_CN_API_URL
    : import.meta.env.VITE_BACKEND_API_URL
}

function resolveHeaders(context?: HttpContext | null): Record<string, unknown> {
  if (!context) {
    return APP_HEADERS
  }

  return {
    ...APP_HEADERS,
    app: context.app,
    token: context.token,
    languageCode: normalizeLanguageCode(context.languageCode),
    deviceId: context.deviceId,
    isEmulator: context.isEmulator,
    deviceType: context.deviceType,
    deviceCode: context.deviceCode,
    openid: context.openid,
  }
}

function onRequest(config: InternalAxiosRequestConfig) {
  const context = getHttpContext()
  config.baseURL = resolveBaseURL(context)
  config.headers = axios.AxiosHeaders.from({
    ...(config.headers ? config.headers.toJSON() : {}),
    ...resolveHeaders(context),
  } as any)
  return config
}

function onResponse<T>(response: AxiosResponse) {
  const meta = response.config as RequestConfig

  if (response.status !== HTTP_SUCCESS_STATUS) {
    const errorMessage = `请求异常：${response.status}`
    if (!meta.silent) {
      showToast({
        type: 'text',
        message: errorMessage,
      })
    }
    return Promise.reject(new Error(errorMessage))
  }

  if (response.data.code !== BUSINESS_SUCCESS_CODE) {
    const errorMessage = response.data.msg || response.data.message || '业务异常'
    if (!meta.silent) {
      showToast({
        type: 'text',
        message: errorMessage,
      })
    }
    return Promise.reject(new Error(errorMessage))
  }

  return (meta?.rawResponse ? response.data : response.data.data) as T
}

function onResponseError(error: AxiosError) {
  const meta = error.config as RequestConfig | undefined

  if (!meta?.silent) {
    showToast({
      type: 'text',
      message: error.message || '网络异常，请稍后重试',
    })
  }

  return Promise.reject(error)
}

export const instance: AxiosInstance = axios.create()

instance.interceptors.request.use(onRequest, (error: AxiosError) => Promise.reject(error))
instance.interceptors.response.use(onResponse, onResponseError)

export function request<T = unknown, D = unknown>(
  url: string,
  config: RequestConfig<D> = {},
): Promise<T> {
  return instance(url, {
    method: config.method || 'GET',
    ...config,
  })
}

export const http = {
  get: <T = any>(url: string, config?: RequestConfig) =>
    request<T>(url, { ...config, method: 'GET' }),

  post: <T = any>(url: string, data?: any, config?: RequestConfig) =>
    request<T>(url, { ...config, method: 'POST', data }),

  put: <T = any>(url: string, data?: any, config?: RequestConfig) =>
    request<T>(url, { ...config, method: 'PUT', data }),

  delete: <T = any>(url: string, config?: RequestConfig) =>
    request<T>(url, { ...config, method: 'DELETE' }),
}
