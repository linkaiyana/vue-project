<!--
 * @Author: linkaiyan
 * @Date: 2025-09-28 18:38:40
 * @LastEditTime: 2025-12-26 17:03:51
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
interface ButtonProps {
  block?: boolean
  duration?: number
  tagName?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  block: false,
  duration: 300,
  tagName: 'button',
})

const extraClass = ref('')

let isRunning = false
function startAni() {
  if (isRunning) return
  isRunning = true
  extraClass.value = 'running'
  setTimeout(() => {
    extraClass.value = ''
    isRunning = false
  }, props.duration)
}
</script>

<template>
  <component
    :is="tagName"
    class="commonBtn"
    :class="[`${extraClass}`, { block }]"
    :style="{
      '--animation-duration': `${duration}ms`,
    }"
    :data-duration="`${duration}ms`"
    bg="contain no-repeat"
    @click="startAni"
  >
    <slot />
  </component>
</template>

<style lang="scss">
@keyframes btnAni {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.commonBtn {
  border: none;
  background-color: transparent;
  font: inherit;
  transform-origin: center center;
  padding: 0;

  &.block {
    display: block;
  }

  &.running {
    animation: btnAni var(--animation-duration, 300ms) ease-in-out;
  }
}
</style>
