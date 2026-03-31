<!--
 * @Author: linkaiyan
 * @Date: 2025-11-14 15:50:45
 * @LastEditTime: 2025-11-17 11:17:49
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
import type { ParserConfigOptions, PlayerConfigOptions } from 'svga/dist/types'
import { DB, Parser, Player } from 'svga'

const props = defineProps<{
  url: string
  playerOptions?: PlayerConfigOptions
  parseOptions?: ParserConfigOptions
  autoplay?: boolean
  usedb?: boolean
}>()

const emits = defineEmits<{
  (e: 'onLoaded'): void
  (e: 'onStart'): void
  (e: 'onResume'): void
  (e: 'onPause'): void
  (e: 'onStop'): void
  (e: 'onEnd'): void
}>()

const playerRef = useTemplateRef<HTMLCanvasElement | null>('playerRef')

async function parseSvga(svgaUrl: string) {
  let svga
  let db
  if (props.usedb) {
    db = new DB()
    svga = await db.find(svgaUrl)
  }

  if (!svga) {
    const parser = new Parser({
      isDisableImageBitmapShim: true,
      ...props.parseOptions,
    })
    svga = await parser.load(svgaUrl)

    if (props.usedb && db) {
      // 新的svga，存储到db
      await db.insert(svgaUrl, svga)
    }

    parser.destroy()
  }

  return svga
}

async function initPlayer() {
  if (!playerRef.value || !props.url) return

  try {
    const svga = await parseSvga(props.url)
    const player = new Player({
      container: playerRef.value,
      ...props.playerOptions,
    })

    await player.mount(svga)

    emits('onLoaded')

    player.onStart = () => emits('onStart')
    player.onResume = () => emits('onResume')
    player.onPause = () => emits('onPause')
    player.onStop = () => emits('onStop')
    player.onEnd = () => emits('onEnd')

    if (props.autoplay) {
      player.start()
    }
  }
  catch (error) {
    console.error('SVGA player initialization failed:', error)
  }
}

watch(() => props.url, async (newUrl, oldUrl) => {
  if (newUrl && newUrl !== oldUrl) {
    await nextTick()
    initPlayer()
  }
}, {
  immediate: true,
})
</script>

<template>
  <canvas ref="playerRef" />
</template>

<style lang='scss' scoped>

</style>
