/*
 * @Author: linkaiyan
 * @Date: 2026-01-09 15:36:03
 * @LastEditTime: 2026-04-01 14:59:49
 * @LastEditors: linkaiyan
 * @Description:
 */
import {
  defineConfig,
  presetAttributify,
  presetWind3,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
  ],
  transformers: [transformerDirectives()],
})
