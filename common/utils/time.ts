import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

// 定义参数对象接口
interface DateRangeConfig {
  start: number // 开始时间戳 (ms)
  end: number // 结束时间戳 (ms)
  todayTimestamp?: number // 指定的“今日”参考时间戳 (ms)
  offset?: number // 时区偏移，默认 8
  formatStr?: string // 格式化字符串，默认 'YYYY-MM-DD'
}

export interface DateItem {
  timestamp: number
  format: string
  isToday: boolean
  date: Dayjs
}

/**
 * 获取日期范围列表
 */
function generateDateList({
  start,
  end,
  todayTimestamp,
  offset = 8, // 默认东八区
  formatStr = 'YYYY-MM-DD',
}: DateRangeConfig): DateItem[] {
  const dates: DateItem[] = []

  const curTimeStamp = todayTimestamp || dayjs().valueOf()

  // 1. 统一时区并对齐到 0 点
  const today = dayjs(curTimeStamp).utcOffset(offset).startOf('day')
  const last = dayjs(end).utcOffset(offset).startOf('day')
  let current = dayjs(start).utcOffset(offset).startOf('day')

  // 2. 迭代生成列表
  while (current.isBefore(last) || current.isSame(last)) {
    dates.push({
      date: current,
      timestamp: current.valueOf(),
      format: current.format(formatStr),
      isToday: current.isSame(today, 'day'),
    })

    current = current.add(1, 'day')
  }

  return dates
}

export {
  generateDateList,
}
