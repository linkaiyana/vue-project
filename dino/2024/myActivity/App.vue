<!--
 * @Author: linkaiyan
 * @Date: 2025-12-03 15:00:50
 * @LastEditTime: 2026-01-28 10:39:13
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang="ts">
const a = ref<ActivityParamIdDto>({ id: 1 })

console.log(a)

console.log(import.meta.env.VITE_BACKEND_URL)
</script>

<template>
  <ul>
    <li class="mb-5 mb10">
      1哈哈哈哈
    </li>
    <li>2</li>
    <li>3</li>
  </ul>
  <RouterView />
</template>

<style scoped>
  li {
  font-family: roboto;
}
</style>
