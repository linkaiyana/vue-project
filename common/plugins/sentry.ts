/*
 * @Author: linkaiyan
 * @Date: 2026-03-11 17:53:04
 * @LastEditTime: 2026-03-31 16:08:39
 * @LastEditors: linkaiyan
 * @Description:
 */
import type { App } from 'vue'
import * as Sentry from '@sentry/vue'

interface CreateSentryOptions {
  activityName: string
}

export default function createSentryPlugin(options: CreateSentryOptions) {
  const { activityName } = options

  return {
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
                  name: `Activity: ${activityName}`,
                }
              }
              return context
            },
          }),
        ],
        // Performance monitoring.
        tracesSampleRate: 0.1,
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
}
