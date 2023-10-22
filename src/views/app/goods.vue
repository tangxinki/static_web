<template>
    <div class="page">
        <van-uploader :before-read="beforeRead" :after-read="afterRead" :max-count="9" :deletable="false" preview-size="90"
            v-model="state.fileList" multiple>
            <template #preview-cover="{ file }">
                <div v-show="true" class="preview-cover van-ellipsis" @click="handleFile(file)">
                    <div class="mask">
                        <!-- <img class="icon_play" src="@/static/images/play.png" alt=""> -->
                    </div>
                </div>
            </template>
        </van-uploader>
        <van-button type="primary" :loading="false">主要按钮</van-button>
    </div>
</template>
<script setup>
// import { useLoading } from '@/hooks/core/useLoading'
import { reactive, nextTick } from 'vue'
const state = reactive({
    fileList: []
})
// const [] = useLoading()

function beforeRead() {
    return true
}

function bindEvent() {
    nextTick(() => {
        let startX, startY, xx = 0, yy = 0, endX, endY, isMove = false
        const nodeList = document.querySelectorAll('.van-uploader__preview')
        const pageEle = document.querySelector('.page')
        console.log('💨💨💨 ~ pageEle:', pageEle.offsetHeight)
        nodeList.forEach((el, i) => {
            el.$limitLeftmin = i % 3 * -98
            el.$limitLeftmax = i % 3 * -98
            el.$limitTopmin = (i / 4 | 0) * -100
            console.log(el.$limitTopmin);
            el.addEventListener('touchstart', function (e) {
                console.log(e);
                console.log('💨💨💨 ~ e:', e.touches[0].pageX, e.touches[0].pageY)
                startX = e.touches[0].clientX
                startY = e.touches[0].clientY
            })
            el.addEventListener('touchmove', e => {
                isMove = true
                // console.log('e.touches[0].pageX', e.touches[0].pageX);
                let offsetX = e.touches[0].pageX - startX,
                    offsetY = e.touches[0].pageY - startY;
                // console.log(offsetX, offsetY);
                let x = offsetX,
                    y = offsetY;
                if (x < el.$limitLeftmin) x = el.$limitLeftmin
                if (y < el.$limitTopmin) y = el.$limitTopmin

                el.style.left = x + 'px'
                el.style.top = y + 'px'
                endX = x
                endY = y
            })

            el.addEventListener("touchend", e => {
                console.log('touchend');
                if (!isMove) return
                isMove = false
                var touch = e.changedTouches[0];
                console.log('💨💨💨 ~ touch:', e)
                var offsetY = touch.clientY - el.getBoundingClientRect().top;
                const eleHeight = e.target.offsetHeight
                const realY = eleHeight - offsetY + touch.clientY
                var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                if (realY > screenHeight - 50 || realY < pageEle.offsetHeight) return
                const time = 20
                let stepX = endX / time | 0 ? endX / time | 0 : 10, stepY = endY / time | 0 ? endY / time | 0 : 10
                console.log('💨💨💨 ~ endX:', endX)
                console.log('💨💨💨 ~ stepX:', stepX)
                // return
                const timmer = setInterval(() => {
                    console.log('timmer');
                    if (endX === 0 && endY === 0) clearInterval(timmer)
                    if (endX > 0) {
                        endX = endX - stepX > 0 ? endX - stepX : 0
                    }
                    if (endX < 0) {
                        endX = endX - stepX < 0 ? endX - stepX : 0
                    }
                    // endX = endX - stepX > 0 ? endX - stepX : 0
                    endY = endY - stepY > 0 ? endY - stepY : 0
                    el.style.left = endX + 'px'
                    el.style.top = endY + 'px'
                }, 20)
            });
        })

    })
}

function afterRead() {
    bindEvent()
}
</script>

<style lang="scss" scoped>
.page {
    padding: 20px;
}
</style>