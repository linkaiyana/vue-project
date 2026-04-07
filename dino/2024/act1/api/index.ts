import { http } from '@/http'
import { activityName } from '../constants'

export interface GiftListItemDto {
  id: number
  title: string
  price: number
  badge?: string
  accent?: 'peach' | 'violet' | 'yellow' | 'blue'
  icon?: 'flower' | 'spark' | 'banana' | 'slipper'
}

export interface GiftListParams {
  activityName?: string
}

// act1 礼物列表示例接口
export function getGiftList(params: GiftListParams = {}) {
  return http.get<GiftListItemDto[]>('/activity/gift/list', {
    params: {
      activityName,
      ...params,
    },
  })
}

// act1 奖励卡片示例接口
export function getRewardCard() {
  return http.get<{
    title: string
    daysText: string
  }>('/activity/reward/card', {
    params: {
      activityName,
    },
  })
}
