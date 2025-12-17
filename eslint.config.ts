/*
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:01:44
 * @LastEditTime: 2025-12-17 17:15:29
 * @LastEditors: linkaiyan
 * @Description:
 */
import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue, { rules } from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { resolve } from 'path'
import { execSync } from 'child_process'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup
// "lint": "eslint ./dino/2025/myActivity --fix --cache",
// 获取当前 Git 分支名
function getCurrentBranch(): string | null {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim()
  } catch (error) {
    console.warn('无法获取 Git 分支信息:', error.message)
    return null
  }
}

const currentBranch = getCurrentBranch()
console.log('当前 Git 分支:', currentBranch)

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: [`./dino/2024/myActivity/**/*.{ts,mts,tsx,vue}`],
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
)
