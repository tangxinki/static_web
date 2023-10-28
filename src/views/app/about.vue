<template>
    <div>
        <div v-show="islock" class=" p-6">
            <van-button type="success" @click="showTop = true">{{ dateVal }}</van-button>
            <div>{{ state.month }}月共打卡{{ state.thisMonthData }}次，相比上个月{{ state.reduce > 0 ? '多' : '少' }}了{{
                Math.abs(state.reduce) }}次
            </div>
            <div>
                <p>年度数据：</p>
                <p>{{ state.year }}年共打卡{{ state.thisYearLen }}次，打卡最多的月份是{{ state.maxMonth }}月，{{ state.maxMonthTimes
                }}次，最少的月份是{{ state.minMonth }}月，{{ state.minMonthTimes }}次。</p>
                <p>最常打卡的时间是在{{ state.alawaysHour }}点</p>
                <p>去年共打卡{{ state.prevYearLen }}次，今年相比去年增幅{{ state.rate }}%</p>
            </div>
            <div class="chart w-[90vw] h-[50vh]"></div>
        </div>
        <van-popup v-model:show="showTop" position="bottom" :style="{ height: '37%' }">
            <van-date-picker @cancel="showTop = false" @confirm="confirm" v-model="currentDate" title="选择年月"
                :min-date="new Date(2023, 10, 1)" :columns-type="['year', 'month']" />
        </van-popup>
    </div>
</template>

<script setup>
import { useStatistics } from './about'
const { state, bootstrap, islock, currentDate, confirm, dateVal, showTop } = useStatistics()
console.log('💨💨💨 ~ islock:', islock)
onMounted(bootstrap)
</script>