<!--
 * @Author: linkaiyan
 * @Date: 2026-03-09 18:00:41
 * @LastEditTime: 2026-04-07 17:00:20
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
withDefaults(defineProps<{
  show: boolean
  lockScroll?: boolean
  closeable?: boolean
}>(), {
  lockScroll: true,
  closeable: true,
})

const emits = defineEmits(['close'])
</script>

<template>
  <VanOverlay :show="show" z-index="1000" :lock-scroll="lockScroll" class="popupCommon">
    <div class="popupCommon-ctn">
      <slot />
      <CommonBtn v-if="closeable" class="popupCommon_close" @click="emits('close')" />
    </div>
  </VanOverlay>
</template>

<style lang='scss' scoped>
.popupCommon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &-ctn {
    overflow: hidden;
  }
  &_close {
    position: absolute;
    right: 0;
    top: 50px;
    width: 50px;
    height: 50px;
    background: url('@PF/assets/btn/btn-close.png') no-repeat center / contain;
  }
}
</style>
