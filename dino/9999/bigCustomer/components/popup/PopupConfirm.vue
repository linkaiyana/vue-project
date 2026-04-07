<!--
 * @Author: linkaiyan
 * @Date: 2025-10-29 10:20:09
 * @LastEditTime: 2026-04-07 14:16:38
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
import Gift from '../Gift.vue'
import InputNumber from '../InputNumber.vue'
import LinearText from '../LinearText.vue'
import PopupCommon from './PopupCommon.vue'

interface Props {
  show?: boolean
  gift?: ExchangeGift | null
}

withDefaults(defineProps<Props>(), {
  show: false,
  gift: null,
})

const emits = defineEmits(['update:show', 'confirm'])

const giftNum = ref(1)

const show = defineModel('show', {
  type: Boolean,
  default: false,
})

function confirmExchange() {
  emits('confirm', giftNum.value)
  close()
}

function close() {
  show.value = false
}

watch(show, () => {
  giftNum.value = 1
})
</script>

<template>
  <PopupCommon class="popupConfirm" :show="show" @close="close">
    <div class="cost">
      消耗<div class="icon" /><span>{{ (gift?.amount || 0) * giftNum }}</span>兑换
    </div>
    <Gift class="gift" size="large" :data="gift" />

    <InputNumber v-model="giftNum" class="input" />

    <div class="btns">
      <CommonBtn class="btn" @click="close">
        <LinearText text="取消" type="brown" />
      </CommonBtn>
      <CommonBtn class="btn" @click="confirmExchange">
        <LinearText text="確認兌換" type="brown" />
      </CommonBtn>
    </div>
  </PopupCommon>
</template>

<style lang='scss' scoped>
.popupConfirm {
  font-family: Microsoft YaHei;
  .cost {
    margin: 42px 0 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: #113278;

    .icon {
      width: 32px;
      height: 32px;
      margin: 0 8px;
      background: url('../../assets/icon/icon-integral2.png') no-repeat center / 100% 100%;
    }

    span {
      font-weight: bold;
      color: #ae6e42;
      margin-right: 8px;
    }
  }

  .gift {
    margin: auto;
  }

  .input {
    margin: 24px auto 40px;
  }

  .btns {
    display: flex;
    justify-content: space-between;
    font-family: Microsoft YaHei UI;
    padding: 0 22px 32px;

    .btn {
      width: 264px;
      height: 74px;
      background: url('../../assets/btn/btn-large.png') no-repeat center / contain;
      font-size: 30px;
      font-weight: bold;
    }
  }
}
</style>
