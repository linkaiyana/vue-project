<!--
 * @Author: linkaiyan
 * @Date: 2025-12-02 15:34:56
 * @LastEditTime: 2026-04-10 17:55:33
 * @LastEditors: linkaiyan
 * @Description:
-->
<template>
  <main class="about-page">
    <section class="about-page__panel">
      <p class="about-page__eyebrow">
        Reward Preview4
      </p>
      <RewardCard />
    </section>
  </main>
</template>

<style lang='scss' scoped>
.about-page {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding: 48px 24px;
  background:
    radial-gradient(circle at top, rgba(250, 255, 212, 0.9), transparent 38%),
    linear-gradient(180deg, #f1f8b5 0%, #d7ed76 100%);
}

.about-page__panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 420px;
  padding: 36px 24px 44px;
  border-radius: 32px;
  background: rgba(255, 255, 255, 0.32);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.4),
    0 20px 40px rgba(109, 147, 28, 0.16);
  backdrop-filter: blur(8px);
}

.about-page__eyebrow {
  margin: 0;
  font-size: 22px;
  line-height: 1;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #6d931c;
  text-transform: uppercase;
}
</style>
