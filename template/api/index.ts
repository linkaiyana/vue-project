import { http } from '@/http'

// 获取地图拼图信息列表
export function listBuyRecord() {
  return http.get('/api/activity/white/day/heart/listMapPuzzles')
}
