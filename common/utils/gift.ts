/*
 * @Author: linkaiyan
 * @Date: 2025-10-31 10:55:25
 * @LastEditTime: 2026-04-03 15:48:37
 * @LastEditors: linkaiyan
 * @Description:
 */
import { useI18n } from 'vue-i18n'

enum UnitType {
  FOREVER = -1,
  HOURS = 1,
  DAY = 2,
}

interface Gift {
  unit?: UnitType
  amount?: number
  singleEffectiveTime?: number
  [key: string]: any
}

// 礼物类型(展示个数的类型集合,其余类型展示时间)
const showAmountTypeList = [2, 4, 9, 12, 13, 14]

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
  const { t } = useI18n()

  const unitMap = {
    [UnitType.FOREVER]: '',
    [UnitType.HOURS]: t('unit.hours'),
    [UnitType.DAY]: t('unit.days'),
  }

  if (showAmountTypeList.includes(gift[type])) {
    return `${gift[amount]}`
  }
  else {
    return `${gift[time]}${unitMap?.[gift[unit] || UnitType.FOREVER] || ''}`
  }
}

export {
  getGiftUnit,
}
