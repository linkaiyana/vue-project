<script setup lang='ts' generic="T extends Record<string, any>">
const props = withDefaults(defineProps<ProgressData<T>>(), {
  // list: () => [],
  // cur: 0,
  showLast: false,
  vertical: false,
})

const emits = defineEmits(['handlePoint', 'progressDone'])

type AllowedPointFields<T> = keyof T | 'point'

interface ProgressData<T> {
  list: T[]
  cur: number
  showLast?: boolean
  vertical?: boolean
  pointField: AllowedPointFields<T>
}

const progressList = computed(() => props.list || [])

const progressItem = useTemplateRef<HTMLDivElement[]>('progressItem')

const lastItem = useTemplateRef<HTMLDivElement>('lastItem')

function handleTransitionEnd() {
  emits('progressDone')
}

// 获取指定字段的值作为 point
function getPointValue(item: T): number {
  if (!item) return 0
  // 使用类型断言确保类型安全
  const field = props.pointField as keyof T
  const value = item[field]
  return (typeof value === 'number' ? value : 0) as number
}

// 计算进度条样式
function calculateProgressStyle() {
  // 如果当前值超过最大值点，直接返回100%
  if (props.cur > getPointValue(props.list[props.list.length - 1])) {
    return props.vertical ? { height: '100%' } : { width: '100%' }
  }

  // 确定使用哪个尺寸属性
  const sizeProperty = props.vertical ? 'clientHeight' : 'clientWidth'

  // 计算总进度尺寸
  let totalSize = 0

  props.list.forEach((item, index) => {
    const currentPoint = getPointValue(item)
    const prevPoint = getPointValue(props.list[index - 1]) || 0
    const segmentSize = progressItem.value?.[index]?.[sizeProperty] || 0

    if (props.cur >= currentPoint) {
      // 当前值已经超过这个节点，整个段都完成
      totalSize += segmentSize

      // 最后一段,需要判断是否显示空值段
      if (index === props.list.length - 1 && props.showLast) {
        const lastSize = lastItem.value?.[sizeProperty] || 0
        totalSize += lastSize
      }
    }
    else if (props.cur > prevPoint) {
      // 当前值在两个节点之间，计算部分进度
      const segmentRange = currentPoint - prevPoint
      const progressInSegment = props.cur - prevPoint
      totalSize += (progressInSegment / segmentRange) * segmentSize
    }
    // 其他情况（当前值还没到这个段）无需增加
  })

  // 返回对应方向的尺寸对象
  return props.vertical ? { height: `${totalSize}px` } : { width: `${totalSize}px` }
}

const progressStyle = ref<Record<string, any>>({})

watch([() => props.cur, () => props.list], async ([point, list]) => {
  await nextTick()

  if (point >= 0 && list.length) {
    progressStyle.value = calculateProgressStyle()
  }
  else {
    handleTransitionEnd()
  }
}, { immediate: true })
</script>

<template>
  <div :class="`progress ${vertical ? 'progress-vertical' : 'progress-row'}`">
    <div class="progressCtn">
      <div class="progressCur" :style="progressStyle" @transitionend="handleTransitionEnd">
        <!-- 当前进度位置插槽 -->
        <div class="progressCurAfter">
          <slot name="cur" />
        </div>
      </div>
      <div class="progressList">
        <div
          v-for="(item, index) in progressList" :key="index"
          ref="progressItem"
          class="progressItem"
        >
          <!-- 进度点 -->
          <div class="progressStar" :class="{ highlight: cur >= getPointValue(item) }" @click="emits('handlePoint', index)">
            <!-- 星星 -->
            <div class="star">
              <slot name="star" :active="cur >= getPointValue(item)" :data="item" />
            </div>

            <!-- 进度点上方插槽 -->
            <div class="progressSlot1">
              <slot name="ctn1" :data="item" :active="cur >= getPointValue(item)" />
            </div>

            <!-- 进度点下方插槽 -->
            <div class="progressSlot2">
              <slot name="ctn2" :data="item" :active="cur >= getPointValue(item)" />
            </div>
          </div>
        </div>
        <div v-if="showLast" ref="lastItem" class="progressItem lastItem" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress {
  text-align: center;
  white-space: nowrap;

  .progressCtn {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .progressCur {
    position: absolute;
    left: 0;
    top: 0;
    background-color: yellow;
    transition: all 0.5s ease-in-out;
  }

  .progressList {
    width: 100%;
    height: 100%;
  }

  .progressStar {
    position: absolute;

    .star {
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(-50%, -50%);
    }
  }

  .progressSlot1,
  .progressSlot2,
  .progressCurAfter {
    position: absolute;
  }

  &-row {
    width: fit-content;
    height: 18px;
    background: #baf6ff;

    .progressCur {
      width: 0;
      height: 100%;
    }

    .progressCurAfter {
      bottom: 46px;
      right: 0;
      transform: translate(50%, 0);
    }

    .progressList {
      width: 100%;
      display: flex;
      align-items: center;
    }

    .progressItem {
      position: relative;
      width: 188px;
      height: 100%;

      &:first-child,
      &.lastItem {
        width: 28px;
      }
    }

    .progressStar {
      right: 0;
      top: 50%;
      transform: translate(50%, -50%);
    }

    .progressSlot1 {
      bottom: 46px;
      left: 50%;
      transform: translate(-50%, 0);
    }

    .progressSlot2 {
      top: 46px;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }

  &-vertical {
    position: relative;
    width: 18px;
    height: fit-content;
    background: #baf6ff;

    .progressCur {
      width: 100%;
      height: 0;
    }

    .progressList {
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .progressItem {
      position: relative;
      width: 100%;
      height: 188px;

      &:first-child,
      &:last-child {
        height: 28px;
      }
    }

    .progressStar {
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 50%);
    }

    .progressSlot1 {
      right: 46px;
      top: 50%;
      transform: translate(0, -50%);
    }

    .progressSlot2 {
      left: 46px;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
}
</style>
