<!--
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:36:30
 * @LastEditTime: 2026-03-11 17:43:14
 * @LastEditors: linkaiyan
 * @Description:
-->
<template>
  <div class="avatarIcon">
    <slot><div class="avatarIcon_iframe" /></slot>
    <slot name="content">
      <Picture class="avatarIcon_avatar" v-bind="$attrs" />
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
