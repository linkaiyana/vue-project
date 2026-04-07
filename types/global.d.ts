/*
 * @Author: linkaiyan
 * @Date: 2026-01-27 15:38:47
 * @LastEditTime: 2026-01-28 10:32:38
 * @LastEditors: linkaiyan
 * @Description:
 */
declare global {
  interface AndroidBridge {
    [key: string]: ((...args: any[]) => void) | undefined
  }

  interface IOSMessageHandler {
    postMessage?: (payload?: any) => void
  }

  interface IOSBridge {
    messageHandlers?: Record<string, IOSMessageHandler | undefined>
  }

  interface Window {
    Android?: AndroidBridge
    VConsole: any
    openPendantWebView?: () => void
    webkit?: IOSBridge
  }
}

export {}
