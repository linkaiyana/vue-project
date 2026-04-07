<script setup lang='ts'>
defineProps({
  num: {
    type: Number,
    default: 1,
  },
})
</script>

<template>
  <div class="sortNum">
    <span v-if="num > 3 || num === -1">{{ num > 10 || num === -1 ? '10+' : num }}</span>
    <div v-else :class="`sortNum_icon sortNum_icon_${num}`" />
  </div>
</template>

<style lang='scss' scoped>
.sortNum {
  width: 50px;
  height: 66px;
  line-height: 66px;
  font-size: 30px;
  color: #4a78b9;
  text-align: center;
  font-family: Roboto;
  font-weight: bold;
  &_icon {
    width: 50px;
    height: 66px;
    box-sizing: border-box;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    @for $idx from 1 through 3 {
      &_#{$idx} {
        background-image: url('@PF/assets/icon/icon-num#{ $idx }.png');
      }
    }
  }
}
</style>
