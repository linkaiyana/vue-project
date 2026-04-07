<script setup lang="ts">
interface FeatureCard {
  title: string
  price: number
  badge: string
  accent: string
  icon: string
}

interface BundleItem {
  title: string
  price: number
  accent: string
  mark: string
}

interface GameItem {
  title: string
  price: number
  tag: string
  accent: string
  action?: string
}

const featureCards = [
  {
    title: '整人大師',
    price: 1000,
    badge: '新',
    accent: 'peach',
    icon: 'flower',
  },
  {
    title: '麻痹暴露',
    price: 500,
    badge: '新',
    accent: 'violet',
    icon: 'spark',
  },
  {
    title: '香蕉皮',
    price: 100,
    badge: '热',
    accent: 'yellow',
    icon: 'banana',
  },
  {
    title: '人字拖',
    price: 500,
    badge: '热',
    accent: 'blue',
    icon: 'slipper',
  },
] satisfies FeatureCard[]

const bundleItems = [
  {
    title: '砸碎熒幕',
    price: 500,
    accent: 'mint',
    mark: '新',
  },
  {
    title: '项链花*5d',
    price: 1999,
    accent: 'violet',
    mark: '热门',
  },
  {
    title: '砸机照相镜',
    price: 999,
    accent: 'orange',
    mark: '限定',
  },
] satisfies BundleItem[]

const gameItems = [
  { title: '榴莲侠客', price: 1000, tag: '负', accent: 'lime' },
  { title: '玫瑰锤子', price: 1000, tag: '直送', accent: 'green' },
  { title: '扔你便便', price: 5000, tag: '负', accent: 'olive' },
  { title: '蝴蝶结*3d', price: 0, tag: '领', accent: 'violet', action: '领取' },
  { title: '忍爆吹泡泡', price: 5000, tag: '直送', accent: 'lime' },
  { title: '暴躁草团', price: 2000, tag: '组团', accent: 'green' },
  { title: '小丑植物', price: 10000, tag: '直送', accent: 'olive' },
  { title: '装饰框*5d', price: 0, tag: '直送', accent: 'violet', action: '盲盒' },
  { title: '嫩芽小丑', price: 1000, tag: '拍照', accent: 'lime' },
  { title: '小苍龙', price: 5000, tag: '组团', accent: 'green' },
  { title: '春夏双层镜', price: 1000, tag: '组团', accent: 'olive' },
  { title: '向心火箭', price: 0, tag: '热卖', accent: 'orange', action: '领取' },
  { title: '项链*氛围3d', price: 915, tag: '热卖', accent: 'violet' },
  { title: '主舞台*7d', price: 0, tag: '限定', accent: 'cyan', action: '限定' },
  { title: '窗纹*7d', price: 666, tag: '热卖', accent: 'sky' },
  { title: '小丑派对花*1', price: 500, tag: '热卖', accent: 'pink' },
] satisfies GameItem[]

function iconClass(type: string) {
  return `icon-${type}`
}
</script>

<template>
  <main class="act-page">
    <section class="hero">
      <div class="hero__glow hero__glow--left" />
      <div class="hero__glow hero__glow--right" />
      <div class="hero__confetti hero__confetti--1" />
      <div class="hero__confetti hero__confetti--2" />
      <div class="hero__confetti hero__confetti--3" />

      <div class="hero__title-wrap">
        <h1 class="hero__title">
          大“愚”乐家
        </h1>
        <p class="hero__date">
          3月31日-4月3日
        </p>
      </div>

      <div class="hero__giftbox">
        <div class="giftbox__ribbon" />
        <div class="giftbox__lid" />
        <div class="giftbox__body" />
        <div class="giftbox__toy giftbox__toy--bear" />
        <div class="giftbox__toy giftbox__toy--hat" />
        <div class="giftbox__toy giftbox__toy--ball" />
      </div>

      <div class="hero__float hero__float--gift" />
      <div class="hero__float hero__float--coin" />

      <div class="hero__side-actions">
        <button class="hero__side-btn">
          活动规则
        </button>
        <button class="hero__side-btn">
          奖励记录
        </button>
      </div>
    </section>

    <section class="section-card feature">
      <h2 class="section-title">
        活动礼物
      </h2>
      <div class="feature__grid">
        <article
          v-for="item in featureCards"
          :key="item.title"
          class="feature-card"
          :class="`feature-card--${item.accent}`"
        >
          <span class="feature-card__badge">{{ item.badge }}</span>
          <div class="feature-card__icon" :class="iconClass(item.icon)" />
          <h3>{{ item.title }}</h3>
          <p>
            <span class="diamond" />
            {{ item.price }}
          </p>
        </article>
      </div>

      <div class="feature__actions">
        <button class="cta cta--yellow">
          愚樂連連看
        </button>
        <button class="cta cta--orange">
          整蠱大王
        </button>
      </div>
    </section>

    <section class="section-card bundle">
      <h2 class="section-title">
        愚惑禮包
      </h2>
      <div class="bundle__panel">
        <div class="bundle__items">
          <article
            v-for="item in bundleItems"
            :key="item.title"
            class="bundle-item"
            :class="`bundle-item--${item.accent}`"
          >
            <span class="bundle-item__mark">{{ item.mark }}</span>
            <div class="bundle-item__art" />
            <h3>{{ item.title }}</h3>
            <p>
              <span class="diamond" />
              {{ item.price }}
            </p>
          </article>
        </div>

        <button class="bundle__buy">
          購買
          <span class="diamond" />
          500
          <span class="bundle__origin">(3498)</span>
        </button>
        <p class="bundle__limit">
          每個 ID 限購 1 份
        </p>
      </div>
    </section>

    <section class="section-card prank">
      <h2 class="section-title">
        愚樂連連看
      </h2>
      <div class="prank__note">
        3月31日-4月3日，「直送禮物」與「狂砸物」限時上線。人間限定禮物加上持續散播驚喜，收到指定禮物並點亮後，機會引爆連線成功；點亮全部圖示可記得全留圖並截圖分享。
      </div>

      <div class="prank__grid">
        <article
          v-for="item in gameItems"
          :key="item.title"
          class="prank-card"
          :class="`prank-card--${item.accent}`"
        >
          <span class="prank-card__tag">{{ item.tag }}</span>
          <div class="prank-card__art" />
          <h3>{{ item.title }}</h3>
          <template v-if="item.action">
            <button class="prank-card__action">
              {{ item.action }}
            </button>
          </template>
          <p v-else>
            <span class="diamond" />
            {{ item.price }}
          </p>
        </article>
      </div>
    </section>

    <section class="rule-note">
      랭킹은 유저가 이벤트 랜덤 박스를 통해 보낸 선물의 총 가치를 기준으로 집계됩니다.
      1다이아 = 1봄 시즌치. 종합 랭킹 TOP1-3은 해당 보상을 수령할 수 있습니다.
    </section>
  </main>
</template>

<style scoped lang="scss">
.act-page {
  min-height: 100vh;
  padding-bottom: 56px;
  background:
    radial-gradient(circle at top left, rgba(255, 251, 219, 0.9), transparent 32%),
    linear-gradient(180deg, #ffeaa6 0%, #ffd06a 18%, #fff2b7 36%, #ffe58d 100%);
  color: #8a4d05;
}

.hero {
  position: relative;
  overflow: hidden;
  min-height: 760px;
  padding: 92px 28px 0;
  background:
    linear-gradient(180deg, #ffe38b 0 140px, #ffc04d 140px 100%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.12) 25%, transparent 25%) 0 0 / 36px 36px,
    linear-gradient(225deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%) 0 0 / 36px 36px;
}

.hero__title-wrap {
  position: relative;
  z-index: 2;
  text-align: center;
}

.hero__title {
  margin: 0;
  font-size: 100px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: -4px;
  color: #fffef3;
  text-shadow:
    0 12px 0 #f38c26,
    0 18px 30px rgba(231, 107, 20, 0.35);
  -webkit-text-stroke: 10px #ff8e26;
}

.hero__date {
  display: inline-flex;
  margin: 18px auto 0;
  padding: 12px 32px;
  border-radius: 999px;
  background: linear-gradient(180deg, #ffce56, #ff9431);
  color: #fffdf6;
  font-size: 22px;
  font-weight: 800;
  box-shadow: 0 10px 20px rgba(237, 121, 32, 0.2);
}

.hero__giftbox {
  position: relative;
  z-index: 2;
  width: 420px;
  height: 310px;
  margin: 54px auto 0;
}

.giftbox__body,
.giftbox__lid,
.giftbox__ribbon,
.giftbox__toy,
.hero__float,
.hero__confetti,
.feature-card__icon,
.bundle-item__art,
.prank-card__art {
  position: absolute;
}

.giftbox__body {
  right: 35px;
  bottom: 20px;
  width: 280px;
  height: 160px;
  border-radius: 24px;
  background:
    linear-gradient(
      90deg,
      #fff5d8 0 18%,
      #f2a636 18% 32%,
      #fff5d8 32% 50%,
      #65b0eb 50% 68%,
      #fff5d8 68% 82%,
      #f18a2e 82% 100%
    ),
    linear-gradient(180deg, #ffd577 0%, #f59f34 100%);
  box-shadow: 0 24px 40px rgba(221, 112, 21, 0.28);
}

.giftbox__lid {
  right: 42px;
  bottom: 154px;
  width: 266px;
  height: 32px;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffeaa9, #f9ad46);
  transform: rotate(-8deg);
}

.giftbox__ribbon {
  right: 156px;
  bottom: 20px;
  width: 28px;
  height: 160px;
  border-radius: 999px;
  background: linear-gradient(180deg, #ffdf75, #f88323);
  box-shadow: 0 0 0 10px rgba(255, 214, 92, 0.25);
}

.giftbox__toy--bear {
  left: 112px;
  bottom: 106px;
  width: 164px;
  height: 132px;
  border-radius: 82px 82px 60px 60px;
  background:
    radial-gradient(circle at 30% 35%, #fff6d9 0 14px, transparent 15px),
    radial-gradient(circle at 70% 35%, #fff6d9 0 14px, transparent 15px),
    radial-gradient(circle at 50% 62%, #ffd56d 0 22px, transparent 23px),
    linear-gradient(180deg, #8feecf 0%, #53d0ad 100%);
  box-shadow: inset 0 -12px 0 rgba(0, 0, 0, 0.06);
}

.giftbox__toy--hat {
  right: 116px;
  bottom: 158px;
  width: 86px;
  height: 112px;
  border-radius: 14px 14px 18px 18px;
  background:
    linear-gradient(90deg, #5979cc 0 24%, #ffffff 24% 40%, #5979cc 40% 64%, #ffffff 64% 78%, #5979cc 78% 100%),
    linear-gradient(180deg, #7f95df, #4f6fca);
  transform: rotate(18deg);
}

.giftbox__toy--ball {
  right: 36px;
  bottom: 40px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ffc9c4, #ec4d36);
}

.hero__float--gift {
  left: 22px;
  bottom: 102px;
  width: 78px;
  height: 78px;
  border-radius: 18px;
  background:
    linear-gradient(90deg, #ffb44c 0 38%, #fff1c1 38% 54%, #ffb44c 54% 100%), linear-gradient(180deg, #ffd76e, #ff9f35);
  transform: rotate(-14deg);
  box-shadow: 0 20px 30px rgba(212, 109, 24, 0.22);
}

.hero__float--coin {
  right: 12px;
  top: 364px;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 35% 35%, #fff7d8 0 10px, transparent 11px), linear-gradient(180deg, #ffcf68, #ff9333);
  box-shadow: 0 20px 30px rgba(227, 111, 19, 0.25);
}

.hero__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(12px);
}

.hero__glow--left {
  left: -52px;
  top: 220px;
  width: 240px;
  height: 240px;
  background: rgba(255, 241, 192, 0.65);
}

.hero__glow--right {
  right: -84px;
  top: 236px;
  width: 280px;
  height: 280px;
  background: rgba(255, 195, 93, 0.46);
}

.hero__confetti {
  z-index: 1;
  border-radius: 999px;
}

.hero__confetti--1 {
  left: 82px;
  top: 224px;
  width: 18px;
  height: 88px;
  background: linear-gradient(180deg, #f74b37, #ff865f);
  transform: rotate(-24deg);
}

.hero__confetti--2 {
  left: 130px;
  top: 312px;
  width: 20px;
  height: 20px;
  background: #ffda5a;
}

.hero__confetti--3 {
  right: 80px;
  top: 250px;
  width: 58px;
  height: 16px;
  background: linear-gradient(90deg, #fd7672, #ffb55b);
  transform: rotate(24deg);
}

.hero__side-actions {
  position: absolute;
  right: 12px;
  top: 430px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hero__side-btn {
  min-width: 116px;
  padding: 12px 18px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(180deg, #ffb454, #ff9042);
  color: #fffef2;
  font-size: 20px;
  font-weight: 700;
  box-shadow: 0 8px 18px rgba(220, 111, 30, 0.26);
}

.section-card {
  margin: 0 12px 18px;
  padding: 18px 16px 24px;
  border-radius: 28px;
  background: linear-gradient(180deg, #fff8d9, #fffef4);
  box-shadow:
    0 10px 0 rgba(255, 211, 96, 0.9),
    0 18px 32px rgba(233, 177, 58, 0.18);
}

.section-title {
  margin: 0 0 18px;
  text-align: center;
  font-size: 42px;
  line-height: 1.1;
  font-weight: 900;
  color: #9c5808;
  text-shadow: 0 6px 0 rgba(255, 226, 132, 0.85);
}

.feature {
  margin-top: -10px;
}

.feature__grid,
.bundle__items {
  display: grid;
  gap: 12px;
}

.feature__grid {
  grid-template-columns: repeat(4, 1fr);
}

.feature-card,
.bundle-item,
.prank-card {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  background: linear-gradient(180deg, #fffef7, #fff5d6);
}

.feature-card {
  min-height: 176px;
  padding: 16px 10px 14px;
  text-align: center;
}

.feature-card__badge,
.bundle-item__mark,
.prank-card__tag {
  position: absolute;
  left: 8px;
  top: 8px;
  padding: 4px 8px;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  line-height: 1;
  font-weight: 800;
}

.feature-card__badge {
  background: linear-gradient(180deg, #ff8746, #ff5d43);
}

.feature-card__icon {
  left: 50%;
  top: 30px;
  width: 76px;
  height: 76px;
  margin-left: -38px;
  border-radius: 22px;
}

.icon-flower {
  background:
    radial-gradient(circle at center, #ffe3a0 0 12px, transparent 13px),
    radial-gradient(circle at 50% 18%, #ffe6ef 0 18px, transparent 19px),
    radial-gradient(circle at 18% 50%, #ffe6ef 0 18px, transparent 19px),
    radial-gradient(circle at 82% 50%, #ffe6ef 0 18px, transparent 19px),
    radial-gradient(circle at 50% 82%, #ffe6ef 0 18px, transparent 19px);
}

.icon-spark {
  background:
    radial-gradient(circle at center, #ffe86a 0 10px, transparent 11px),
    conic-gradient(from 0deg, #ff95df, #b28cff, #ff95df);
  clip-path: polygon(50% 0%, 61% 33%, 100% 50%, 61% 67%, 50% 100%, 39% 67%, 0% 50%, 39% 33%);
}

.icon-banana {
  background: transparent;
}

.icon-banana::before,
.icon-banana::after {
  content: '';
  position: absolute;
  width: 30px;
  height: 72px;
  border-radius: 50px;
  background: linear-gradient(180deg, #ffe46d, #ffc41d);
}

.icon-banana::before {
  left: 8px;
  top: 0;
  transform: rotate(20deg);
}

.icon-banana::after {
  right: 8px;
  top: 2px;
  transform: rotate(-20deg);
}

.icon-slipper {
  border-radius: 18px 18px 28px 28px;
  background: linear-gradient(135deg, #8dd7ff, #5aa8f6);
  transform: rotate(-18deg);
}

.icon-slipper::before {
  content: '';
  position: absolute;
  left: 18px;
  top: 10px;
  width: 38px;
  height: 18px;
  border: 6px solid #fff9e8;
  border-bottom: 0;
  border-radius: 30px 30px 0 0;
}

.feature-card h3,
.bundle-item h3,
.prank-card h3 {
  position: relative;
  z-index: 1;
  margin: 92px 0 8px;
  font-size: 22px;
  line-height: 1.2;
  color: #7d4d0d;
}

.feature-card p,
.bundle-item p,
.prank-card p {
  margin: 0;
  font-size: 18px;
  line-height: 1;
  color: #6dc7da;
}

.diamond {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 4px;
  border-radius: 3px;
  background: linear-gradient(135deg, #aef2ff, #57c6f6);
  transform: rotate(45deg);
}

.feature__actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-top: 18px;
}

.cta,
.bundle__buy,
.prank-card__action {
  border: 0;
  font-weight: 900;
  color: #fffef4;
}

.cta {
  height: 78px;
  border-radius: 999px;
  font-size: 34px;
  box-shadow:
    inset 0 0 0 4px rgba(255, 255, 255, 0.65),
    0 12px 22px rgba(225, 130, 24, 0.22);
}

.cta--yellow {
  background: linear-gradient(180deg, #ffd853, #ffaf1d);
}

.cta--orange {
  background: linear-gradient(180deg, #ffa84f, #ff7d48);
}

.bundle__panel {
  padding: 18px 14px 14px;
  border-radius: 24px;
  background: linear-gradient(180deg, #fff0ab, #fff8db);
}

.bundle__items {
  grid-template-columns: repeat(3, 1fr);
}

.bundle-item {
  min-height: 170px;
  padding: 12px 10px;
  text-align: center;
}

.bundle-item__mark {
  background: linear-gradient(180deg, #ffa15e, #ff6d45);
}

.bundle-item__art {
  left: 50%;
  top: 22px;
  width: 94px;
  height: 94px;
  margin-left: -47px;
}

.bundle-item--mint .bundle-item__art {
  border-radius: 50%;
  background:
    radial-gradient(circle at center, rgba(255, 246, 202, 0.9) 0 8px, transparent 9px),
    conic-gradient(
      from 0deg,
      transparent 0 10deg,
      #fff0af 10deg 20deg,
      transparent 20deg 30deg,
      #fff0af 30deg 40deg,
      transparent 40deg 50deg,
      #fff0af 50deg 60deg,
      transparent 60deg 70deg,
      #fff0af 70deg 80deg,
      transparent 80deg 90deg,
      #fff0af 90deg 100deg,
      transparent 100deg 110deg,
      #fff0af 110deg 120deg,
      transparent 120deg 130deg,
      #fff0af 130deg 140deg,
      transparent 140deg 150deg,
      #fff0af 150deg 160deg,
      transparent 160deg 170deg,
      #fff0af 170deg 180deg,
      transparent 180deg 190deg,
      #fff0af 190deg 200deg,
      transparent 200deg 210deg,
      #fff0af 210deg 220deg,
      transparent 220deg 230deg,
      #fff0af 230deg 240deg,
      transparent 240deg 250deg,
      #fff0af 250deg 260deg,
      transparent 260deg 270deg,
      #fff0af 270deg 280deg,
      transparent 280deg 290deg,
      #fff0af 290deg 300deg,
      transparent 300deg 310deg,
      #fff0af 310deg 320deg,
      transparent 320deg 330deg,
      #fff0af 330deg 340deg,
      transparent 340deg 350deg,
      #fff0af 350deg 360deg
    );
}

.bundle-item--violet .bundle-item__art {
  border-radius: 50%;
  box-shadow:
    inset 0 0 0 8px #c15eff,
    inset 0 0 0 16px #fff1c7,
    0 0 0 10px rgba(255, 220, 95, 0.55);
}

.bundle-item--orange .bundle-item__art {
  border-radius: 24px;
  background: linear-gradient(135deg, #ff7a54, #ffca4d);
}

.bundle-item--orange .bundle-item__art::before {
  content: '';
  position: absolute;
  inset: 18px 12px;
  border-radius: 999px;
  background: linear-gradient(90deg, #fff4cc, rgba(255, 244, 204, 0.2), #fff4cc);
}

.bundle-item h3 {
  margin-top: 110px;
  font-size: 20px;
}

.bundle__buy {
  display: block;
  min-width: 318px;
  height: 56px;
  margin: 18px auto 10px;
  padding: 0 28px;
  border-radius: 999px;
  background: linear-gradient(180deg, #ffb74b, #ff922b);
  font-size: 26px;
  box-shadow: 0 10px 16px rgba(229, 122, 29, 0.18);
}

.bundle__origin {
  color: rgba(255, 255, 255, 0.82);
  font-size: 20px;
}

.bundle__limit {
  margin: 0;
  text-align: center;
  font-size: 18px;
  color: #b28a35;
}

.prank__note {
  margin-bottom: 16px;
  padding: 18px;
  border-radius: 22px;
  background: linear-gradient(180deg, #fff6cf, #fff0af);
  color: #91560d;
  font-size: 22px;
  line-height: 1.5;
}

.prank__grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 8px 0;
}

.prank__grid::before {
  content: '';
  position: absolute;
  inset: 54px 70px 56px;
  border: 10px solid rgba(255, 211, 104, 0.65);
  border-radius: 999px;
  pointer-events: none;
}

.prank-card {
  min-height: 198px;
  padding: 12px 10px 14px;
  text-align: center;
  box-shadow: 0 8px 18px rgba(238, 203, 117, 0.18);
}

.prank-card__tag {
  background: linear-gradient(180deg, #4fc3ff, #4f7fff);
}

.prank-card__art {
  left: 50%;
  top: 24px;
  width: 92px;
  height: 92px;
  margin-left: -46px;
  border-radius: 22px;
}

.prank-card--lime .prank-card__art {
  background:
    radial-gradient(circle at 45% 30%, #c6ff86 0 20px, transparent 21px),
    radial-gradient(circle at 58% 60%, #9ee84d 0 26px, transparent 27px), linear-gradient(180deg, #5cab38, #326e20);
}

.prank-card--green .prank-card__art {
  background:
    radial-gradient(circle at center, #d8ff8a 0 18px, transparent 19px), linear-gradient(135deg, #9de43a, #3aa74b);
  transform: rotate(14deg);
}

.prank-card--olive .prank-card__art {
  background: linear-gradient(135deg, #8dd04f, #497a22);
}

.prank-card--olive .prank-card__art::before,
.prank-card--olive .prank-card__art::after {
  content: '';
  position: absolute;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 999px;
}

.prank-card--olive .prank-card__art::before {
  inset: 12px 34px;
}

.prank-card--olive .prank-card__art::after {
  inset: 34px 12px;
}

.prank-card--violet .prank-card__art {
  background:
    radial-gradient(circle at center, transparent 0 24px, #cb76ff 25px 32px, transparent 33px),
    radial-gradient(circle at center, transparent 0 38px, #ffe082 39px 44px, transparent 45px), #fff8e6;
}

.prank-card--orange .prank-card__art {
  background: linear-gradient(180deg, #ffb14c, #ff7a39);
  clip-path: polygon(50% 0%, 100% 18%, 82% 100%, 18% 100%, 0% 18%);
}

.prank-card--cyan .prank-card__art,
.prank-card--sky .prank-card__art {
  background: radial-gradient(circle at center, transparent 0 32px, #fbe685 33px 38px, transparent 39px), #f7fff6;
}

.prank-card--pink .prank-card__art {
  background:
    radial-gradient(circle at 30% 30%, #ff8fc3 0 16px, transparent 17px),
    radial-gradient(circle at 66% 56%, #ffd76b 0 14px, transparent 15px), linear-gradient(135deg, #7f90ff, #ff73ac);
}

.prank-card h3 {
  margin-top: 118px;
  font-size: 18px;
  line-height: 1.25;
}

.prank-card__action {
  min-width: 78px;
  height: 40px;
  margin-top: 8px;
  border-radius: 999px;
  background: linear-gradient(180deg, #ffb34d, #ff8f2d);
  font-size: 18px;
  box-shadow: 0 8px 14px rgba(226, 121, 24, 0.18);
}

.rule-note {
  margin: 20px 16px 0;
  padding: 20px 22px 30px;
  border-radius: 20px;
  background: #c9ee5d;
  color: #6d931c;
  font-size: 20px;
  line-height: 1.5;
  text-align: center;
}

@media (max-width: 420px) {
  .hero {
    min-height: 700px;
  }

  .hero__title {
    font-size: 90px;
  }
}
</style>
