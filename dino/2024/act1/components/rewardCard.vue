<script setup lang="ts">
import badgeUrl from '../assets/figma/reward-badge.png'
import flowerLeftUrl from '../assets/figma/reward-flower-left.png'
import flowerRightUrl from '../assets/figma/reward-flower-right.png'
import rewardMainUrl from '../assets/figma/reward-main.webp'

interface Props {
  title?: string
  daysText?: string
}

withDefaults(defineProps<Props>(), {
  title: '静态尾灯*7d',
  daysText: '累计1天',
})
</script>

<template>
  <article class="reward-card">
    <div class="reward-card__visual">
      <img class="reward-card__flower reward-card__flower--left" :src="flowerLeftUrl" alt="">
      <img class="reward-card__main" :src="rewardMainUrl" alt="静态尾灯礼盒奖励">
      <img class="reward-card__flower reward-card__flower--right" :src="flowerRightUrl" alt="">
    </div>

    <div class="reward-card__footer">
      <p class="reward-card__title">
        {{ title }}
      </p>
    </div>

    <div class="reward-card__badge">
      <img class="reward-card__badge-image" :src="badgeUrl" alt="">
      <span class="reward-card__badge-text">{{ daysText }}</span>
    </div>
  </article>
</template>

<style scoped lang="scss">
.reward-card {
  position: relative;
  overflow: hidden;
  width: 177px;
  height: 238px;
  border-radius: 50px 10px 10px;
  background: #d7ed76;
  box-shadow:
    0 18px 36px rgba(109, 147, 28, 0.18),
    inset 0 0 0 1px rgba(255, 255, 255, 0.3);
}

.reward-card__visual {
  position: relative;
  width: 100%;
  height: 193px;
}

.reward-card__main,
.reward-card__flower,
.reward-card__badge-image {
  position: absolute;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
}

.reward-card__main {
  left: 50%;
  top: 14px;
  width: 136px;
  height: 136px;
  transform: translateX(-50%);
  object-fit: contain;
}

.reward-card__flower {
  object-fit: contain;
}

.reward-card__flower--left {
  left: 7px;
  top: 7px;
  width: 58.9px;
  height: 58.9px;
}

.reward-card__flower--right {
  right: 7px;
  top: 88px;
  width: 49.9px;
  height: 49.9px;
}

.reward-card__footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 45px;
  border-radius: 0 0 10px 10px;
  background: #edff9f;
}

.reward-card__title {
  margin: 0;
  line-height: 45px;
  text-align: center;
  font-size: 24px;
  color: #6d931c;
  white-space: nowrap;
}

.reward-card__badge {
  position: absolute;
  top: 0;
  right: 0;
  width: 98px;
  height: 38px;
}

.reward-card__badge-image {
  inset: 0;
  width: 100%;
  height: 100%;
}

.reward-card__badge-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  line-height: 1;
  color: #f7ffce;
  transform: translateY(-1px);
}
</style>
