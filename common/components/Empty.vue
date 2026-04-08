<!--
 * @Author: linkaiyan
 * @Date: 2025-09-23 11:58:00
 * @LastEditTime: 2026-04-08 15:19:10
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang="ts">
import useClientStore from '@/store/clientStore'

defineProps<{
  text?: string
}>()

const clientStore = useClientStore()

const showCtn = computed(() => {
  const languageMap = {
    'zh-CN': '暂无数据',
    'zh-TW': '暫無數據',
    'en-US': 'No data',
    'ko-KR': '데이터가 없습니다',
    'vi-VN': 'Không có dữ liệu',
  }
  const languageCode = clientStore.clientInfo?.languageCode || 'zh-CN'
  return languageMap[languageCode]
})
</script>

<template>
  <div class="empty">
    {{ text || showCtn }}
  </div>
</template>

<style lang='scss' scoped>
.empty {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #3a596d;
}
</style>
