/*
 * @Author: linkaiyan
 * @Date: 2026-04-03 17:58:04
 * @LastEditTime: 2026-04-07 10:52:12
 * @LastEditors: linkaiyan
 * @Description:
 */
import { extractUAInfo } from '@/utils/ua'

export default defineStore('clientStore', () => {
  const clientInfo = ref<Partial<ClientInfo> | null>(null)
  const route = useRoute()

  // 获取 app 基础配置信息
  const getClientInfo = () => {
    const baseClientInfo = extractUAInfo()

    if (!baseClientInfo) {
      const token = route.query?.token as string || localStorage.getItem('__dino_key__') || ''
      const languageCode = (route.query?.languageCode as LanguageCode) || 'zh-CN'

      clientInfo.value = {
        languageCode,
        token,
      }
      return
    }

    clientInfo.value = baseClientInfo
  }

  return { clientInfo, getClientInfo }
})
