/*
 * @Author: linkaiyan
 * @Date: 2026-01-14 16:03:24
 * @LastEditTime: 2026-01-14 16:06:08
 * @LastEditors: linkaiyan
 * @Description:
 */
const urlMsg = new URL(location.href)

const isDebug = !!urlMsg.searchParams.get('debug')

export {
  isDebug,
}
