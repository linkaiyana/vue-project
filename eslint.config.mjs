/*
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:01:44
 * @LastEditTime: 2026-01-12 09:48:14
 * @LastEditors: linkaiyan
 * @Description:
 */
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    rules: {
      // 允许在定义前使用函数（针对 setup 中的函数提升）
      '@typescript-eslint/no-use-before-define': 'off',
      'vue/no-v-text-v-html-on-component': 'off',
      'vue/multi-word-component-names': 'off',
      'no-unused-expressions': 'off',
      'node/prefer-global/process': 'off',
      'no-console': 'warn',
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false,
          ignores: [],
        },
      ],
      'antfu/if-newline': 'off',
    },
    gitignore: true,
    ignores: [
      '**/*.json',
      '**/*.yaml',
    ],
    formatters: {
      css: true,
      html: true,
    },
  },
)
