<!--
 * @Author: linkaiyan
 * @Date: 2025-10-27 16:19:57
 * @LastEditTime: 2026-04-07 14:14:01
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
import SortNum from './SortNum.vue'

interface Props {
  last?: boolean
  success?: boolean
  data: GiftInfoList | null
  sort: number
}

withDefaults(defineProps<Props>(), { last: false, success: false })
</script>

<template>
  <div class="voteItem">
    <div class="voteItem-card">
      <div v-if="last" :class="`mask ${success ? 'white' : 'blue'}`" />
      <SortNum :num="sort" />
      <div class="gift">
        <img :src="data?.icon">
      </div>
      <div class="msg">
        <div class="name">
          {{ data?.giftName }}
        </div>
        <div class="price">
          <div class="icon" />
          {{ data?.worth }}
        </div>
      </div>
      <div class="point">
        <div class="icon" />
        {{ data?.voteNum }}
      </div>
    </div>

    <div v-if="success" class="voteItem-success" />
  </div>
</template>

<style lang='scss' scoped>
.voteItem {
  position: relative;
  width: 600px;

  &-card {
    position: relative;
    width: 600px;
    height: 116px;
    border-radius: 20px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background: #4FA4E4; */
    background: linear-gradient(90deg, #ffffff 0%, #fffff0 100%);

    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 20px;

      &.white {
        background: #ffffff;
        opacity: 0.3;
      }

      &.blue {
        background: #4fa4e4;
        opacity: 0.5;
      }
    }

    .gift {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100px;
      margin: 0 20px 0 18px;
      background: url('../assets/bg/bg-gift2.png') no-repeat center / 100%;

      img {
        width: 96px;
        height: 96px;
        object-fit: contain;
      }
    }

    .msg {
      flex: 1;

      .name {
        font-size: 24px;
        color: #113278;
        line-height: 28px;
        margin-bottom: 10px;
      }

      .price {
        display: flex;
        align-items: center;
        font-size: 20px;
        color: #19a9ae;

        .icon {
          width: 24px;
          height: 24px;
          margin-right: 3px;
          background: url('../assets/icon/icon-diamond.png') no-repeat center / 100%;
        }
      }
    }

    .point {
      display: flex;
      align-items: center;
      height: 36px;
      border-radius: 18px;
      padding: 0 12px;
      font-size: 24px;
      color: #a4663a;
      font-family: Roboto;
      background: linear-gradient(90deg, #ffeca7 0%, #f8c599 100%);

      .icon {
        width: 24px;
        height: 24px;
        margin-right: 4px;
        background: url('../assets/icon/icon-ticket.png') no-repeat center / 100%;
      }
    }
  }

  &-success {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 64px;
    margin: auto;
    width: 144px;
    height: 110px;
    background: url('../assets/icon/icon-vote-success.png') no-repeat center / 100% 100%;
  }
}
</style>
