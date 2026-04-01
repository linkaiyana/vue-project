<!--
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:34:39
 * @LastEditTime: 2026-01-13 11:29:40
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

showToast('hahah')
</script>

<template>
  <div class="txt">
    {{ t('test') }}
  </div>
  <VanButton class="mt-5" bg="red">
    hha
  </VanButton>
</template>

<style lang="scss" scoped>
.txt {
  width: 720px;
  height: 720px;
  background-color: red;
  font-size: 10px;
}
</style>
