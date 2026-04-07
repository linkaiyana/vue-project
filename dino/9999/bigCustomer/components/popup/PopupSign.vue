<!--
 * @Author: linkaiyan
 * @Date: 2025-10-29 15:29:07
 * @LastEditTime: 2026-04-07 14:19:32
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
import Gift from '../Gift.vue'
import LinearText from '../LinearText.vue'
import PopupCommon from './PopupCommon.vue'

interface Props {
  punchRes?: PunchRes | null
}

withDefaults(defineProps<Props>(), {
  punchRes: null,
})

const emits = defineEmits(['use'])

const show = defineModel('show', { default: false })

function toUse() {
  emits('use')
  close()
}

function close() {
  show.value = false
}
</script>

<template>
  <PopupCommon class="popupSign" :show="show" :closeable="false" @close="close">
    <div v-if="punchRes">
      <!-- 有奖励 -->
      <template v-if="punchRes?.giveEntities?.length">
        <div class="tips2">
          你本月已累計打卡<span>{{ punchRes?.punchNum }}</span>天，獲得
        </div>

        <Gift
          v-for="item in punchRes.giveEntities"
          :key="item.rewardId"
          size="large"
          class="gift"
          :data="item"
          show-unit
          gift-num-key="count"
          gift-type-key="giveType"
        />

        <div class="btns">
          <CommonBtn class="btn large" @click="close">
            <LinearText text="好的" type="brown" />
          </CommonBtn>
        </div>
      </template>

      <!-- 日常签到 -->
      <template v-else>
        <div class="tips">
          打卡成功，積分<div class="icon" /><span>+{{ punchRes?.punchIntegral }}</span>
        </div>
        <div class="btns">
          <CommonBtn class="btn" @click="close">
            <LinearText text="好的" type="brown" />
          </CommonBtn>
          <CommonBtn class="btn" @click="toUse">
            <LinearText text="去使用" type="brown" />
          </CommonBtn>
        </div>
      </template>
    </div>
  </PopupCommon>
</template>

<style lang='scss' scoped>
.popupSign {
  font-size: 30px;
  color: #113278;
  font-family: Microsoft YaHei;

  .tips {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 80px 0 60px;
    .icon {
      width: 30px;
      height: 30px;
      margin: 0 4px 0 8px;
      background: url('../../assets/icon/icon-integral2.png') no-repeat center/ 100% 100%;
    }
    span {
      font-weight: bold;
      color: #ae6e42;
    }
  }

  .tips2 {
    margin: 42px 0 34px;
    text-align: center;

    span {
      font-weight: bold;
      color: #ae6e42;
    }
  }

  .gift {
    margin: 0 auto 40px;
  }

  .btns {
    display: flex;
    justify-content: center;
    font-family: Microsoft YaHei UI;
    padding: 0 0 32px;

    .btn {
      width: 264px;
      height: 74px;
      margin: 0 17px;
      background: url('../../assets/btn/btn-large.png') no-repeat center / contain;
      font-size: 30px;
      font-weight: bold;

      &.large {
        width: 362px;
        background: url('../../assets/btn/btn-enable-large.png') no-repeat center / contain;
      }
    }
  }
}
</style>
