<!--
 * @Author: linkaiyan
 * @Date: 2025-10-29 10:52:39
 * @LastEditTime: 2026-04-07 11:51:17
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
interface Props {
  size?: 'small' | 'large'
  [key: string]: any
}

withDefaults(defineProps<Props>(), {
  size: 'large',
})

const value = defineModel('value', { type: Number, default: 1 })
</script>

<template>
  <VanStepper v-model="value" v-bind="$attrs" :class="[size]" />
</template>

<style lang='scss' scoped>
.van-stepper {
  display: flex;
  justify-content: center;
  align-items: center;

  &.large {
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
  &.small {
    width: 124px;
    height: 28px;
    border-radius: 18px;
    background-color: #96ccf4;

    :deep(.van-stepper__minus),
    :deep(.van-stepper__plus) {
      width: 46px;
      height: 28px;
      background-color: #ebebeb;
      flex-shrink: 0;

      &:active {
        transform: none;
      }

      &::before,
      &::after {
        background-color: #4a58e3;
        border-radius: 2px;
      }

      &::before {
        width: 12px;
        height: 4px;
      }

      &::after {
        width: 4px;
        height: 12px;
      }
    }

    :deep(.van-stepper__minus) {
      border-radius: 10px 0 0 10px;
    }
    :deep(.van-stepper__plus) {
      border-radius: 0 10px 10px 0;
    }
    :deep(.van-stepper__input) {
      color: #ffffff;
      font-size: 24px;
      flex: 1;
      width: 32px;
      height: 28px;
      margin: 0;
      background: #4a58e3;
    }
  }
}
</style>
