<!--
 * @Author: linkaiyan
 * @Date: 2025-10-24 09:59:55
 * @LastEditTime: 2026-04-07 18:12:56
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { buyGift, getVoteNum, listExpGift, listPunchAward, listPunchRecord, listVoteInfo, punch, vote } from '../api'
import { selfClick } from '../utils'

// 扩展 dayjs 插件
dayjs.extend(utc)

const popup = reactive({
  sign: false,
  vote: false,
  voteQues: false,
  buyRecord: false,
  confirm: false,
})

const changeTab = inject<(tabIndex: number) => void>('changeTab')

// ================ 打卡相关 ================
function useSignHooks() {
  // 签到积分
  const signScore = ref(10)
  // 签到日期列表
  const signedDates = ref<string[]>([])
  // 当前时间（东八区）
  const currentDate = ref(dayjs().utcOffset(8))

  // 已签到天数
  const curSignDay = ref(0)
  // 签到奖励列表
  const list = ref<PunchReward[]>([])

  // 打卡结果
  const punchRes = ref<PunchRes | null>(null)

  // 获取打卡记录
  async function getSignRecord() {
    const res = await listPunchRecord()
    if (res.data) {
      signScore.value = res.data.punchIntegral || 0
      signedDates.value = res.data?.punchRecord.map(item => item.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'))
    }
    currentDate.value = dayjs(res.time).utcOffset(8)
  }

  // 获取打卡指定天数奖励列表
  async function getSignAward() {
    const res = await listPunchAward()
    if (res) {
      curSignDay.value = res.punchCount || 0
      list.value = res.punchRewardList
    }
  }

  const initSign = () => {
    getSignRecord()
    getSignAward()
  }

  // 打卡
  const signIn = () => selfClick(async () => {
    const res = await punch()
    if (res) {
      punchRes.value = res
      popup.sign = true

      curSignDay.value = res.punchNum
      getSignRecord()
    }
  })

  // 使用积分
  function useScore() {
    changeTab && changeTab(1)
  }

  return {
    signScore,
    signedDates,
    currentDate,
    curSignDay,
    list,
    punchRes,
    initSign,
    signIn,
    useScore,
  }
}

const {
  signScore,
  signedDates,
  currentDate,
  curSignDay,
  list,
  punchRes,
  initSign,
  signIn,
  useScore,
} = useSignHooks()
// ================ 打卡相关 ================

// ================ 礼物体验相关 ================
function useExpGiftHooks() {
  // 抢先体验礼物
  const expGiftList = ref<ExpGift[]>([])
  // 当前点击的礼物
  const currentGift = ref<ExpGift | null>(null)

  // 获取抢先体验礼物列表
  async function getExpGift() {
    const res = await listExpGift()
    if (res) {
      expGiftList.value = res
    }
  }

  // 购买
  function handleBuy(gift: ExpGift) {
    return selfClick(() => {
      if (gift.buyCount <= 0) {
        return showToast('購買次數不足')
      }
      currentGift.value = gift
      popup.confirm = true
    })
  }

  // 购买体验礼物
  async function confirmBuy() {
    if (!currentGift.value) return
    const params = {
      giftId: currentGift.value?.giftId,
      giftType: currentGift.value?.giftType,
    }
    const res = await buyGift(params)
    if (res) {
      showToast('購買成功，禮物已放至你的包裹')
      getExpGift()
    }
  }
  return {
    expGiftList,
    currentGift,
    getExpGift,
    handleBuy,
    confirmBuy,
  }
}

const {
  expGiftList,
  currentGift,
  getExpGift,
  handleBuy,
  confirmBuy,
} = useExpGiftHooks()

// ================ 礼物体验相关 ================

// ================ 投票相关 ================
function useVoteHooks() {
  const curTab = ref(0)
  const loading = ref(false)

  // 投票礼物列表
  const giftInfoList = ref<GiftInfoList[]>([])
  // 剩余票数
  const restTicketNum = ref(0)

  // 获取礼物投票信息
  async function getVoteInfo() {
    const periodType = curTab.value === 0 ? 1 : 2
    const res = await listVoteInfo({
      periodType,
    })
    if (res) {
      res.giftInfoList?.forEach((item) => {
        item.selected = false
        item.selectNum = 0
      })
      giftInfoList.value = res.giftInfoList || []
    }
    else {
      giftInfoList.value = []
    }
  }

  // 去投票
  function toVote() {
    if (loading.value) return
    if (restTicketNum.value <= 0) return showToast('票數不足')
    popup.vote = true
  }

  // 投票
  async function confirmVote() {
    if (loading.value) return
    loading.value = true
    if (restTicketNum.value <= 0) return showToast('票數不足')

    const paramIdDtoList = giftInfoList.value.filter(item => item.selected && item.selectNum).map(item => ({
      id: item.configId,
      amount: item.selectNum || 0,
    }))

    if (!paramIdDtoList.length) return showToast('請選擇')

    try {
      const res = await vote({
        paramIdDtoList,
      })
      if (res) {
        showToast('投票成功~')
        await initVote()
      }
    }
    finally {
      loading.value = false
    }
  }

  // 获取剩余票数
  async function getRestNum() {
    const res = await getVoteNum()
    restTicketNum.value = res || 0
  }

  async function initVote() {
    await Promise.all([getVoteInfo(), getRestNum()])
  }

  return {
    curTab,
    loading,
    giftInfoList,
    restTicketNum,
    getVoteInfo,
    toVote,
    confirmVote,
    initVote,
  }
}

const {
  curTab,
  loading,
  giftInfoList,
  restTicketNum,
  getVoteInfo,
  toVote,
  confirmVote,
  initVote,
} = useVoteHooks()
// ================ 投票相关 ================

onActivated(() => {
  initSign()
  initVote()
  getExpGift()
})
</script>

<template>
  <Teleport to="body">
    <PopupVote
      v-model:show="popup.vote"
      :ticket="restTicketNum"
      :list="giftInfoList"
      @confirm="confirmVote"
    />
    <PopupBuyRecord
      v-model:show="popup.buyRecord"
    />
    <PopupBuyConfirm
      v-model:show="popup.confirm"
      :gift="currentGift"
      @confirm="confirmBuy"
    />
    <PopupSign
      v-model:show="popup.sign"
      :punch-res="punchRes"
      @use="useScore"
    />
    <PopupVoteQues
      v-model:show="popup.voteQues"
    />
  </Teleport>
  <div class="page1">
    <ContentBox size="large" title="1.每日打卡領積分">
      <Calendar
        class="page1-calendar"
        :signed-dates="signedDates"
        :now="currentDate"
        :sign-score="signScore"
        @sign="signIn"
      />
    </ContentBox>

    <ContentBox class="page1-progress" size="large" :with-header="false">
      <div class="title">
        當月累計打卡指定天數領獎勵
      </div>

      <div class="subTitle">
        每月底24點重置進度
      </div>

      <div class="wrapper">
        <MProgress
          class="progress"
          :list="list"
          :cur="curSignDay"
          point-field="requestDays"
          show-last
        >
          <template #star="{ active }">
            <div class="star" :class="{ active }" />
          </template>

          <template #ctn1="{ data, active }">
            <div class="ctn1" :class="{ active }">
              {{ data.requestDays }}天
            </div>
          </template>

          <template #ctn2="{ data }">
            <div class="ctn2">
              <Gift :data="data" size="small" show-unit :show-status="data.receiveState === 3" gift-type-key="rewardType" />
            </div>
          </template>
        </MProgress>
      </div>
    </ContentBox>

    <ContentBox class="page1-gift" size="large" title="2.全新圖標搶先體驗">
      <CommonBtn class="record" @click="popup.buyRecord = true">
        購買記錄
      </CommonBtn>

      <div class="tips">
        每週一上午10:00更新
      </div>

      <div class="tips2">
        包含未來要上線的直送、扭蛋、禮盒、合成、活動、奪寶中的部分禮物圖標，大客戶可提前使用鑽石購買至背包中，有效期30天，大客戶等級越高可購買次數越多。
      </div>

      <div class="list">
        <div v-for="(item, index) in expGiftList" :key="index" class="list_item">
          <Gift :data="item" with-icon gift-type-key="giftType" />

          <CommonBtn class="btn" @click="handleBuy(item)">
            <div class="icon" /><LinearText :text="item.worth" type="brown" />
          </CommonBtn>

          <div class="text">
            可購買次數：{{ item.buyCount }}
          </div>
        </div>
      </div>
    </ContentBox>

    <!-- 投票榜单 -->
    <ContentBox class="page1-rank" title="3.每月返場禮物由你決定" size="large">
      <div class="ctn">
        <div class="tips">
          每月1日自動發放返場票，有效期30天
        </div>

        <div class="container">
          <ScrollTab v-model:tab-index="curTab" class="tab" :loading="loading" @change="getVoteInfo" />
          <div class="icon" @click="popup.voteQues = true" />
        </div>
        <div v-if="giftInfoList.length" class="list">
          <VoteItem
            v-for="(item, index) in giftInfoList"
            :key="index"
            class="list_item"
            :data="item"
            :sort="index + 1"
            :last="curTab === 1"
            :success="curTab === 1 && item.isReturn"
          />
        </div>
        <Empty v-else class="empty" />

        <template v-if="curTab === 0">
          <CommonBtn class="btn vote" @click="toVote">
            <LinearText text="我要投票" type="brown" />
          </CommonBtn>
          <div class="nums">
            可用票數：{{ restTicketNum }}
          </div>
        </template>

        <CommonBtn v-else class="btn disabled">
          <LinearText text="投票已结束" type="gray" />
        </CommonBtn>
      </div>
    </ContentBox>
  </div>
</template>

<style lang='scss' scoped>
.page1 {
  &-calendar {
    margin: 20px auto 32px;
  }

  &-progress {
    margin: 24px auto 68px;
    .title {
      position: relative;
      width: fit-content;
      margin: 32px auto 10px;
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
        background: url('@PF/assets/icon/icon-flower.png') no-repeat center / 100%;
      }

      &::before {
        left: -46px;
      }

      &::after {
        right: -46px;
        transform: rotateY(180deg);
      }
    }

    .subTitle {
      text-align: center;
      color: #4a78b9;
      font-size: 24px;
      margin-top: 10px;
    }

    .wrapper {
      width: 620px;
      overflow-x: auto;
      margin: auto;
      padding: 0 10px;
    }

    .progress {
      margin: 72px auto 236px;
      height: 16px;
      border-radius: 8px;
      background-color: #8cbde2;

      .cur {
        position: relative;
        width: fit-content;
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        font-size: 20px;
        color: #53b5cc;
        font-family: microsoft yahei;
        background-color: #bdf2ff;
        border-radius: 10px;
        margin: 16px auto 0;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          width: 10px;
          height: 10px;
          background-color: #bdf2ff;
          transform: rotate(45deg) translateY(50%);
        }
      }

      ::v-deep(.progressCur) {
        border-radius: 8px;
        background-color: #e3993f;
      }

      ::v-deep(.progressItem) {
        width: 158px;
        &:first-child,
        &:last-child {
          width: 60px;
        }

        .progressSlot1 {
          bottom: 26px;
        }

        .progressSlot2 {
          top: 24px;
        }
      }

      .star {
        width: 28px;
        height: 28px;
        background-color: #8cbde2;
        border: 5px solid #8cbde2;
        border-radius: 14px;

        &.active {
          border-color: #e3993f;
          background-color: #ffe7bb;
        }
      }

      .ctn1 {
        position: relative;
        height: 32px;
        padding: 0 20px;
        border-radius: 4px;
        background-color: #8cbde2;
        font-size: 20px;
        color: #ffffff;
        line-height: 32px;

        &.active {
          background-color: #e3993f;

          &::after {
            background-color: #e3993f;
          }
        }

        &::after {
          position: absolute;
          bottom: -6px;
          left: 0;
          right: 0;
          margin: auto;
          content: '';
          width: 14px;
          height: 14px;
          border-radius: 2px;
          background-color: #8cbde2;
          transform: rotate(45deg);
        }
      }

      .ctn2 {
        &.active {
          background-color: #20a5f2;
        }
      }
    }
  }

  &-gift {
    margin-bottom: 68px;
    .record {
      position: absolute;
      right: 0;
      top: 12px;
      width: 122px;
      height: 44px;
      font-size: 22px;
      color: #f5dfc9;
      padding-left: 14px;
      padding-right: 0;
      background:
        url('../assets/bg/bg-border.png') no-repeat center / 100% 100%,
        url('../assets/btn/btn-record.png') no-repeat center / 100% 100%;
    }

    .tips {
      font-size: 24px;
      color: #4a78b9;
      line-height: 44px;
      margin-bottom: 14px;
      text-align: center;
    }

    .tips2 {
      font-size: 24px;
      color: #113278;
      line-height: 2;
      padding: 0 22px;
      margin-bottom: 24px;
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      width: 600px;
      margin: auto;

      &_item {
        margin-bottom: 24px;
        &:not(:nth-child(3n)) {
          margin-right: 36px;
        }

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
          background: url('../assets/bg/bg-btn.png') no-repeat center / 100%;

          .icon {
            width: 24px;
            height: 24px;
            margin-right: 5px;
            background: url('../assets/icon/icon-diamond.png') no-repeat center / 100%;
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
  }

  &-rank {
    .ctn {
      padding-bottom: 32px;
    }
    .tips {
      font-size: 24px;
      color: #4a78b9;
      line-height: 44px;
      margin-bottom: 24px;
      text-align: center;
    }

    .tab {
      margin: auto;
    }

    .container {
      position: relative;
      margin-bottom: 24px;
      .tab {
        margin: auto;
      }

      .icon {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 27px;
        margin: auto;
        width: 42px;
        height: 42px;
        background: url('../assets/icon/icon-ques.png') no-repeat center / 100%;
      }
    }

    .list {
      &_item {
        margin: 0 auto 14px;
      }
    }

    .empty {
      height: 200px;
      color: #4a78b9;
    }

    .btn {
      width: 426px;
      height: 74px;
      display: block;
      margin: 40px auto 0;

      span {
        font-size: 30px;
        font-weight: bold;
        color: transparent;
        background-clip: text;
      }
      &.vote {
        background: url('../assets/btn/btn-enable.png') no-repeat center / 100% 100%;

        span {
          background-image: linear-gradient(180deg, #9f6237 0%, #d08659 100%);
        }
      }

      &.disabled {
        background: url('../assets/btn/btn-disabled.png') no-repeat center / 100% 100%;

        span {
          background-image: linear-gradient(180deg, #636363 0%, #979797 100%);
        }
      }
    }

    .nums {
      font-size: 24px;
      text-align: center;
      color: #4a78b9;
      margin-top: 12px;
    }
  }
}
</style>
