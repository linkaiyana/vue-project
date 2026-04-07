<!--
 * @Author: linkaiyan
 * @Date: 2025-10-24 10:12:44
 * @LastEditTime: 2025-10-24 16:50:06
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
interface Props {
  title?: string
  size?: string
  withHeader?: boolean
}

withDefaults(defineProps<Props>(), {
  title: '',
  size: 'small',
  withHeader: true,
})
</script>

<template>
  <div :class="`contentBox ${size} ${title ? 'withTitle' : ''}`">
    <div class="contentBox-box">
      <div class="contentBox-midBox">
        <div class="contentBox-innerBox">
          <div v-if="withHeader" class="header" />
          <div v-if="title" class="title">
            <span>{{ title }}</span>
          </div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.contentBox {
  width: 622px;
  margin: auto;

  &.small {
    width: 622px;

    .header {
      width: 660px;
      background: url('../assets/bg/bg-boxHeader-small.png') no-repeat center / 100%;
    }
  }

  &.large {
    width: 660px;

    .header {
      width: 700px;
      background: url('../assets/bg/bg-boxHeader-large.png') no-repeat center / 100%;
    }
  }

  .header {
    position: absolute;
    top: -34px;
    left: 50%;
    height: 38px;
    transform: translateX(-50%);
  }

  .title {
    width: 408px;
    height: 86px;
    line-height: 66px;
    text-align: center;
    margin: -2px auto 0;
    background: url('../assets/bg/bg-title.png') no-repeat center / 100%;

    span {
      font-family: Microsoft YaHei UI;
      font-size: 30px;
      font-weight: bold;
      background: linear-gradient(180deg, #ffce93 0%, #fdf8eb 100%);
      background-clip: text;
      color: transparent;
    }
  }

  &-box {
    padding: 3px;
    height: 100%;
    background: linear-gradient(90deg, #efad70 0%, #f3d29c 29.33%, #fcf1dd 53.37%, #f3d29c 75.96%, #efad70 100%);
    border-radius: 20px;
  }

  &-midBox {
    padding: 2px;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #df9551 0%, #ebc27f 29.33%, #efd7aa 53.37%, #ebc27f 75.96%, #df9551 100%);
    border-radius: 18px;
  }

  &-innerBox {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 16px;
    border: 2px solid #5c6cc4;
    background: url('../assets/bg/bg-shine.png') no-repeat 0 -8px / 100% auto;
    background-color: #b6dfff;
  }
}
</style>
