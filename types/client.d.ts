/*
 * @Author: linkaiyan
 * @Date: 2026-04-03 17:55:45
 * @LastEditTime: 2026-04-03 18:17:08
 * @LastEditors: linkaiyan
 * @Description:
 */
type LanguageCode = 'en-US' | 'zh-CN' | 'zh-TW' | 'vi-VN' | 'ko-KR'

/** 客户端 ua 信息(可选信息均为前端使用信息) */
interface ClientInfo {
  token: string // JWT令牌
  deviceId: string // 设备ID
  version: string // 版本号
  languageCode: LanguageCode // 语言代码 项目内GB转换为en-US
  areaCode: string // 地区代码
  isfaster: '0' | '1' // 是否加速："1"是 | "0"否
  timestamp: string // 时间戳
  networkOperatorCode: string // 网络运营商代码
  timeZoneName: string // 时区名称
  isEmulator: '0' | '1' // 是否是模拟器："1"是 | "0"否
  deviceType: string // 设备类型
  deviceCode: string // 设备系统版本号
  openid: string // 渠道号
  app: 'Dino' | 'Doki' // 应用名称
  // 大区id, 6: 英语区, 7: 越南区, 9: 华语区, 10: 印度区, 11: 泰语区, 12: 印尼区, 13: 韩语区
  areaId: '6' | '7' | '9' | '10' | '11' | '12' | '13'
  channelId: string // 房间channelId
  [key: string]: any
}
