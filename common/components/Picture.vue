<!--
 * @Author: linkaiyan
 * @Date: 2025-12-30 18:31:08
 * @LastEditTime: 2026-01-12 16:29:56
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
import type { ImageFit } from 'vant'

withDefaults(defineProps<{
  lazyLoad?: boolean
  fit?: ImageFit
}>(), {
  lazyLoad: true,
  fit: 'contain',
})
</script>

<template>
  <VanImage
    :lazy-load="lazyLoad"
    :fit
    v-bind="$attrs"
    class="picture"
  />
</template>

<style lang='scss' scoped>
.picture {
  overflow: hidden;
}
</style>
