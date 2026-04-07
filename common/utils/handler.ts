/*
 * @Author: linkaiyan
 * @Date: 2025-11-21 17:52:20
 * @LastEditTime: 2026-01-09 09:53:43
 * @LastEditors: linkaiyan
 * @Description:
 */
import dayjs from 'dayjs'

import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

// 防抖函数实现
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    // 清除之前的定时器
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    // 设置新的定时器
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 字符串转8时区时间
function strToUtf8Time(str: string, format?: string) {
  const dateTime = dayjs.tz(str, 'Asia/Shanghai')
  if (format) {
    return dateTime.format(format)
  }
  else {
    return dateTime
  }
}
// 唤起app并跳转
function goAppWebView(url?: string) {
  const pageUrl = url ? `?pageUrl=${url}` : ''
  return `dinochat://host1:8080/detail${pageUrl}`
}

export {
  debounce,
  goAppWebView,
  strToUtf8Time,
}
