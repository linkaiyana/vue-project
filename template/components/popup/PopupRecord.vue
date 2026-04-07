<!--
 * @Author: linkaiyan
 * @Date: 2025-10-29 14:54:16
 * @LastEditTime: 2026-04-07 16:59:08
 * @LastEditors: linkaiyan
 * @Description: 购买记录
-->
<script setup lang='ts'>
import dayjs from 'dayjs'
import useListHooks from '@/hooks/useList.ts'
import { listBuyRecord } from '../../api'

const show = defineModel('show', { default: false })

// TODO, type
const { pageMsg, list, getList, reset } = useListHooks<any, any>()

async function getRecord() {
  pageMsg.loading = true
  await getList({
    api: listBuyRecord,
    name: 'records',
    formatList: (res) => {
      // TODO, type
      res.records.forEach((item: any) => {
        item.time = dayjs(item.createTime).format('M/D HH:mm:ss')
      })
    },
  })
  pageMsg.loading = false
}

function close() {
  show.value = false
}

watch(show, (val) => {
  if (val) {
    reset()
    getRecord()
  }
})
</script>

<template>
  <PopupCommon class="popupBuyRecord" :show="show" title="購買記錄" @close="close">
    <div class="popupBuyRecord-thead">
      <div class="left item">
        物品信息
      </div>
      <div class="item mid">
        消耗鑽石
      </div>
      <div class="item right">
        時間
      </div>
    </div>
    <div class="popupBuyRecord-tbody">
      <template v-if="list.length">
        <VanList
          v-model:loading="pageMsg.loading"
          :immediate-check="false"
          :finished="pageMsg.finished"
          @load="getRecord"
        >
          <div>
            <div v-for="(item, idx) in list" :key="idx" class="popupBuyRecord-tr">
              <div class="item left">
                {{ item.rewardName }}
              </div>
              <div class="item score">
                <div class="icon" />*{{ item.needIntegral }}
              </div>
              <div class="item right">
                {{ item?.time }}
              </div>
            </div>
          </div>
        </VanList>
      </template>
      <Empty v-else />
    </div>
  </PopupCommon>
</template>

<style lang='scss' scoped>
.popupBuyRecord {
  .left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
  .mid {
    text-align: center;
  }
  .item {
    width: 33%;
  }
  &-thead {
    width: 562px;
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    color: #113278;
    font-family: Roboto;
    font-weight: bold;
    margin: 24px auto 30px;
  }

  &-tbody {
    width: 562px;
    height: 378px;
    margin: 0 auto 32px;
    overflow-y: auto;
  }

  &-tr {
    display: flex;
    font-size: 24px;
    color: #113278;
    margin-bottom: 24px;

    &:last-of-type {
      margin-bottom: 0;
    }

    .score {
      display: flex;
      justify-content: center;
      align-items: center;

      .icon {
        width: 32px;
        height: 32px;
        margin-right: 5px;
        background: url('@/assets/images/ic_diamond_dino.png') no-repeat center / 100% 100%;
      }
    }
  }
}
</style>
