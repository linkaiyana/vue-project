<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  fullScreenImage: string
  halfScreenImage?: string
}>()
const attrs = useAttrs()

const route = useRoute()
const isHalfScreen = route.query.half || false

const headerImage = computed(() => {
  return isHalfScreen && props.halfScreenImage ? props.halfScreenImage : props.fullScreenImage
})
const headerClass = computed(() => {
  const base = attrs.class || ''
  return isHalfScreen
    ? `${base} ${base}-half`.trim()
    : base
})
</script>

<template>
  <header class="relative z-0 w-[100%]" :class="headerClass">
    <img
      :src="headerImage"
      class="pointer-events-none absolute left-0 top-0 z-0 w-[100%]"
      alt="header"
      title="header"
      fetchpriority="high"
    >
    <slot />
  </header>
</template>
