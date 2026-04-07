/*
 * @Author: linkaiyan
 * @Date: 2026-04-03 15:47:05
 * @LastEditTime: 2026-04-03 17:56:08
 * @LastEditors: linkaiyan
 * @Description:
 */
const ua = navigator.userAgent
export function extractUAInfo(): ClientInfo | null {
  // 正则表达式匹配[]中的内容
  const regex = /\[(.*?)\]/
  const match = ua.match(regex)

  if (match && match[1]) {
    try {
      // 将匹配到的字符串解析为JSON对象
      const jsonData = JSON.parse(match[1])
      // 额外处理：由于客户端英文注入为GB，默认重置为前端的en-US
      if (jsonData?.languageCode === 'GB') {
        jsonData.languageCode = 'en-US'
      }
      return jsonData
    }
    catch (error) {
      console.error('Failed to parse JSON:', error)
      return null
    }
  }

  return null
}
export function extractUAEquipment() {
  if (/Android/i.test(ua)) {
    return 'android'
  }
  else if (/iPhone|iPad|iPod/i.test(ua)) {
    return 'ios'
  }
  return 'default'
}
