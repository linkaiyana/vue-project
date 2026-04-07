<!--
 * @Author: linkaiyan
 * @Date: 2025-10-24 10:00:07
 * @LastEditTime: 2026-04-07 14:08:13
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
import { exchange, listExchange } from '../api'
import useUserStore from '../store/userStore'
import { selfClick } from '../utils'

const userStore = useUserStore()

// const countdownVal = ref(2000000)

// 装饰
const ornamentSessionList = ref<ExchangeGift[]>([])
// 道具
const propSessionList = ref<ExchangeGift[]>([])
// 精选
const choiceSessionList = ref<ExchangeGift[]>([])

const popup = reactive({
  confirm: false,
  record: false,
  rule: false,
})

const exchangeGift = ref<ExchangeGift | null>(null)

// 兑换
function toExchange(gift: ExchangeGift) {
  return selfClick(() => {
    exchangeGift.value = gift
    popup.confirm = true
  })
}

async function confirmExchange(amount: number) {
  if (!exchangeGift.value) return
  const params = {
    id: exchangeGift.value.id,
    amount,
  }
  const res = await exchange(params)
  if (res) {
    showToast('兌換成功')
    userStore.getUserInfo()
  }
}

// 获取兑换列表
async function getExchangeList() {
  const res = await listExchange()
  ornamentSessionList.value = res?.ornamentSessionList || []
  propSessionList.value = res?.propSessionList || []
  choiceSessionList.value = res?.choiceSessionList || []
}

function getIsShowLimit(gift: ExchangeGift) {
  if ([1, 2].includes(gift.limitType)) {
    return true
  }
  return false
}

onActivated(() => {
  getExchangeList()
})
</script>

<template>
  <Teleport to="body">
    <PopupConfirm v-model:show="popup.confirm" :gift="exchangeGift" @confirm="confirmExchange" />
    <PopupExchangeRecord v-model:show="popup.record" />
    <PopupExchangeRule v-model:show="popup.rule" />
  </Teleport>
  <ContentBox class="page2" title="大客戶商城" size="large">
    <CommonBtn class="page2-btn page2-rule" @click="popup.rule = true">
      兌換規則
    </CommonBtn>
    <CommonBtn class="page2-btn page2-record" @click="popup.record = true">
      兌換記錄
    </CommonBtn>
    <div class="page2-ctn">
      <!-- 倒计时 -->
      <!-- <div class="page2-countdown">
        <VanCountDown
          ref="countDown"
          class="time"
          :time="countdownVal"
          @finish="updateMsg"
        >
          <template #default="timeData">
            <div class="block">
              <template v-if="timeData.days < 10">0</template>{{ timeData.hours }}
            </div>
            天
            <div class="block">
              <template v-if="timeData.hours < 10">0</template>{{ timeData.hours }}
            </div>
            時
            <div class="block">
              <template v-if="timeData.minutes < 10">0</template>{{ timeData.minutes }}
            </div>
            分後刷新商品
          </template>
        </VanCountDown>
      </div> -->

      <template v-if="ornamentSessionList.length">
        <div class="page2-title">
          裝飾專場
        </div>
        <div class="page2-list">
          <div v-for="(item, index) in ornamentSessionList" :key="index" class="page2-list-item">
            <Gift
              :data="item"
              :show-unit="item.type !== 4"
              :show-limit="getIsShowLimit(item)"
              gift-type-key="type"
              gift-num-key="rewardNum"
            />
            <CommonBtn v-if="item.isLimitExchange" class="btn disabled">
              <LinearText text="已售罄" type="gray" />
            </CommonBtn>
            <CommonBtn v-else class="btn" @click="toExchange(item)">
              <div class="icon" /><LinearText :text="`*${item.amount}`" type="brown" />
            </CommonBtn>
          </div>
        </div>
      </template>

      <template v-if="propSessionList.length">
        <div class="page2-title">
          道具專場
        </div>
        <div class="page2-list">
          <div v-for="(item, index) in propSessionList" :key="index" class="page2-list-item">
            <Gift
              :data="item"
              :show-unit="item.type !== 4"
              :show-limit="getIsShowLimit(item)"
              gift-type-key="type"
              gift-num-key="rewardNum"
            />
            <CommonBtn v-if="item.isLimitExchange" class="btn disabled">
              <LinearText text="已售罄" type="gray" />
            </CommonBtn>
            <CommonBtn v-else class="btn" @click="toExchange(item)">
              <div class="icon" /><LinearText :text="`*${item.amount}`" type="brown" />
            </CommonBtn>
          </div>
        </div>
      </template>

      <template v-if="choiceSessionList.length">
        <div class="page2-title">
          精選專場
        </div>
        <div class="page2-list">
          <div v-for="(item, index) in choiceSessionList" :key="index" class="page2-list-item">
            <Gift
              :data="item"
              :show-unit="item.type !== 4"
              :show-limit="getIsShowLimit(item)"
              gift-type-key="type"
              gift-num-key="rewardNum"
            />
            <CommonBtn v-if="item.isLimitExchange" class="btn disabled">
              <LinearText text="已售罄" type="gray" />
            </CommonBtn>
            <CommonBtn v-else class="btn" @click="toExchange(item)">
              <div class="icon" /><LinearText :text="`*${item.amount}`" type="brown" />
            </CommonBtn>
          </div>
        </div>
      </template>
    </div>
  </ContentBox>
</template>

<style lang='scss' scoped>
.page2 {
  &-btn {
    position: absolute;
    width: 122px;
    height: 44px;
    font-size: 22px;
    color: #f5dfc9;
  }

  &-rule {
    left: 0;
    top: 12px;
    padding-right: 14px;
    padding-left: 0;
    background:
      url('../assets/bg/bg-border2.png') no-repeat center / 100% 100%,
      url('../assets/btn/btn-rule.png') no-repeat center / 100% 100%;
  }
  &-record {
    right: 0;
    top: 12px;
    padding-left: 14px;
    padding-right: 0;
    background:
      url('../assets/bg/bg-border.png') no-repeat center / 100% 100%,
      url('../assets/btn/btn-record.png') no-repeat center / 100% 100%;
  }

  &-ctn {
    padding-top: 20px;
  }

  &-countdown {
    margin: 0 0 34px;
    .time {
      position: relative;
      display: flex;
      align-items: center;
      width: fit-content;
      font-size: 27px;
      color: #4a78b9;
      font-family: Roboto;
      margin: auto;

      .block {
        width: 42px;
        height: 42px;
        border-radius: 10px;
        margin: 0 10px;
        text-align: center;
        line-height: 38px;
        color: #f5dfc9;
        background-color: #262e99;
        border: 1px solid #d1ab7d;
      }

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 73px;
        height: 2px;
        opacity: 0.5;
        border-radius: 1px;
      }

      &::before {
        left: -83px;
        background: linear-gradient(-90deg, #4a78b9 -0.5%, rgba(74, 120, 185, 0) 100%);
      }

      &::after {
        right: -83px;
        background: linear-gradient(90deg, #4a78b9 -0.5%, rgba(74, 120, 185, 0) 100%);
      }
    }
  }

  &-title {
    position: relative;
    width: fit-content;
    margin: 8px auto 10px;
    font-size: 30px;
    font-weight: bold;
    background-image: linear-gradient(180deg, #113278 0%, #4c7aba 100%);
    background-clip: text;
    text-align: center;
    color: transparent;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: -10px;
      width: 36px;
      height: 40px;
      background: url('../assets/icon/icon-flower.png') no-repeat center / 100%;
    }

    &::before {
      left: -46px;
    }

    &::after {
      right: -46px;
      transform: rotateY(180deg);
    }
  }

  &-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;

    &-item {
      margin: 0 18px 24px;

      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 166px;
        height: 52px;
        margin: 6px auto 10px;
        font-size: 24px;
        font-weight: bold;
        font-family: Microsoft YaHei UI;
        background: url('../assets/btn/btn-enable-small.png') no-repeat center / 100%;

        &.disabled {
          background: url('../assets/btn/btn-disabled-small.png') no-repeat center / 100%;
        }

        .icon {
          width: 24px;
          height: 24px;
          margin-right: 5px;
          background: url('../assets/icon/icon-integral2.png') no-repeat center / 100%;
        }
      }

      .text {
        font-size: 20px;
        color: #4a78b9;
        font-family: Roboto;
        text-align: center;
      }
    }
  }

  &-empty {
    height: 200px;
  }
}
</style>
