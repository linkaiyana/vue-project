/*
 * @Author: linkaiyan
 * @Date: 2025-10-30 16:58:31
 * @LastEditTime: 2026-04-07 14:13:33
 * @LastEditors: linkaiyan
 * @Description:
 */
import { getCustomerInfo } from '../api'

export default defineStore('userStore', () => {
  const userInfo = ref<UserInfoRes | null>(null)

  const getUserInfo = async () => {
    const res = await getCustomerInfo()
    if (res) {
      userInfo.value = res
    }
  }

  return { userInfo, getUserInfo }
})
