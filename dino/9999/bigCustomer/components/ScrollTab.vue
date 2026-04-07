<script setup lang='ts'>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:tabIndex', 'change'])
const tabIndex = defineModel('tabIndex', {
  type: Number,
  default: 0,
})
const tabs = ['本期投票', '上期投票']

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
    <div :class="`scrollTab_slider scrollTab_slider${tabIndex + 1}`" />
    <div v-for="(item, index) in tabs" :key="index" :class="`scrollTab_item scrollTab_item${item} ${tabIndex === (index) ? 'active' : ''}`" @click="changeTab(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
@use 'sass:list';

.scrollTab {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 440px;
  height: 52px;
  padding: 0 6px;
  box-sizing: border-box;
  background: url('../assets/bg/bg-scrollTab.png') no-repeat center / 100%;

  &_slider {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 214px;
    height: 44px;
    background: url('../assets/bg/bg_active.png') no-repeat center / 100%;
    transition: 0.2s transform linear;

    $left: 6px 220px;
    @for $idx from 1 through 2 {
      &#{$idx} {
        transform: translateX(list.nth($left, $idx));
      }
    }
  }

  &_item {
    position: relative;
    z-index: 1;
    width: 214px;
    height: 44px;
    color: #5d86e6;
    font-size: 24px;
    line-height: 44px;
    text-align: center;

    &.active {
      font-weight: bold;
      background: linear-gradient(180deg, #9f6237 0%, #d08659 100%);
      background-clip: text;
      color: transparent;
    }
  }
}
</style>
