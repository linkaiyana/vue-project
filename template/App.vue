<!--
 * @Author: linkaiyan
 * @Date: 2025-12-03 15:00:50
 * @LastEditTime: 2026-04-07 17:56:57
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang="ts">
import bgHalfHeader from '@PF/assets/bg/bg-header2.png'
import bgFullHeader from '@PF/assets/bg/bg-header.png'
</script>

<template>
  <div class="app">
    <!-- 头图 -->
    <ActiveHeader
      class="app-header"
      :full-screen-image="bgFullHeader"
      :half-screen-image="bgHalfHeader"
    />
    <div class="app-ctn">
      <RouterView />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app {
  min-height: 100vh;
  background-color: #020129;
  overflow: hidden;

  &-header {
    height: 804px;
    position: relative;

    &-half {
      height: 380px;
    }
  }

  &-ctn {
    position: relative;
    z-index: 1;
  }
}
</style>
