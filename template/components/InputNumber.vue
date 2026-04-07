<!--
 * @Author: linkaiyan
 * @Date: 2025-10-29 10:52:39
 * @LastEditTime: 2026-04-07 17:36:18
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
const value = defineModel('value', { type: Number, default: 1 })
</script>

<template>
  <VanStepper v-model="value" v-bind="$attrs" />
</template>

<style lang='scss' scoped>
.van-stepper {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 248px;
  height: 64px;
  border-radius: 18px;
  background-color: #96ccf4;

  :deep(.van-stepper__minus),
  :deep(.van-stepper__plus) {
    width: 64px;
    height: 64px;
    background-color: #283393;
    border: 2px solid #96ccf4;
    background: transparent;

    &:active {
      transform: none;
    }

    &::before,
    &::after {
      background-color: #b48263;
      border-radius: 2px;
    }

    &::before {
      width: 22px;
      height: 4px;
    }

    &::after {
      width: 4px;
      height: 22px;
    }
  }

  :deep(.van-stepper__minus) {
    border-radius: 18px 0 0 18px;
  }
  :deep(.van-stepper__plus) {
    border-radius: 0 18px 18px 0;
  }
  :deep(.van-stepper__input) {
    color: #113278;
    font-size: 24px;
    flex: 1;
    background: transparent;
  }
}
</style>
