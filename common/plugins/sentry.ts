/*
 * @Author: linkaiyan
 * @Date: 2026-03-11 17:53:04
 * @LastEditTime: 2026-03-26 12:01:58
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
      dsn: 'https://ba407523305c76c44cc851938b31e27c@o4510996408762368.ingest.us.sentry.io/4511025244536832',
      integrations: [
        Sentry.browserTracingIntegration({
          beforeStartSpan: (context) => {
            // op 为 'pageload' 表示页面首次加载，'navigation' 表示路由切换
            if (context.op === 'pageload' || context.op === 'navigation') {
              return {
                ...context,
                name: `Activity: ${activityName}`, // 强制指定你想要的名字
              }
            }
            return context
          },
        }),
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
