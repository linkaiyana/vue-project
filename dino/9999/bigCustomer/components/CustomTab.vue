<!--
 * @Author: linkaiyan
 * @Date: 2025-09-30 15:04:12
 * @LastEditTime: 2025-10-31 18:11:24
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
const emits = defineEmits(['change'])

const tabs = ['大客戶福利', '大客戶商城']

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
      <span>{{ item }}</span>
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
    width: 280px;
    height: 80px;
    background-size: auto 36px;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url('../assets/btn/btn-tab.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-weight: bold;
    font-size: 30px;
    color: transparent;
    margin: 0 10px;

    span {
      background-image: linear-gradient(180deg, #113278 0%, #4c7aba 100%);
      background-clip: text;
      line-height: 1.2;
    }

    &.active {
      background-image: url('../assets/btn/btn-tab-active.png');

      span {
        background-image: linear-gradient(180deg, #9f6237 0%, #d08659 100%);
      }
    }
  }
}
</style>
