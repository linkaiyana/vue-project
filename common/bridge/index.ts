/*
 * @Author: linkaiyan
 * @Date: 2026-04-02 11:03:09
 * @LastEditTime: 2026-04-03 16:33:35
 * @LastEditors: linkaiyan
 * @Description:
 */
import type { BrowserSharePlatformParams, SaveImageParams } from './config'
import type { Platform } from './types'
import { extractUAEquipment } from '../utils/ua'
import { bridgeDefinitions } from './config'
import { createBridgeActions } from './core'

const platform = extractUAEquipment()
const actions = createBridgeActions(platform, bridgeDefinitions)

export const {
  goAppBack,
  goRecharge,
  goAppUserInfoPage,
  goAppSaveImage,
  goAppBrowserSharePlatform,
  goAppUserRoom,
  goAppToNativePage,
  goAppNavigateChat,
  openHalfScreenWebView,
  setContainerBackground,
  pickUpWebView,
  floatOpenActivityPage,
  appOpenWebview,
  openDailySignInDialog,
  openUserSetting,
  navigateMain,
  openDynamicPublish,
  goMiniInfoCardView,
  goElementView,
} = actions

export function goAppRecordEvent(diamonds: number) {
  if (platform !== 'android')
    return

  const curDiamonds = Math.floor((diamonds / 500) * 100) / 100
  window.Android?.recordEvent?.(curDiamonds.toFixed(2))
}

export function goQuickMatch() {
  if (platform === 'ios') {
    goAppToNativePage('/Match/QuickMatch')
    return
  }

  goAppToNativePage('/Meet/QuickMatch')
}

export function goVIPView() {
  if (platform === 'ios') {
    goAppToNativePage('/Me/vip')
    return
  }

  goAppToNativePage('/Me/Vip')
}

export function goNobleView(nobleId: number = 1) {
  if (platform === 'ios') {
    goAppToNativePage('/Me/noble', { nobleId })
    return
  }

  goAppToNativePage('/Me/Noble', { noble_id: nobleId })
}

export type {
  BrowserSharePlatformParams,
  Platform,
  SaveImageParams,
}

export {
  extractUAEquipment,
  platform,
}
