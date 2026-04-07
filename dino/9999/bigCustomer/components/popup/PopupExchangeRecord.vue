<!--
 * @Author: linkaiyan
 * @Date: 2025-10-29 14:54:16
 * @LastEditTime: 2026-04-07 14:16:50
 * @LastEditors: linkaiyan
 * @Description: 兑换记录
-->
<script setup lang='ts'>
import dayjs from 'dayjs'
import useListHooks from '@/hooks/useList.ts'
import { getGiftUnit } from '@/utils/gift'
import { listExchangeRecord } from '../../api'

const show = defineModel('show', { default: false })

const { pageMsg, list, getList, reset } = useListHooks<ExchangeRecord, ExchangeRecordRes>()

async function getRecord() {
  pageMsg.loading = true
  await getList({
    api: listExchangeRecord,
    name: 'records',
    formatList: (res) => {
      res.records.forEach((item: ExchangeRecord) => {
        item.time = dayjs(item.rewardLog.createTime).format('M/D HH:mm:ss')
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
  <PopupCommon class="popupExchangeRecord" :show="show" title="兌換記錄" @close="close">
    <div class="popupExchangeRecord-thead">
      <div class="left item">
        物品信息
      </div>
      <div class="item mid">
        消耗積分
      </div>
      <div class="item right">
        時間
      </div>
    </div>
    <div class="popupExchangeRecord-tbody">
      <template v-if="list.length">
        <VanList
          v-model:loading="pageMsg.loading"
          :immediate-check="false"
          :finished="pageMsg.finished"
          @load="getRecord"
        >
          <div>
            <div v-for="(item, idx) in list" :key="idx" class="popupExchangeRecord-tr">
              <div class="item left">
                {{ item.rewardLog.rewardName }}*{{
                  getGiftUnit({
                    gift: item.rewardLog,
                    keyMap: {
                      type: 'rewardType',
                      amount: 'rewardNum',
                    },
                  })
                }}
              </div>
              <div class="item score">
                <div class="icon" />*{{ item.costPoint }}
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
.popupExchangeRecord {
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
        background: url('../../assets/icon/icon-integral2.png') no-repeat center / 100% 100%;
      }
    }
  }
}
</style>
