<script setup lang="ts">
interface Props {
  title: string
  price: number
  badge?: string
  accent?: 'peach' | 'violet' | 'yellow' | 'blue'
  icon?: 'flower' | 'spark' | 'banana' | 'slipper'
}

const props = withDefaults(defineProps<Props>(), {
  badge: '',
  accent: 'peach',
  icon: 'flower',
})

const rootClass = computed(() => [
  'gift-item',
  `gift-item--${props.accent}`,
])

const iconClass = computed(() => [
  'gift-item__icon',
  `gift-item__icon--${props.icon}`,
])
</script>

<template>
  <article :class="rootClass">
    <span v-if="badge" class="gift-item__badge">{{ badge }}</span>
    <div :class="iconClass" />
    <h3 class="gift-item__title">
      {{ title }}
    </h3>
    <p class="gift-item__price">
      <span class="gift-item__diamond" />
      {{ price }}
    </p>
  </article>
</template>

<style scoped lang="scss">
.gift-item {
  position: relative;
  overflow: hidden;
  min-height: 176px;
  padding: 16px 10px 14px;
  border-radius: 22px;
  background: linear-gradient(180deg, #fffef7, #fff5d6);
  text-align: center;
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.6);
}

.gift-item::after {
  content: '';
  position: absolute;
  inset: auto 8px 8px;
  height: 48px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 222, 130, 0.18));
}

.gift-item__badge {
  position: absolute;
  left: 8px;
  top: 8px;
  z-index: 2;
  padding: 4px 8px;
  border-radius: 10px;
  background: linear-gradient(180deg, #ff8746, #ff5d43);
  color: #fff;
  font-size: 16px;
  line-height: 1;
  font-weight: 800;
}

.gift-item__icon {
  position: absolute;
  left: 50%;
  top: 30px;
  width: 76px;
  height: 76px;
  margin-left: -38px;
  border-radius: 22px;
}

.gift-item__title,
.gift-item__price {
  position: relative;
  z-index: 1;
}

.gift-item__title {
  margin: 92px 0 8px;
  font-size: 22px;
  line-height: 1.2;
  color: #7d4d0d;
}

.gift-item__price {
  margin: 0;
  font-size: 18px;
  line-height: 1;
  color: #6dc7da;
}

.gift-item__diamond {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 4px;
  border-radius: 3px;
  background: linear-gradient(135deg, #aef2ff, #57c6f6);
  transform: rotate(45deg);
}

.gift-item__icon--flower {
  background:
    radial-gradient(circle at center, #ffe3a0 0 12px, transparent 13px),
    radial-gradient(circle at 50% 18%, #ffe6ef 0 18px, transparent 19px),
    radial-gradient(circle at 18% 50%, #ffe6ef 0 18px, transparent 19px),
    radial-gradient(circle at 82% 50%, #ffe6ef 0 18px, transparent 19px),
    radial-gradient(circle at 50% 82%, #ffe6ef 0 18px, transparent 19px);
}

.gift-item__icon--spark {
  background:
    radial-gradient(circle at center, #ffe86a 0 10px, transparent 11px),
    conic-gradient(from 0deg, #ff95df, #b28cff, #ff95df);
  clip-path: polygon(50% 0%, 61% 33%, 100% 50%, 61% 67%, 50% 100%, 39% 67%, 0% 50%, 39% 33%);
}

.gift-item__icon--banana {
  background: transparent;
}

.gift-item__icon--banana::before,
.gift-item__icon--banana::after {
  content: '';
  position: absolute;
  width: 30px;
  height: 72px;
  border-radius: 50px;
  background: linear-gradient(180deg, #ffe46d, #ffc41d);
}

.gift-item__icon--banana::before {
  left: 8px;
  top: 0;
  transform: rotate(20deg);
}

.gift-item__icon--banana::after {
  right: 8px;
  top: 2px;
  transform: rotate(-20deg);
}

.gift-item__icon--slipper {
  border-radius: 18px 18px 28px 28px;
  background: linear-gradient(135deg, #8dd7ff, #5aa8f6);
  transform: rotate(-18deg);
}

.gift-item__icon--slipper::before {
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

.gift-item--peach {
  background:
    radial-gradient(circle at 50% -10%, rgba(255, 180, 126, 0.32), transparent 45%),
    linear-gradient(180deg, #fffef7, #fff5d6);
}

.gift-item--violet {
  background:
    radial-gradient(circle at 50% -10%, rgba(207, 127, 255, 0.26), transparent 42%),
    linear-gradient(180deg, #fffef7, #fff5d6);
}

.gift-item--yellow {
  background:
    radial-gradient(circle at 50% -10%, rgba(255, 212, 84, 0.32), transparent 42%),
    linear-gradient(180deg, #fffef7, #fff5d6);
}

.gift-item--blue {
  background:
    radial-gradient(circle at 50% -10%, rgba(117, 202, 255, 0.3), transparent 42%),
    linear-gradient(180deg, #fffef7, #fff5d6);
}
</style>
