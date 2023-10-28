import { formatDate } from '../../utils';
import { useLocalStorage } from '@vueuse/core'
import { ref, reactive } from 'vue'
import * as echarts from 'echarts';

export function useStatistics() {
    const showTop = ref(false)
    const dateVal = ref(formatDate(new Date(), 'YYYY-mm'))
    const stock = useLocalStorage('dateStock', {})
    const currentDate = ref(['2023', '02']);
    const monthList = ref([])
    const chartDate = ref({})
    const islock = useLocalStorage('islock', false)
    const state = reactive({
        prevYearLen: 0,
        reduce: 0
    })

    const resData = {}, hourData = {}
    /**
     * @description 获取统计数据
     * @returns {any}
     */
    function getData() {
        Object.entries(stock.value).forEach(([date, time]) => {
            const [year, month, day] = date.split('-')
            const [hour] = time.split(':')
            if (!hourData[hour]) hourData[hour] = 1
            hourData[hour] = hourData[hour] ? hourData[hour] + 1 : 1
            if (!resData[year]) {
                resData[year] = [{ month, data: [{ day, time }] }]
            } else {
                const findMonthIdx = resData[year].findIndex(i => i.month === month)
                if (findMonthIdx === -1) {
                    resData[year].push({ month, data: [{ day, time }] })
                } else {
                    resData[year][findMonthIdx].data.push({ day, time })
                }
            }
        })
        Object.entries(resData).forEach(([year, data]) => {
            const res = new Array(12).fill(0).map((_, i) => {
                const a = data.find(k => +k.month === i + 1)
                return a ? a.data.length : 0
            })
            chartDate.value[year] = res
        })
    }
    function confirm(e) {
        const res = e.selectedValues.join('-')
        dateVal.value = res
        showTop.value = false
        statistics(res)
        renderChart()
    }
    function statistics(nowDate = formatDate(new Date(), 'YYYY-mm-dd')) {
        const year = new Date(nowDate).getFullYear()
        const month = new Date(nowDate).getMonth() + 1;
        const date = new Date(nowDate).getDate();
        state.year = year
        state.month = month
        // let thisMonthData
        const resDataObject = resData[year] || []
        const res = resDataObject.find(i => +i.month === month) || {}
        const thisMonthData = res.data?.length || 0
        const prevMonth = month - 1 === 0 ? '12' : month - 1
        const res2 = resDataObject.find(i => +i.month === prevMonth) || {}
        const prevMonthData = res2.data?.length || 0
        // 当月与上月差值
        state.reduce = thisMonthData - prevMonthData
        state.thisMonthData = thisMonthData
        state.prevMonthData = prevMonthData
        let thisYearLen = 0, maxMonthTimes = 0, maxMonth = 'None', minMonthTimes = 0, minMonth = 'None'
        resDataObject.forEach((item, i) => {
            thisYearLen += item.data.length
            if (item.data.length > maxMonthTimes) {
                maxMonthTimes = item.data.length
                maxMonth = item.month
            }
            if (i === 0) {
                minMonth = item.month
                minMonthTimes = item.data.length
            } else if (minMonthTimes > item.data.length) {
                minMonthTimes = item.data.length
                minMonth = item.month
            }

        })
        let prevYearLen = 0
        if (resData[year - 1]) {
            resData[year - 1].forEach(item => {
                prevYearLen += item.data.length
            })
            state.prevYearLen = prevYearLen
        }
        state.rate = prevYearLen === 0 ? '100' : Math.ceil((thisYearLen - prevYearLen) / prevYearLen * 100)
        // let alawaysHour
        const [alaways] = Object.entries(hourData)
            .map(([hour, times]) => ({ hour, times }))
            .sort((a, b) => b.times - a.times)
        state.alawaysHour = alaways ? alaways.hour : 'None'
        state.thisYearLen = thisYearLen
        state.maxMonth = maxMonth
        state.maxMonthTimes = maxMonthTimes
        state.minMonth = minMonth
        state.minMonthTimes = minMonthTimes
    }

    function renderChart() {
        const chartDom = document.querySelector('.chart');
        console.log('💨💨💨 ~ chartDom:', chartDom)
        const myChart = echarts.init(chartDom);
        const option = {
            xAxis: {
                type: 'category',
                data: monthList.value
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: chartDate.value[currentDate.value[0]] || [],
                    type: 'bar',
                    label: {
                        show: true,
                        position: 'top',
                        formatter: '{c}', // 显示数据值
                    },
                }
            ]
        };
        option && myChart.setOption(option);
        window.addEventListener('resize', myChart.resize)
    }

    function bootstrap() {
        if (!islock.value) return
        getData()
        statistics()
        monthList.value = new Array(12).fill(0).map((_, i) => i + 1 + '月')
        renderChart()
    }

    return { bootstrap, confirm, currentDate, islock, state, showTop, dateVal, statistics }
}