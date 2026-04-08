/*
 * @Author: linkaiyan
 * @Date: 2025-10-31 10:55:25
 * @LastEditTime: 2026-04-08 15:09:35
 * @LastEditors: linkaiyan
 * @Description:
 */
import useClientStore from '@/store/clientStore'

const UNIT_TYPE = {
  FOREVER: -1,
  HOURS: 1,
  DAY: 2,
} as const

type UnitType = typeof UNIT_TYPE[keyof typeof UNIT_TYPE]

const UNIT_MAP: Record<LanguageCode, { hours: string, days: string }> = {
  'en-US': { hours: 'h', days: 'd' },
  'zh-CN': { hours: '小时', days: '天' },
  'zh-TW': { hours: '小時', days: '天' },
  'vi-VN': { hours: 'h', days: 'n' },
  'ko-KR': { hours: 'h', days: 'd' },
}

interface Gift {
  unit?: UnitType
  amount?: number
  singleEffectiveTime?: number
  [key: string]: any
}

// 礼物类型(展示个数的类型集合,其余类型展示时间)
const SHOW_AMOUNT_TYPES = new Set([2, 4, 9, 12, 13, 14])

function getGiftUnit<T extends Gift = Gift>({
  gift,
  keyMap: {
    type = 'giftType',
    amount = 'amount',
    time = 'singleEffectiveTime',
    unit = 'unit',
  } = {},
}: {
  gift: T
  keyMap?: Partial<{
    type: keyof T
    amount: keyof T
    time: keyof T
    unit: keyof T
  }>
}) {
  const clientStore = useClientStore()
  const languageCode = clientStore.clientInfo?.languageCode || 'zh-CN'

  const unitMap = {
    [UNIT_TYPE.FOREVER]: '',
    [UNIT_TYPE.HOURS]: UNIT_MAP[languageCode]?.hours,
    [UNIT_TYPE.DAY]: UNIT_MAP[languageCode]?.days,
  }

  if (SHOW_AMOUNT_TYPES.has(gift[type])) {
    return `${gift[amount]}`
  }
  else {
    return `${gift[time]}${unitMap?.[gift[unit] || UNIT_TYPE.FOREVER] || ''}`
  }
}

export {
  getGiftUnit,
}
