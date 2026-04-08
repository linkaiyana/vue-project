/*
 * @Author: linkaiyan
 * @Date: 2026-04-03 17:58:04
 * @LastEditTime: 2026-04-08 14:48:19
 * @LastEditors: linkaiyan
 * @Description:
 */
import { extractUAInfo } from '@/utils/ua'

function getQueryParams() {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)

  const hash = window.location.hash.startsWith('#')
    ? window.location.hash.slice(1)
    : window.location.hash

  const hashQueryIndex = hash.indexOf('?')
  if (hashQueryIndex >= 0) {
    const hashQuery = hash.slice(hashQueryIndex + 1)
    const hashParams = new URLSearchParams(hashQuery)

    hashParams.forEach((value, key) => {
      if (!params.has(key))
        params.set(key, value)
    })
  }

  return params
}

export default defineStore('clientStore', () => {
  const clientInfo = ref<Partial<ClientInfo> | null>(null)

  // 获取 app 基础配置信息
  const getClientInfo = () => {
    const baseClientInfo = extractUAInfo()
    if (!baseClientInfo) {
      const params = getQueryParams() as Partial<ClientInfo>
      const token = params.get('token') || localStorage.getItem('__dino_key__') || ''
      const languageCode = (params.get('languageCode') as LanguageCode | null) || 'zh-CN'

      clientInfo.value = {
        ...params,
        languageCode,
        token,
      }
      return
    }

    clientInfo.value = baseClientInfo
  }

  return { clientInfo, getClientInfo }
})
