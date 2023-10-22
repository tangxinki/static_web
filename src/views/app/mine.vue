<template>
  <div>
    <van-field v-show="!islock" class=" mt-2" v-model="value" border type="text" label="密码" @blur="blur" />
    <div v-show="islock" class="fux relative">
      <el-calendar class="caler" v-model="dateVal" ref="calendar">
        <template #header="{ date }">

          <span @click="showTop = true">{{ date }}</span>
          <el-button-group>
            <el-button size="small" @click="selectDate('prev-year')">
              上一年
            </el-button>
            <el-button size="small" @click="selectDate('prev-month')">
              上一月
            </el-button>
            <el-button size="small" @click="selectDate('today')">今天</el-button>
            <el-button size="small" @click="selectDate('next-month')">
              下月
            </el-button>
          </el-button-group>
        </template>
        <template #date-cell="{ data }">
          <div>
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ +data.day.split('-').at(-1) }}
            </p>
            <span>{{ today === data.day ? '今天' : "" }}</span>
            <span v-show="dateStock[data.day]">🟢</span>
          </div>
        </template>
      </el-calendar>
      <van-button type="success" class="btn" v-show="isShowBtn" @click="handleClockIn">
        {{ formateDateVal }} 冲了打卡
      </van-button>
    </div>
    <van-popup v-model:show="showTop" position="bottom" :style="{ height: '37%' }">
      <van-date-picker @cancel="showTop = false" @confirm="confirm" v-model="currentDate" title="选择年月"
        :min-date="new Date(2023, 10, 1)" :columns-type="['year', 'month']" />
    </van-popup>

  </div>
</template>
<script setup>
import { formatDate } from '@/utils';
import { defaultWindow, useLocalStorage } from '@vueuse/core'
import { dateEquals } from 'element-plus';
import { showToast } from 'vant';
// import {ElButton} from 'element-plus'
import { ref } from 'vue'
import { func } from 'vue-types';
// import { Icon } from '@/components'
const islock = useLocalStorage('islock', false)
const dateStock = useLocalStorage('dateStock', {})
const show = ref(true)
const value = ref('')
const currentDate = ref(['2023', '02']);
const dateVal = ref(new Date())
const calendar = ref()
const showTop = ref(false)
const today = formatDate(new Date(), 'YYYY-mm-dd')
const [year, month] = today.split('-')
currentDate.value = [year, month]
const nowDate = new Date().getDate(), nowMonth = new Date().getMonth() + 1
const formateDateVal = computed(() => formatDate(dateVal.value, 'YYYY-mm-dd'))
const isShowBtn = computed(() => {
  const month = new Date(dateVal.value).getMonth() + 1;
  const date = new Date(dateVal.value).getDate();
  return (month < nowMonth || (month === nowMonth && date <= nowDate)) && !dateStock.value[formateDateVal.value]
})
console.log('💨💨💨 ~ today:', today)
function confirm(e) {
  dateVal.value = new Date(e.selectedValues.join('-') + '-01')
  showTop.value = false
}
function selectDate(val) {
  if (!calendar.value) return
  calendar.value.selectDate(val)
}

function handleClockIn() {
  const date = formatDate(new Date(), 'HH:MM:SS')
  showToast('打卡成功！')
  dateStock.value[formateDateVal.value] = date
}

function formatter(day) {
  const month = day.date.getMonth() + 1;
  const date = day.date.getDate();
  const nowDate = new Date().getDate(), nowMonth = new Date().getMonth() + 1
  if (month === 2) {
    if (date === 1) {
      day.topInfo = '劳动节';
    } else if (date === nowDate) {
      day.text = '今天';
    }
  }
  const isMoreThanToday = month > nowMonth || (month === nowMonth && date > nowDate)
  if (isMoreThanToday)
    day.type = 'disabled'
  else
    day.type = undefined


  return day;
}

function blur(e) {
  islock.value = e.target.value === '0419'
}
</script>
<style lang="scss" scoped>
:deep(.caler) {
  .current {
    height: 48px;
  }

  height:48px;
}

.c-draggable-likewxfloat {
  position: absolute;
  // bottom: 200px;
}

.btn {
  position: absolute;
  bottom: 80px;
  left: 30%;
}

.fux {
  height: 100vh;
}

.text {
  color: aqua;
  border-radius: 20px;
}
</style>

<style>
.current {
  height: 48px !important;
}
</style>