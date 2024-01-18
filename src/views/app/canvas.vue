<template>
    <div style="padding-top: 100px;">
        <canvas ref="el" width="400" height="400"></canvas>
    </div>
</template>

<script setup>
import { initCanvas } from "@/utils/canvas";
const el = ref(null)
console.log('💨💨💨 ~ el:', el)

onMounted(() => {
    const { ctx } = initCanvas(el.value)
    const startX = 0;  // 起始点 x 坐标
    const endX = 400;  // 终点 x 坐标
    const amplitude = 50;  // 正弦函数的振幅
    const frequency = 0.02;  // 正弦函数的频率
    ctx.beginPath();
    ctx.moveTo(startX, 400 / 2);  // 将起始点移动到画布的中心

    for (let x = startX; x <= endX; x++) {
        const y = 400 / 2 + amplitude * Math.sin(frequency * x);
        ctx.lineTo(x, y);
    }

    ctx.stroke();  // 绘制路径
})
</script>