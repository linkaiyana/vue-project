/*
 * @Author: linkaiyan
 * @Date: 2025-12-19 14:52:16
 * @LastEditTime: 2026-01-27 10:36:13
 * @LastEditors: linkaiyan
 * @Description:
 */
import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

export default {
  install(app: App) {
    // 语言包缓存
    const localeCache: Record<string, any> = {}

    // 获取当前语言环境
    const getCurrentLocale = () => {
      // 可以从 localStorage、URL 参数或其他地方获取当前语言设置
      return localStorage.getItem('locale') || 'zh-CN'
    }

    // 动态加载特定语言包（带缓存）
    const loadLocaleMessages = async (locale: string) => {
      // 如果已经在缓存中，直接返回
      if (localeCache[locale]) {
        return localeCache[locale]
      }

      try {
        // 使用 Vite 的动态导入功能
        const messages = await import(`@PF/locales/${locale}.json`)
        const result = messages.default || messages
        // 缓存结果
        localeCache[locale] = result
        return result
      }
      catch (error) {
        console.warn(`无法加载语言包: ${locale}`, error)
        return null
      }
    }

    // 初始化 i18n 实例
    const initI18n = async () => {
      const locale = getCurrentLocale()
      const messages = await loadLocaleMessages(locale)

      const i18n = createI18n({
        legacy: false,
        locale,
        messages: {
          [locale]: messages,
        },
      })

      app.use(i18n)

      // 提供一个方法用于后续切换语言
      app.config.globalProperties.$changeLocale = async (newLocale: string) => {
        if (newLocale !== i18n.global.locale.value) {
          const newMessages = await loadLocaleMessages(newLocale)
          i18n.global.setLocaleMessage(newLocale, newMessages)
          i18n.global.locale.value = newLocale
        }
      }
    }

    initI18n()
  },
}
