/*
 * @Author: linkaiyan
 * @Date: 2025-12-19 14:52:16
 * @LastEditTime: 2026-03-26 15:52:49
 * @LastEditors: linkaiyan
 * @Description:
 */
import type { App } from 'vue'
import type { I18nOptions } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

export default {
  install(app: App) {
    // 获取当前语言环境
    const getCurrentLocale = () => {
      // 可以从 localStorage、URL 参数或其他地方获取当前语言设置
      return localStorage.getItem('locale') || 'zh-CN'
    }

    // 动态加载特定语言包（带缓存）
    const loadLocaleMessages = async (): Promise<Record<string, Record<string, string>>> => {
      const modules = import.meta.glob('@PF/locales/*.json', { eager: true }) as Record<
        string,
        { default?: Record<string, string> } & Record<string, unknown>
      >

      const localeMessages: Record<string, Record<string, string>> = {}

      for (const path in modules) {
        const fileName = path.split('/').pop()?.replace('.json', '')
        if (fileName) {
          const module = modules[path]
          localeMessages[fileName] = ('default' in module ? module.default : module) as Record<string, string>
        }
      }

      return localeMessages
    }

    // 初始化 i18n 实例
    const initI18n = async () => {
      const locale = getCurrentLocale()
      const messages = await loadLocaleMessages()

      const i18nOptions: I18nOptions = {
        legacy: false,
        locale,
        messages,
      }

      const i18n = createI18n(i18nOptions)

      app.use(i18n)

      // 提供一个方法用于后续切换语言
      // app.config.globalProperties.$changeLocale = async (newLocale: string) => {
      //   if (newLocale !== i18n.global.locale.value) {
      //     const newMessages = await loadLocaleMessages(newLocale)
      //     i18n.global.setLocaleMessage(newLocale, newMessages)
      //     i18n.global.locale.value = newLocale
      //   }
      // }
    }

    initI18n().catch((error: unknown) => {
      console.error('i18n 初始化失败:', error)
    })
  },
}
