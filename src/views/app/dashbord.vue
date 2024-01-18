<template>
    <div class="fan"></div>
</template>
  
<script>
export default {
    name: 'YearSelector',
    data() {
        return {
            years: [],
            selectedYear: null,
            indicatorStyle: {}
        };
    },
    mounted() {
        this.generateYears(); // 生成年份范围
        this.selectedYear = this.years[0]; // 默认选择第一个年份
        this.updateIndicatorStyle(); // 初始化指示器位置
    },
    methods: {
        generateYears() {
            const currentYear = new Date().getFullYear();
            this.years = Array.from({ length: 10 }, (_, index) => currentYear - index);
        },
        selectYear(year) {
            this.selectedYear = year;
            this.updateIndicatorStyle();
        },
        updateIndicatorStyle() {
            const index = this.years.indexOf(this.selectedYear);
            const totalYears = this.years.length;

            // 计算角度对应的坐标位置
            const angle = (index / (totalYears - 1)) * Math.PI - Math.PI / 2;
            const radius = 50; // 半径为50px
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            this.indicatorStyle = {
                transform: `translate(${x}px, ${y}px)`
            };
        }
    }
};
</script>
  
<style>
.fan {
    width: 200px;
    height: 200px;
    background-color: blue;
    border-radius: 50% 50% 0 0;
    margin-top: 50px;
}
</style>