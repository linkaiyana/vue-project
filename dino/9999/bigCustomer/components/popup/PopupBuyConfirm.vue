<!--
 * @Author: linkaiyan
 * @Date: 2025-10-29 10:20:09
 * @LastEditTime: 2025-10-29 11:53:39
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
import Gift from '../Gift.vue'
import LinearText from '../LinearText.vue'
import PopupCommon from './PopupCommon.vue'

interface Props {
  gift?: ExpGift | null
}

withDefaults(defineProps<Props>(), {
  gift: null,
})

const emits = defineEmits(['update:show', 'confirm'])

const show = defineModel('show', {
  type: Boolean,
  default: false,
})

function close() {
  show.value = false
}

function confirmBuy() {
  emits('confirm')
  close()
}
</script>

<template>
  <PopupCommon class="popupBuyConfirm" :show="show" @close="close">
    <template v-if="gift">
      <div class="cost">
        消耗鑽石<div class="icon" /><span>{{ gift.worth }}</span>兑换
      </div>
      <Gift class="gift" size="large" :data="gift" />

      <div class="btns">
        <CommonBtn class="btn" @click="close">
          <LinearText text="取消" type="brown" />
        </CommonBtn>
        <CommonBtn class="btn" @click="confirmBuy">
          <LinearText text="確認購買" type="brown" />
        </CommonBtn>
      </div>
    </template>
  </PopupCommon>
</template>

<style lang='scss' scoped>
.popupBuyConfirm {
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
      background: url('../../assets/icon/icon-diamond.png') no-repeat center / 100% 100%;
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
    padding: 40px 22px 32px;

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
