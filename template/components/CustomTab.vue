<!--
 * @Author: linkaiyan
 * @Date: 2025-09-30 15:04:12
 * @LastEditTime: 2026-03-09 15:14:56
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
defineProps<{ tabs: string[] }>()

const emits = defineEmits(['change'])

const curIndex = defineModel('curIndex', {
  type: Number,
  default: 0,
})

function changeTab(index: number) {
  curIndex.value = index
  emits('change', index)
}
</script>

<template>
  <div class="customTab">
    <CommonBtn
      v-for="(item, index) in tabs"
      :key="index"
      class="customTab-item"
      :class="{
        active: index === curIndex,
      }"
      @click="changeTab(index)"
    >
      {{ item }}
    </CommonBtn>
  </div>
</template>

<style lang='scss' scoped>
.customTab {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  margin: auto;

  &-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 272px;
    height: 76px;
    background-image: url('../assets/btn/btn-tab.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 30px;
    color: #f3e9ec;
    margin: 0 15px;

    &.active {
      color: #fff3fb;
      background-image: url('../assets/btn/btn-tab-active.png');
    }
  }
}
</style>
