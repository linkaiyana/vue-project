<!--
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:34:39
 * @LastEditTime: 2026-03-26 11:21:06
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

showToast('hahah')
</script>

<template>
  {{ t('txt1') }}
  <VanButton class="mt-5" bg="red">
    hha
  </VanButton>
</template>

<style lang="scss" scoped></style>
