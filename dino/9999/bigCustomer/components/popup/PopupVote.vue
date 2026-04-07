<script setup lang='ts'>
const props = withDefaults(defineProps<Props>(), {
  ticket: 0,
  list: () => [],
})

const emits = defineEmits(['confirm'])

const route = useRoute()
const isHalfScreen = route.query?.half || false

interface Props {
  ticket?: number
  list?: GiftInfoList[]
}
const show = defineModel('show', {
  type: Boolean,
  default: false,
})

// 已使用的票数
const usedTickets = computed(() => {
  const useNum = props.list.reduce((sum, cur) => {
    return sum + (cur?.selectNum || 0)
  }, 0)
  return useNum
})

// 剩余的票数
const restNum = computed(() => {
  if (!props.ticket) return 0
  return props.ticket - usedTickets.value
})

const lastSetNum = ref<number[]>([])

async function confirmVote() {
  emits('confirm')
  close()
}

// 计算剩余票数
const remainingTickets = computed(() => {
  return Math.max(0, props.ticket - usedTickets.value)
})

function handleVoteChange(val: number, index: number) {
  const preSet = lastSetNum.value[index]

  if (val < preSet) {
    lastSetNum.value[index] = val
    return true
  }
  else if (val > remainingTickets.value + preSet) {
    showToast('票數不足')
    return false
  }
  lastSetNum.value[index] = val
  return val
}

function changeSelect(item: GiftInfoList, index: number) {
  if (item.selected) {
    item.selected = false
    item.selectNum = 0
    lastSetNum.value[index] = 0
  }
  else {
    if (remainingTickets.value <= 0) {
      showToast('票數不足')
    }
    else {
      item.selected = true
      item.selectNum = 1
      lastSetNum.value[index] = 1
    }
  }
}

function close() {
  show.value = false
}

watch(show, (val) => {
  if (val) {
    lastSetNum.value = Array.from({ length: props.list.length }).fill(1) as number[]
  }
}, {
  once: true,
})
</script>

<template>
  <PopupCommon class="popupVote" :show="show" :closeable="false" title="返場禮物投票(可多選)" @close="close">
    <div class="ctn">
      <div class="tips">
        可用票數<div class="icon" /><span>{{ restNum }}</span>
      </div>

      <div class="list" :class="{ half: isHalfScreen }">
        <div v-for="(item, index) in list" :key="index" class="list_item">
          <div class="left">
            <div class="top">
              <div class="top-left">
                <div class="name">
                  {{ item.giftName }}
                </div>
                <InputNumber v-if="item.selected" v-model:value="item.selectNum" :min="1" size="small" :before-change="(val: number) => handleVoteChange(val, index)" />
              </div>
              <div class="percent">
                {{ item.voteNumPercentage }}%
              </div>
            </div>
            <div class="bottom">
              <div
                class="cur"
                :style="{
                  width: `${item.voteNumPercentage}%`,
                }"
              />
            </div>
          </div>
          <div
            class="radio" :class="{
              active: item.selected,
            }"
            @click="changeSelect(item, index)"
          />
        </div>
      </div>

      <div class="btns">
        <CommonBtn class="btn" @click="close">
          <LinearText text="取消" type="brown" />
        </CommonBtn>
        <CommonBtn class="btn" @click="confirmVote">
          <LinearText text="確認投票" type="brown" />
        </CommonBtn>
      </div>
    </div>
  </PopupCommon>
</template>

<style lang='scss' scoped>
.popupVote {
  .ctn {
    .tips {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      color: #113278;
      margin: 24px 0;
      .icon {
        width: 26px;
        height: 26px;
        background: url('../../assets/icon/icon-ticket.png') no-repeat center / 100% 100%;
        margin: 0 8px;
      }

      span {
        font-weight: bold;
        color: #ae6e42;
      }
    }

    .list {
      width: 582px;
      max-height: 562px;
      border-radius: 20px;
      background: #ffffff;
      margin: auto;
      overflow-y: auto;
      padding-top: 30px;

      &.half {
        max-height: 402px;
      }

      &_item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
        .left {
          width: 466px;
          .top {
            display: flex;
            justify-content: space-between;
            height: 28px;

            &-left {
              display: flex;
              align-items: center;
            }
            .name {
              font-size: 24px;
              color: #113278;
              font-family: Roboto;
              margin-right: 38px;
            }
            .percent {
              font-size: 20px;
              color: #8c8c8c;
            }
          }

          .bottom {
            width: 466px;
            height: 18px;
            margin-top: 12px;
            background-color: #ebebeb;

            .cur {
              height: 100%;
              background-color: #4a58e3;
            }
          }
        }

        .radio {
          width: 32px;
          height: 32px;
          background-image: url('../../assets/icon/icon-radio.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          margin-left: 28px;

          &.active {
            background-image: url('../../assets/icon/icon-radio-selected.png');
          }
        }
      }
    }

    .btns {
      display: flex;
      justify-content: space-between;
      font-family: Microsoft YaHei UI;
      padding: 0 22px;
      margin: 40px 0 32px;

      .btn {
        width: 264px;
        height: 74px;
        background: url('../../assets/btn/btn-large.png') no-repeat center / contain;
        font-size: 30px;
        font-weight: bold;
      }
    }
  }
}
</style>
