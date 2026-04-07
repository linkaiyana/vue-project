<!--
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:36:30
 * @LastEditTime: 2025-12-17 17:45:21
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
const emits = defineEmits(['click'])
</script>

<template>
  <div class="avatarIcon">
    <slot><div class="avatarIcon_iframe" /></slot>
    <slot name="content">
      <img class="avatarIcon_avatar" v-bind="$attrs" @click.stop="emits('click')">
    </slot>
  </div>
</template>

<style lang='scss'>
.avatarIcon {
  position: relative;
  overflow: hidden;
  &_iframe {
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  &_avatar {
    position: relative;
    z-index: 1;
    margin: 0 auto;
  }
}
</style>
