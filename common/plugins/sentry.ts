/*
 * @Author: linkaiyan
 * @Date: 2026-03-11 17:53:04
 * @LastEditTime: 2026-03-26 11:45:40
 * @LastEditors: linkaiyan
 * @Description:
 */
import type { App } from 'vue'
import { activityName } from '@PF/constants'
import * as Sentry from '@sentry/vue'

export default {
  install: (app: App) => {
    // 在开发环境中完全禁用 Sentry
    if (import.meta.env.MODE === 'development') {
      // eslint-disable-next-line no-console
      console.log('Sentry disabled in development mode')
      return
    }

    Sentry.init({
      app,
      dsn: 'https://54ccc7f7ff93038bc557696e00519534@sg-sentry.changzhi.top/50',
      integrations: [
        Sentry.browserTracingIntegration(),
      ],
      // Performance Monitoring
      tracesSampleRate: 1.0, //  Capture 100% of the transactions
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: [
        // 'localhost',
        // /^https:\/\/test-env\.dinoapi\.com\/api/,
        // /^https:\/\/api3\.dinoapi\.com\/api/,
        // /^https:\/\/api3\.wanzhiwangluo\.cn\/api/,
      ],
      environment: import.meta.env.MODE,
      enableLogs: true,
      sendDefaultPii: true,

      // 错误过滤
      ignoreErrors: [
        /Unable to preload CSS/,
        /Request aborted/,
        /AbortError/,
        /Network Error/,

        // fireBase三方库报的错
        /UnknownError: Attempt to get a record from database without an in-progress transaction/,
        /Importing a module script failed./,
        /UnknownError: Attempt to delete range from database without an in-progress transaction/,
      ],
    })

    const scope = Sentry.getCurrentScope()
    scope.setTransactionName(`Activity: ${activityName}`)
  },
}
