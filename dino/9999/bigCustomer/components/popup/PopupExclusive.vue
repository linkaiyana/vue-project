<!--
 * @Author: linkaiyan
 * @Date: 2025-10-29 16:32:54
 * @LastEditTime: 2026-04-07 14:18:45
 * @LastEditors: linkaiyan
 * @Description: 专属礼包
-->
<script setup lang='ts'>
import type { CountDownInstance } from 'vant'

interface Props {
  list?: GiveEntity[]
  state: State
  countDown?: number
}

const props = withDefaults(defineProps<Props>(), {
  list: () => [],
  countDown: 0,
})

const emits = defineEmits(['receive', 'updateInfo'])

const show = defineModel('show', {
  type: Boolean,
  default: true,
})

const countDownRef = useTemplateRef<CountDownInstance>('countDown')

const countDownVal = computed(() => props.countDown * 1000)

async function receiveGift() {
  emits('receive')
  close()
}

async function updateInfo() {
  emits('updateInfo')
  close()
}

function close() {
  show.value = false
}

watch(show, (val) => {
  if (val) {
    countDownRef.value?.reset()
  }
})
</script>

<template>
  <PopupCommon class="popupVote" :show="show" :closeable="false" title="專屬禮包" @close="close">
    <div class="popupVote">
      <div class="tips">
        首次成為大客戶，可領取以下獎勵
      </div>

      <div class="list">
        <Gift v-for="(item, index) in list" :key="index" class="list_item" :data="item" />
      </div>

      <CommonBtn v-if="state === 1" class="btn" @click="close">
        <LinearText text="我知道了" type="brown" />
      </CommonBtn>
      <CommonBtn v-else-if="state === 2" class="btn" @click="receiveGift">
        <LinearText text="領取獎勵" type="brown" />
      </CommonBtn>
      <CommonBtn v-else-if="state === 3" class="btn disabled" @click="close">
        <LinearText text="已領取" type="gray" />
      </CommonBtn>

      <div v-if="state === 2" class="tips2">
        <VanCountDown ref="countDownRef" class="countDown" :time="countDownVal" format="HH : mm : ss" @finish="updateInfo" />后未領取失效
      </div>
    </div>
  </PopupCommon>
</template>

<style lang='scss' scoped>
.popupVote {
  font-family: Microsoft YaHei;
  padding-bottom: 26px;

  .tips {
    font-size: 30px;
    color: #113278;
    text-align: center;
    margin: 34px 0;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    width: 574px;
    margin: auto;

    &_item {
      &:not(:nth-child(3n)) {
        margin-right: 22px;
      }
    }
  }

  .btn {
    display: block;
    width: 362px;
    height: 74px;
    background: url('../../assets/btn/btn-enable-large.png') no-repeat center / contain;
    font-size: 30px;
    font-weight: bold;
    margin: 40px auto 0;

    &.disabled {
      background: url('../../assets/btn/btn-disabled-large.png') no-repeat center / contain;
    }
  }

  .tips2 {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(17, 50, 120, 0.6);
    font-size: 24px;
    margin-top: 10px;

    .countDown {
      color: rgba(17, 50, 120, 0.6);
      font-size: 24px;
    }
  }
}
</style>
