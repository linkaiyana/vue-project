<!--
 * @Author: linkaiyan
 * @Date: 2025-09-29 15:42:29
 * @LastEditTime: 2026-04-08 16:31:23
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
import bgHalfHeader from '@PF/assets/bg/bg-header2.png'
import bgFullHeader from '@PF/assets/bg/bg-header.png'
import Page1 from './components/Page1.vue'
import Page2 from './components/Page2.vue'
import useUserStore from './store/userStore'

const userStore = useUserStore()

const curTabIndex = ref<number>(0)

const curShowCpt = computed(() => {
  return [Page1, Page2][curTabIndex.value]
})

function changeTab(index: number) {
  curTabIndex.value = index

  userStore.getUserInfo()
}

userStore.getUserInfo()

provide('changeTab', changeTab)
</script>

<template>
  <div class="index">
    <!-- 头图 -->
    <ActiveHeader
      class="index-header"
      :full-screen-image="bgFullHeader"
      :half-screen-image="bgHalfHeader"
    />

    <UserCard class="index-card" />

    <CustomTab v-model:cur-index="curTabIndex" class="index-tab" @change="changeTab" />

    <KeepAlive>
      <component :is="curShowCpt" />
    </KeepAlive>

    <div class="index-tips">
      Dino官方擁有活動最終解釋權2
    </div>
  </div>
</template>

<style lang='scss' scoped>
.index {
  min-height: 100vh;
  background-color: #020129;
  overflow: hidden;

  * {
    user-select: none;
  }

  &-header {
    height: 804px;
    position: relative;

    &-half {
      height: 380px;
      margin-bottom: 44px;
    }
  }

  &-card {
    margin: -64px auto 40px;
  }

  &-tab {
    margin: 0 auto 58px;
  }

  &-tips {
    font-size: 24px;
    color: #605f70;
    text-align: center;
    margin: 60px 0;
  }
}
</style>
