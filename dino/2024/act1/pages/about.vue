<!--
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:34:56
 * @LastEditTime: 2026-03-31 17:01:58
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
import svgaUrl from '../assets/box-ani-1.svga'

function onSvgaFinished() {
  console.warn('onSvgaFinished')
}
</script>

<template>
  <div>
    <OuterComponents />
    <InnerComponents />

    <SVGAPlayer class="svga-player" :url="svgaUrl" :player-options="{ loop: 1 }" autoplay usedb @on-end="onSvgaFinished" />

    222
  </div>
</template>

<style lang='scss' scoped>

</style>
