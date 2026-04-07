<!--
 * @Author: linkaiyan
 * @Date: 2025-10-28 14:23:47
 * @LastEditTime: 2026-04-07 15:37:36
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
import { receoveCustomerAward } from '../api'
import { REWARD_STATE, USER_TYPE } from '../api/constants'
import useUserStore from '../store/userStore'
import AvatarIcon from './AvatarIcon.vue'
import ContentBox from './ContentBox.vue'
import PopupExclusive from './popup/PopupExclusive.vue'
import PopupScoreQues from './popup/PopupScoreQues.vue'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const idenMap: Record<UserType, string> = {
  [USER_TYPE.BIGCUSTOMER]: '大客户',
  [USER_TYPE.PASTBIGCUSTOMER]: '普通用户',
  [USER_TYPE.NORMAL]: '普通用户',
}

const isNormalCustomer = computed(() => userInfo.value?.userType === USER_TYPE.NORMAL)

// 是否有效期内大客户
const isBigCustomer = computed(() => userInfo.value?.userType === USER_TYPE.BIGCUSTOMER)

// 是否过期大客户
const isExpired = computed(() => {
  if (!userInfo.value) return false
  return userInfo.value.userType === USER_TYPE.PASTBIGCUSTOMER
})

// 是否展示礼盒
const isShowAwardIcon = computed(() => {
  return (isBigCustomer.value && userInfo.value?.rewardReceivedState === REWARD_STATE.ENABLE)
    || (isExpired.value && userInfo.value?.rewardReceivedState === REWARD_STATE.ENABLE)
    || isNormalCustomer.value
})

const userIden = computed(() => {
  if (!userInfo.value) return ''
  if (isBigCustomer.value) {
    return `${idenMap[userInfo.value.userType]}lv.${userInfo.value.userLevel}`
  }
  return idenMap[userInfo.value.userType]
})

// 领取礼物
async function receiveGift() {
  const res = await receoveCustomerAward()
  if (res) {
    showToast('領取成功')
    // 更新用户信息
    userStore.getUserInfo()
  }
}

async function showAward() {
  await userStore.getUserInfo()
  popup.exclusive = true
}

const popup = reactive({
  ques: false,
  exclusive: false,
})

watch(userInfo, (val) => {
  if (val && val.rewardReceivedState === REWARD_STATE.ENABLE) { // 可领取自动弹窗
    popup.exclusive = true
  }
}, {
  once: true,
})
</script>

<template>
  <ContentBox v-if="userInfo" class="userCard" size="large">
    <Teleport to="body">
      <PopupScoreQues v-model:show="popup.ques" />
      <PopupExclusive
        v-model:show="popup.exclusive"
        :list="userInfo.customerRewardList"
        :state="userInfo.rewardReceivedState"
        :count-down="userInfo.rewardCountdown"
        @receive="receiveGift"
        @update-info="userStore.getUserInfo"
      />
    </Teleport>
    <div class="userCard-ctn">
      <AvatarIcon class="avatar" :src="userInfo.avatarUrl" />

      <div class="msg">
        <div class="name">
          {{ userInfo.nickname }}
        </div>

        <div class="iden">
          當期身份: {{ userIden }}
        </div>

        <div v-if="!isBigCustomer || isExpired" class="rest">
          再充值<span>{{ userInfo.needRecDiamondAmount }}</span>鑽石即可解鎖活動
        </div>
      </div>

      <div v-if="isShowAwardIcon" class="award" :class="{ redPoint: userInfo.rewardReceivedState === 2 }" @click="showAward" />
      <div v-else class="score">
        <div class="label">
          我的積分<div class="icon" @click="popup.ques = true" />
        </div>

        <div class="point">
          <div class="icon" />{{ userInfo?.currentPoint || 0 }}

          <!-- <div v-if="isExpired" class="mask" /> -->
        </div>
      </div>
    </div>
  </ContentBox>
</template>

<style lang='scss' scoped>
.userCard {
  position: relative;
  font-family: Microsoft YaHei;
  &-ctn {
    padding: 10px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .avatar {
    width: 154px;
    height: 154px;
    margin-right: 12px;
    :deep(.avatarIcon_iframe) {
      background-image: url('../assets/bg/bg-avatar.png');
    }

    :deep(.avatarIcon_avatar) {
      width: 114px;
      height: 114px;
      display: block;
      margin: 23px auto 0;
      border-radius: 50%;
    }
  }

  .msg {
    flex: 1;
  }

  .name {
    width: 250px;
    font-weight: bold;
    font-size: 30px;
    color: #113278;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 42px;
  }

  .iden {
    width: fit-content;
    height: 34px;
    border-radius: 4px;
    border: 1px solid #d6f3ff;
    padding: 0 10px;
    line-height: 30px;
    font-size: 20px;
    color: #ffffff;
    margin-top: 6px;
    background: linear-gradient(180deg, #0e219c 0%, #4480c5 100%);
  }

  .rest {
    font-size: 20px;
    color: #113278;
    margin-top: 12px;

    span {
      color: #ae6e42;
      font-weight: bold;
      margin: 0 5px;
    }
  }

  .award {
    position: relative;
    width: 118px;
    height: 128px;
    background: url('../assets/bg/bg-award.png') no-repeat center / 100% 100%;

    &.redPoint {
      &::after {
        content: '';
        position: absolute;
        right: 6px;
        top: 6px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #f33434;
      }
    }
  }

  .score {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .label {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 24px;
      color: #a4663a;

      .icon {
        width: 24px;
        height: 24px;
        background: url('../assets/icon/icon-ques2.png') no-repeat center / 100% 100%;
        margin-left: 2px;
      }
    }

    .point {
      position: relative;
      height: 36px;
      border-radius: 18px;
      padding: 0 12px;
      display: flex;
      align-items: center;
      font-size: 24px;
      line-height: 36px;
      font-weight: bold;
      color: #a4663a;
      margin-top: 12px;
      overflow: hidden;
      background: linear-gradient(90deg, #ffeca7 0%, #f8c599 100%);
      .icon {
        width: 24px;
        height: 24px;
        margin-right: 4px;
        background: url('../assets/icon/icon-integral2.png') no-repeat center / 100% 100%;
      }
      .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url('../assets/icon/icon-lock.png') no-repeat center / 34px 34px;
        background-color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}
</style>
