import { defineBridge } from './core'

// app 保存图片参数
export interface SaveImageParams {
  imageBase64: string
  callback?: 'saveImageState'
}

// web 页分享到三方平台参数
export interface BrowserSharePlatformParams {
  platform: string
  content: string
  imageBase64: string
}

function hasValue(value?: string | null) {
  return Boolean(value?.trim())
}

export const bridgeDefinitions = {
  // 调用 app 方法关闭网页
  goAppBack: defineBridge({
    android: {
      method: 'goBack',
      args: () => [],
    },
    ios: {
      handler: 'browserPageClose',
      payload: () => '',
    },
  }),

  // 跳转到 app 充值页面
  goRecharge: defineBridge({
    android: {
      method: 'goRecharge',
      args: () => [],
    },
    ios: {
      handler: 'pageToRecharge',
      payload: () => '',
    },
  }),

  // 跳转到 app 用户详情
  goAppUserInfoPage: defineBridge<[userId: string]>({
    validate: userId => hasValue(userId) || 'userId is required',
    android: {
      method: 'goUserInfo',
    },
    ios: {
      handler: 'browserPageToSubscriber',
      payload: userId => userId,
    },
  }),

  // app 保存图片
  goAppSaveImage: defineBridge<[params: SaveImageParams]>({
    android: {
      method: 'saveImage',
      args: params => params.callback ? [params.imageBase64, params.callback] : [params.imageBase64],
    },
    ios: {
      handler: 'browserFamousSavePicture',
      payload: params => params,
    },
  }),

  // web 页分享到三方平台调用原生方法
  goAppBrowserSharePlatform: defineBridge<[params: BrowserSharePlatformParams]>({
    android: {
      method: 'browserSharePlatform',
      args: params => [JSON.stringify(params)],
    },
    ios: {
      handler: 'browserSharePlatform',
      payload: params => params,
    },
  }),

  // 跳转到 app 用户房间
  goAppUserRoom: defineBridge<[channelId: string, instanceId: string]>({
    validate: (channelId, instanceId) =>
      (hasValue(channelId) && hasValue(instanceId)) || 'channelId and instanceId are required',
    android: {
      method: 'goRoom',
    },
    ios: {
      handler: 'browserPageToRoom',
      payload: (channelId, instanceId) => ({
        channelId,
        instanceId: `${instanceId}`,
      }),
    },
  }),

  // 收起浮窗
  // H5 跳转 app 内指定的原生页面
  goAppToNativePage: defineBridge<[path: string, paramMap?: Record<string, unknown>]>({
    validate: path => hasValue(path) || 'path is required',
    android: {
      method: 'toNativePage',
      args: (path, paramMap) => [path, JSON.stringify(paramMap ?? {})],
    },
    ios: {
      handler: 'toNativePage',
      payload: (path, paramMap) => ({
        path,
        ...(paramMap ?? {}),
      }),
    },
  }),

  // H5 跳转 app 内用户私聊页
  goAppNavigateChat: defineBridge<[chatId: string]>({
    validate: chatId => hasValue(chatId) || 'chatId is required',
    android: {
      method: 'navigateChat',
    },
    ios: {
      handler: 'navigateChat',
      payload: chatId => ({ chatId }),
    },
  }),

  // 打开新的 webView
  openHalfScreenWebView: defineBridge<[url: string, height?: string]>({
    validate: url => hasValue(url) || 'url is required',
    android: {
      method: 'openHalfScreenWebView',
      args: (url, height = '0.5') => [url, height],
    },
    ios: {
      handler: 'openHalfScreenWebView',
      payload: (url, height = '0.5') => ({ url, height }),
    },
  }),

  // 设置 webview 背景色
  setContainerBackground: defineBridge<[color?: string]>({
    android: {
      method: 'setContainerBackground',
      args: (color = '#00FFFFFF') => [color],
    },
    ios: {
      handler: 'setContainerBackground',
      payload: (color = '#00FFFFFF') => ({ color }),
    },
  }),

  // 收起悬浮挂件的 webview
  pickUpWebView: defineBridge({
    android: {
      method: 'pickUpWebView',
      args: () => [],
    },
    ios: {
      handler: 'pickUpWebView',
      payload: () => '',
    },
  }),

  // 浮窗内跳转指定的 h5 全屏页面
  floatOpenActivityPage: defineBridge<[url: string]>({
    validate: url => hasValue(url) || 'url is required',
    android: {
      method: 'floatOpenActivityPage',
    },
    ios: {
      handler: 'floatOpenActivityPage',
      payload: url => url,
    },
  }),

  // app 开启新的 webview
  appOpenWebview: defineBridge<[page: string]>({
    validate: page => hasValue(page) || 'page is required',
    android: {
      method: 'startWebPage',
    },
    ios: {
      handler: 'browserFamousChangePage',
      payload: page => ({ page }),
    },
  }),

  // 打开每日签到弹窗
  openDailySignInDialog: defineBridge({
    android: {
      method: 'openSignInDialog',
      args: () => [],
    },
    ios: {
      handler: 'openSignInDialog',
      payload: () => '',
    },
  }),

  // 跳转个人资料填写
  openUserSetting: defineBridge({
    android: {
      method: 'openUserSetting',
      args: () => [],
    },
    ios: {
      handler: 'openUserSetting',
      payload: () => '',
    },
  }),

  // 跳转至心动电报匹配页面
  // 跳转 App 指定的 Tab
  navigateMain: defineBridge<[index: string | number]>({
    android: {
      method: 'navigateMain',
      args: index => [`${index}`],
    },
    ios: {
      handler: 'navigateMain',
      payload: index => `${index}`,
    },
  }),

  // 跳转到动态发布页面
  openDynamicPublish: defineBridge({
    android: {
      method: 'openDynamicPublish',
      args: () => [],
    },
    ios: {
      handler: 'openDynamicPublish',
      payload: () => '',
    },
  }),

  // 跳到迷你资料卡页面
  goMiniInfoCardView: defineBridge({
    android: {
      method: 'openDressUp',
      args: () => ['5'],
    },
    ios: {
      handler: 'toNativePage',
      payload: () => ({
        path: '/Me/dress',
        index: 3,
      }),
    },
  }),

  // 跳到装扮页面
  goElementView: defineBridge({
    android: {
      method: 'openDressUp',
      args: () => ['3'],
    },
    ios: {
      handler: 'toNativePage',
      payload: () => ({
        path: '/Me/dress',
        index: 1,
      }),
    },
  }),

  // 跳到 VIP 页面
}
