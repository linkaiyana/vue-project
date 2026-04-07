<!--
 * @Author: linkaiyan
 * @Date: 2025-10-27 14:30:37
 * @LastEditTime: 2026-04-07 11:50:52
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
import { getGiftUnit } from '@/utils/gift'

type GiftData = Partial<ExpGift & GiftInfoList & GiveEntity & ExchangeGift & PunchReward>

type GiftDataKey = keyof GiftData

interface Props {
  size?: 'small' | 'mid' | 'large'
  data: GiftData | null
  withIcon?: boolean
  showUnit?: boolean
  showLimit?: boolean
  showStatus?: boolean
  giftNumKey?: GiftDataKey
  giftTypeKey?: GiftDataKey
}
withDefaults(defineProps<Props>(), {
  size: 'mid',
  withIcon: false,
  showUnit: false,
  showLimit: false,
  showStatus: false,
  giftNumKey: 'amount',
  giftTypeKey: 'giftType',
})

const iconMap = {
  1: '直送',
  2: '活動',
  3: '扭蛋',
  4: '合成',
  5: '禮盒',
  6: '奪寶',
}
</script>

<template>
  <div v-if="data" :class="`gift ${size}`">
    <div class="gift-pic">
      <div v-if="withIcon && data.giftType" :class="`icon type${data.giftType}`">
        {{ iconMap[data.giftType] }}
      </div>
      <div v-if="showLimit && data.limitType" class="rest">
        {{ data.limitType === 1 ? '' : '全服' }}剩餘{{ data.remainder }}份
      </div>
      <!-- 已领取 -->
      <div v-if="showStatus" class="status" />
      <img class="img" :src="data?.giftIcon || data?.icon || data?.rewardIcon">
    </div>
    <div class="gift-name">
      {{ data?.giftName || data?.rewardName || data?.productName }}
      <div v-if="showUnit">
        *{{ getGiftUnit({
          gift: data,
          keyMap: {
            type: giftTypeKey,
            amount: giftNumKey,
          },
        }) }}
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
@use 'sass:list';

.gift {
  width: 176px;

  &.large {
    width: 260px;
    .gift-pic {
      height: 276px;
      padding-top: 20px;

      .img {
        width: 252px;
        height: 252px;
      }
    }
  }

  &.small {
    width: 130px;

    .gift-pic {
      height: 138px;
      padding-top: 10px;

      .status {
        position: absolute;
        z-index: 20;
        left: 0;
        right: 0;
        top: 10px;
        margin: auto;
        width: 126px;
        height: 126px;
        border-radius: 14px;
        background:
          url('../assets/icon/icon-yes.png') no-repeat center / 34px 24px,
          rgba(0, 28, 94, 0.6);
      }

      .img {
        width: 126px;
        height: 126px;
      }
    }

    .gift-name {
      margin-top: 6px;
      font-size: 20px;
    }
  }

  &-pic {
    position: relative;
    width: 100%;
    height: 188px;
    padding-top: 18px;
    background: url('../assets/bg/bg-gift.png') no-repeat center / 100%;

    .icon {
      position: absolute;
      z-index: 10;
      left: 3px;
      top: 14px;
      width: 64px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #ec5b5c;
      font-size: 20px;
      font-family: Roboto;
      border-radius: 15px 15px 15px 0;
      background: linear-gradient(270deg, #fffbd9 0%, #ffffff 100%);

      $colors: #ec5b5c #3178dc #7631dc #119987 #cd33c0 #df8526;
      @for $idx from 1 through 6 {
        &.type#{$idx} {
          color: list.nth($colors, $idx);
        }
      }
    }

    .rest {
      position: absolute;
      z-index: 10;
      left: 3px;
      top: 14px;
      height: 30px;
      padding: 0 12px;
      line-height: 30px;
      border-radius: 15px 15px 15px 0;
      background-color: #2c3bdb;
      font-size: 20px;
      color: #edc18f;
    }

    .img {
      position: relative;
      z-index: 1;
      width: 160px;
      height: 160px;
      margin: auto;
      object-fit: contain;
      display: block;
      margin: auto;
    }
  }

  &-name {
    font-size: 24px;
    line-height: 1.2;
    text-align: center;
    color: #113278;
    margin-top: 10px;
  }
}
</style>
