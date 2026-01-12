<!--
 * @Author: linkaiyan
 * @Date: 2025-09-23 11:58:00
 * @LastEditTime: 2025-10-30 10:34:16
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup>
defineProps({
  text: {
    type: String,
    default: '暫無數據',
  },
})
</script>

<template>
  <div class="empty">
    {{ text }}
  </div>
</template>

<style lang='scss' scoped>
.empty {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Roboto sans-serif;
  font-size: 24px;
  color: #3a596d;
}
</style>
