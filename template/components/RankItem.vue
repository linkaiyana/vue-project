<!--
 * @Author: linkaiyan
 * @Date: 2025-11-23 14:09:18
 * @LastEditTime: 2026-04-07 16:39:38
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
import defaultAvatar from '@/assets/images/avatar.jpg'
import { goAppUserInfoPage } from '@/bridge'

defineProps<{
  // TODO type
  data: any
  self?: boolean
}>()
</script>

<template>
  <div v-if="data" class="rankItem" :class="{ self }" bg="contain no-repeat">
    <div class="sort">
      {{ +data.rank > 20 || +data.rank === -1 ? '20+' : data.rank }}
    </div>

    <Picture class="avatar" :src="data.avatarUrl || defaultAvatar" :error-icon="defaultAvatar" @click="goAppUserInfoPage(data.userId)" />

    <div class="msg">
      <div class="name">
        {{ data.nickname }}
      </div>
      <div class="id">
        <div class="block">
          ID
        </div>
        {{ data.accountId }}
      </div>
    </div>

    <div class="right">
      <div v-if="+data.rank === 1 && !self" class="top1" data-text="TOP1">
        TOP1
      </div>

      <div v-else>
        <div class="diff">
          {{ self ? '春日值' : '距離上一名' }}
        </div>
        <div class="num">
          {{ self ? data.charge : data.gapToPrev }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.rankItem {
  width: 670px;
  height: 154px;
  padding: 0 48px 0 0;
  display: flex;
  align-items: center;
  background-image: url('../assets/bg/bg-rankItem.png');
  color: #6d931c;

  &.self {
    width: 720px;
    background: none;
    padding: 0 45px 0 0;

    .sort {
      width: 106px;
    }

    .avatar {
      width: 112px;
      height: 112px;
    }
  }

  .sort {
    width: 99px;
    text-align: center;
    font-size: 24px;
  }

  .avatar {
    width: 105px;
    height: 105px;
    border-radius: 50%;
    border: 2px solid #f2ffb5;
  }

  .msg {
    width: 160px;
    margin-left: 20px;

    .id {
      display: flex;
      align-items: center;
      font-size: 24px;
      margin-top: 7px;
      line-height: 32px;
      color: #2fa68a;

      .block {
        width: 28px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #2fa68a;
        font-size: 20px;
        border-radius: 6px;
        margin-right: 7px;
      }
    }
    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 26px;
      line-height: 30px;
      font-weight: bold;
      background-color: transparent;
    }
  }
  .right {
    margin-left: auto;
    text-align: center;
    font-size: 24px;
    line-height: 31px;

    .top1 {
      position: relative;
      z-index: 2;
      font-size: 35px;
      color: #6d931c;
      width: fit-content;
      font-family: SweiXDPearlCJKTC;

      &::before {
        content: attr(data-text);
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1; /* 确保黑边在黄字下面 */
        -webkit-text-stroke: 8px #f7ffce;
      }
    }

    .diff {
      font-size: 20px;
      white-space: nowrap;
    }

    .num {
      position: relative;
      z-index: 2;
      font-size: 24px;
      width: fit-content;
      margin-left: auto;
      line-height: 34px;
      font-weight: bold;
    }
  }
}
</style>
