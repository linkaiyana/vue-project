<!--
 * @Author: linkaiyan
 * @Date: 2026-01-19 11:42:31
 * @LastEditTime: 2026-04-07 16:37:01
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
const props = defineProps<{
  loading?: boolean
  tabs: string[]
}>()

const emits = defineEmits(['update:tabIndex', 'change'])
const tabIndex = defineModel('tabIndex', {
  type: Number,
  default: 0,
})
function changeTab(idx: number) {
  if (props.loading) {
    return
  }
  tabIndex.value = idx
  emits('change', idx)
}
</script>

<template>
  <div class="scrollTab">
    <div v-for="(item, index) in tabs" :key="index" :class="`scrollTab_item  ${tabIndex === (index) ? 'active' : ''}`" @click="changeTab(index)">
      {{ item }}
    </div>
    <div :class="`scrollTab_slider scrollTab_slider${tabIndex + 1}`" />
  </div>
</template>

<style lang='scss' scoped>
@use 'sass:list';

.scrollTab {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 250px;
  height: 50px;
  background: #f7ffce;
  border-radius: 25px;
  padding: 0 4px;

  &_slider {
    position: absolute;
    left: 0;
    top: 4px;
    bottom: 0;
    width: 120px;
    height: 42px;
    transition: 0.2s transform linear;
    background-color: #d7ed76;
    border-radius: 21px;

    $left: 4px 125px;
    @for $idx from 1 through 2 {
      &#{$idx} {
        transform: translateX(list.nth($left, $idx));
      }
    }
  }

  &_item {
    position: relative;
    z-index: 1;
    width: 120px;
    height: 42px;
    color: #a0b448;
    font-size: 24px;
    line-height: 42px;
    text-align: center;

    &.active {
      color: #6d931c;
      font-weight: bold;
    }
  }
}
</style>
