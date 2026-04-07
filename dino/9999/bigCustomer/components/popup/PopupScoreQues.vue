<!--
 * @Author: linkaiyan
 * @Date: 2025-10-29 14:12:56
 * @LastEditTime: 2026-04-07 14:40:28
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
const route = useRoute()
const isHalfScreen = route.query?.half || false

const show = defineModel('show', {
  type: Boolean,
  default: false,
})

function close() {
  show.value = false
}
</script>

<template>
  <PopupCommon class="popupScoreQues" :show="show" title="常見問題答疑" @close="close">
    <div class="ctn" :class="{ half: isHalfScreen }">
      <img src="../../assets/bg/bg-ques.png">
    </div>
  </PopupCommon>
</template>

<style lang='scss' scoped>
.popupScoreQues {
  .ctn {
    width: 562px;
    height: 747px;
    margin: 10px auto 32px;
    overflow-y: auto;

    &.half {
      height: 563px;
    }

    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
