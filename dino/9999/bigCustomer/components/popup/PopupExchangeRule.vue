<!--
 * @Author: linkaiyan
 * @Date: 2025-11-07 09:50:07
 * @LastEditTime: 2026-04-07 14:18:28
 * @LastEditors: linkaiyan
 * @Description:
-->
<script setup lang='ts'>
const route = useRoute()
const isHalfScreen = route.query?.half || false

const show = defineModel('show', {
  type: Boolean,
  default: false,
})

// 行高不同所以用div占位
const rule = `
  1. 精選專場以及靚號等需聯繫大客戶專屬管家，或端內聯繫Dino 卷卷【ID：999】兌換獎品，並且提供兌換截圖。
  <div></div>
  2. 靚號獎勵兌換後僅限兌換賬號使用，不可贈送，自兌換之時起7日內使用，過期視為放棄獎勵。
  <div></div>
  3. 靚號使用後，若超過30天未活躍官方有權回收靚號。
  <div></div>
  4. 周邊獎勵僅對中國大陸、台灣、新加坡、馬來西亞、香港、澳門等地區包郵，兌換前盡量聯繫客服查詢是否包郵。
  <div></div>
  5. 本次活動的扭蛋雙倍券、合成祝福券、全服廣播、關係寶石等道具時效為30天，獎品一經兌換無法退換。
  <div></div>
  6.雙人座駕、雙人主頁飄、禮物贈送勸等獎勵兌換後需聯繫大客戶管家兌換。
  <div></div>
  7. 如遇惡意使用BUG，活動漏洞等非法手段，Dino官方有權封禁賬戶。
  <div></div>
  8. 其它活動相關問題可諮詢大客戶專屬管家。
`

function close() {
  show.value = false
}
</script>

<template>
  <PopupCommon :show="show" closeable title="兌換規則" @close="close">
    <div :class="`popupExchangeRule ${isHalfScreen ? 'half' : ''}`" v-html="rule" />
  </PopupCommon>
</template>

<style lang='scss' scoped>
.popupExchangeRule {
  width: 562px;
  margin: 10px auto 32px;
  font-size: 24px;
  color: #384db6;
  line-height: 2;
  overflow-y: auto;
  height: 747px;

  :deep(div) {
    height: 24px;
  }

  &.half {
    height: 500px;
  }
}
</style>
