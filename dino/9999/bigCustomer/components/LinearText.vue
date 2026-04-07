<!--
 * @Author: linkaiyan
 * @Date: 2025-10-29 11:47:16
 * @LastEditTime: 2025-10-30 20:09:10
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
withDefaults(defineProps<{
  text: string | number
  type?: 'gold' | 'brown' | 'gray'
}>(), {
  type: 'gold',
})
</script>

<template>
  <span :class="`linearText ${type}`">{{ text }}</span>
</template>

<style lang='scss' scoped>
.linearText {
  color: transparent;
  background-clip: text;

  &.brown {
    background-image: linear-gradient(180deg, #9f6237 0%, #d08659 100%);
  }

  &.gold {
    background-image: linear-gradient(180deg, #ffce93 0%, #fdf8eb 100%);
  }

  &.gray {
    background-image: linear-gradient(180deg, #636363 0%, #979797 100%);
  }
}
</style>
