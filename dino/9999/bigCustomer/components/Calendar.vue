<script setup lang="ts">
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import LinearText from './LinearText.vue'

const props = defineProps({
  signedDates: {
    type: Array as () => string[], // 签到日期数组，格式为 'YYYY-MM-DD'
    default: () => [],
  },
  now: {
    type: Object as () => Dayjs,
    default: () => dayjs().utcOffset(8),
  },
  signScore: {
    type: Number,
    default: 0,
  },
})

const emits = defineEmits(['sign'])

// 扩展 dayjs 插件
dayjs.extend(utc)

const weekdays = ['日', '一', '二', '三', '四', '五', '六']

// 计算当月的天数
const daysInMonth = computed(() => {
  return props.now.date(1).daysInMonth()
})

// 计算当月第一天是星期几
const firstDayOfMonth = computed(() => {
  return props.now.date(1).day()
})

// 计算需要的行数
const weeksNeeded = computed(() => {
  // 第一天的位置 + 当月天数
  const totalDays = firstDayOfMonth.value + daysInMonth.value
  // 向上取整计算需要的周数
  return Math.ceil(totalDays / 7)
})

// 创建签到日期的 Set 以便快速查找
const signedDatesSet = computed(() => {
  return new Set(props.signedDates || [])
})

// 预计算所有日期信息
const allDaysInfo = computed(() => {
  // 创建所有日期信息的数组
  const allDaysInfo: any[] = []

  // 计算当月日期在数组中的起始位置
  const startIndex = firstDayOfMonth.value

  // 初始化数组
  const totalDays = weeksNeeded.value * 7
  for (let i = 0; i < totalDays; i++) {
    allDaysInfo[i] = {
      day: null,
      isToday: false,
      isSigned: false,
      isFuture: false,
    }
  }

  // 填充当月的日期信息
  for (let i = 0; i < daysInMonth.value; i++) {
    const date = props.now.date(i + 1)
    const dateStr = date.format('YYYY-MM-DD')

    allDaysInfo[startIndex + i] = {
      day: date,
      isToday: date.isSame(props.now),
      isSigned: signedDatesSet.value.has(dateStr),
      isFuture: date.isAfter(props.now),
    }
  }

  return allDaysInfo

  // 按周分组
  // const weeks = []
  // for (let i = 0; i < weeksNeeded.value; i++) {
  //   const week = allDaysInfo.slice(i * 7, (i + 1) * 7)
  //   weeks.push(week)
  // }

  // return weeks
})

// 今天是否签到
const isTodaySigned = computed(() => {
  return allDaysInfo.value.find(dayInfo => dayInfo.isToday)?.isSigned
})

async function signIn() {
  if (isTodaySigned.value) return
  emits('sign')
}
</script>

<template>
  <div class="calendar">
    <div class="calendar-weekdays">
      <div v-for="day in weekdays" :key="day" class="weekday">
        {{ day }}
      </div>
    </div>

    <div class="calendar-days">
      <!-- <div v-for="(week, weekIndex) in calendarWeeks" :key="weekIndex" class="calendar-week"> -->
      <div
        v-for="(dayInfo, dayIndex) in allDaysInfo"
        :key="dayIndex"
        class="calendar-day" :class="[
          {
            empty: !dayInfo.day,
            today: dayInfo.isToday,
            signed: dayInfo.isSigned,
            future: dayInfo.isFuture,
          },
        ]"
      >
        <template v-if="dayInfo.day">
          <template v-if="dayInfo.isSigned">
            <div class="signTop">
              <div class="icon" />
            </div>
            <div class="signBottom">
              <div class="icon" />
              + {{ signScore }}
            </div>
          </template>
          <template v-else>
            <div class="top">
              {{ dayInfo.isToday ? '今日' : dayInfo.day.date() }}
            </div>
            <div class="bottom">
              <template v-if="!dayInfo.isFuture">
                {{ dayInfo.isToday ? '可打卡' : '未打卡' }}
              </template>
            </div>
          </template>
        </template>
      </div>
      <!-- </div> -->
    </div>

    <div class="calendar-line" />

    <CommonBtn v-if="!isTodaySigned" class="calendar-btn" @click="signIn">
      <LinearText text="立即打卡" type="brown" />
    </CommonBtn>
    <CommonBtn v-else class="calendar-btn gray">
      <LinearText text="今日已打卡" type="gray" />
    </CommonBtn>
  </div>
</template>

<style lang="scss" scoped>
.calendar {
  width: 620px;
  border-radius: 10px;
  background: white;
  padding: 0 26px;
  box-sizing: border-box;
  overflow: hidden;
  margin: auto;
}

.calendar-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.calendar-weekdays {
  height: 78px;
  line-height: 78px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-size: 20px;
  color: #a6abbc;

  .weekday {
    width: 64px;
    padding: 10px 0;
  }
}

.calendar-days {
  display: flex;
  flex-wrap: wrap;
}

.calendar-day {
  width: 64px;
  height: 64px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s ease;
  position: relative;
  margin-right: 20px;
  margin-bottom: 26px;
  background-color: #f7f8fa;

  &:nth-child(7n) {
    margin-right: 0;
  }

  &.empty {
    background: transparent;
  }

  &.future {
    color: #ccc;
    cursor: not-allowed;
    background-color: unset;

    .top {
      color: #c1c1c1;
    }
  }

  &.today {
    background: #4a58e3;

    .top {
      color: #ffffff;
    }

    .bottom {
      color: #b4bbff;
    }
  }

  &.signed {
    background: #59c496;
  }

  .top {
    font-size: 22px;
    height: 22px;
    line-height: 22px;
    color: #191b26;
    margin-bottom: 8px;
    margin-top: 5px;
  }

  .bottom {
    font-size: 12px;
    height: 14px;
    color: #ec652b;
  }

  .signTop {
    height: 22px;
    margin-bottom: 8px;
    padding-top: 3px;
    margin-top: 5px;
    .icon {
      width: 17px;
      height: 13px;
      margin: auto;
      background: url('../assets/icon/icon-check.png') no-repeat center / 100%;
    }
  }

  .signBottom {
    display: flex;
    justify-content: center;
    font-size: 15px;
    color: #eaff76;
    .icon {
      width: 16px;
      height: 16px;
      margin-right: 2px;
      background: url('../assets/icon/icon-integral.png') no-repeat center / 100%;
    }
  }
}

.calendar-line {
  width: 572px;
  height: 2px;
  margin: 0 auto 28px;
  background-color: #ebedf2;
}

.calendar-btn {
  width: 426px;
  height: 74px;
  margin: auto;
  display: block;
  margin-bottom: 38px;
  font-size: 30px;
  font-weight: bold;
  background: url('../assets/btn/btn-enable.png') no-repeat center / 100%;

  &.gray {
    background: url('../assets/btn/btn-disabled.png') no-repeat center / 100%;
  }
}
</style>
