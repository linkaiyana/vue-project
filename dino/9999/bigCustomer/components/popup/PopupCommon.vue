<script setup lang='ts'>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },

  closeable: {
    type: Boolean,
    default: true,
  },
  lockScroll: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['close'])
</script>

<template>
  <VanOverlay :show="show" z-index="1000" :lock-scroll="lockScroll" class="flex-center popupCommon" @click="emits('close')">
    <ContentBox class="popupCommon_wrapper" :title @click.stop>
      <div class="ctn">
        <slot />
      </div>
      <CommonBtn v-if="closeable" class="popupCommon_close" @click="emits('close')" />
    </ContentBox>
  </VanOverlay>
</template>

<style lang='scss' scoped>
.popupCommon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &_wrapper {
    position: relative;
    box-sizing: border-box;

    .ctn {
      position: relative;
    }
  }

  &_close {
    position: absolute;
    right: -2px;
    top: -2px;
    width: 50px;
    height: 50px;
    background: url('../../assets/btn/btn-close.png') no-repeat center / contain;
  }
}
</style>
