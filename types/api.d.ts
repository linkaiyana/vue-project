/** 基础响应结构 */
interface BasicModel<T = unknown> {
  code: number
  data: T
  success: boolean
  message: string
  /** @deprecated 兼容旧字段 */
  msg?: string
  time: number
}

/** 分页响应结构 */
interface BasicRecord<T = object> {
  current: number
  pages: number
  records: T[]
  size: number
  total: number
  [key: string]: any
}

/** 分页请求参数 */
type BasicApiParams<T = object> = {
  current?: number
  pages?: number
  size?: number
  startDate?: string | Date
  endDate?: string | Date
} & T

/** post 请求参数 */
type BasicPostParams<T = object> = { amount: number, id: number } & T

/** 解构接口后的返回数据 */
type ApiReseType<T> = Awaited<ReturnType<T>>[number]
