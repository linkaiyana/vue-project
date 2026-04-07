<!--
 * @Author: linkaiyan
 * @Date: 2025-12-17 15:08:03
 * @LastEditTime: 2025-12-17 17:43:54
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
withDefaults(defineProps<{
  direction?: 'row' | 'column'
  showFront?: boolean
  showLast?: boolean
}>(), {
  direction: 'row',
  showFront: true,
  showLast: true,
})
</script>

<template>
  <div class="boxCustomBg">
    <div class="boxCustomBg_bg" :class="[{ column: direction === 'column' }]">
      <div v-if="showFront" class="boxCustomBg_bg_1" />
      <div class="boxCustomBg_bg_2" />
      <div v-if="showLast" class="boxCustomBg_bg_3" />
    </div>
    <div class="boxCustomBg_content">
      <slot />
    </div>
  </div>
</template>

<style lang='scss'>
.boxCustomBg {
  position: relative;

  &_bg {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;

    &_1,
    &_2,
    &_3 {
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    &_2,
    &_3 {
      margin: 0 0 0 -4px;
    }

    &_2 {
      flex: 1;
    }

    &.column {
      flex-direction: column;
      .boxCustomBg_bg_2,
      .boxCustomBg_bg_3 {
        margin: -4px 0 0;
      }
    }
  }

  &_content {
    position: relative;
    z-index: 2;
  }
}
</style>
