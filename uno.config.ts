/*
 * @Author: linkaiyan
 * @Date: 2026-01-09 15:36:03
 * @LastEditTime: 2026-01-09 18:59:16
 * @LastEditors: linkaiyan
 * @Description:
 */
import {
  defineConfig,
  presetAttributify,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        roboto: 'Roboto',
        // mono: ['Fira Code', 'Fira Mono:400,700'],
      },
    }),
  ],
  transformers: [transformerDirectives()],
})
