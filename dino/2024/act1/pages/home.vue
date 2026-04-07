<script setup lang="ts">
interface GiftCard {
  title: string
  price: number
  badge: string
  accent: 'peach' | 'violet' | 'yellow' | 'blue'
  icon: 'flower' | 'spark' | 'banana' | 'slipper'
}

const giftCards: GiftCard[] = [
  {
    title: '整人大师',
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
]
</script>

<template>
  <main class="home-page">
    <section class="gift-panel">
      <h1 class="gift-panel__title">
        活动礼物
      </h1>
      <div class="gift-panel__grid">
        <GiftItem
          v-for="item in giftCards"
          :key="item.title"
          :title="item.title"
          :price="item.price"
          :badge="item.badge"
          :accent="item.accent"
          :icon="item.icon"
        />
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
  padding: 32px 12px;
  background:
    radial-gradient(circle at top left, rgba(255, 250, 219, 0.95), transparent 30%),
    linear-gradient(180deg, #ffe8a0 0%, #ffd068 30%, #fff1bc 100%);
}

.gift-panel {
  padding: 18px 16px 24px;
  border-radius: 28px;
  background: linear-gradient(180deg, #fff8d9, #fffef4);
  box-shadow:
    0 10px 0 rgba(255, 211, 96, 0.92),
    0 18px 32px rgba(233, 177, 58, 0.18);
}

.gift-panel__title {
  margin: 0 0 18px;
  text-align: center;
  font-size: 42px;
  line-height: 1.1;
  font-weight: 900;
  color: #9c5808;
  text-shadow: 0 6px 0 rgba(255, 226, 132, 0.85);
}

.gift-panel__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
</style>
