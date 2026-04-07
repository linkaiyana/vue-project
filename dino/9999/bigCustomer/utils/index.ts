/*
 * @Author: linkaiyan
 * @Date: 2025-10-30 16:57:09
 * @LastEditTime: 2026-04-07 15:41:07
 * @LastEditors: linkaiyan
 * @Description:
 */
import { USER_TYPE } from '../api/constants'
import useUserStore from '../store/userStore'

function selfClick(fn: () => void) {
  const userStore = useUserStore()
  const { userInfo } = storeToRefs(userStore)

  if (!userInfo.value)
    return

  if (userInfo.value.userType !== USER_TYPE.BIGCUSTOMER) {
    return showToast('該活動僅限大客戶身份玩家參與')
  }

  fn()
}

export {
  selfClick,
}
