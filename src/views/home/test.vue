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

    </div>
</template>
<script setup>
import { getCurrentInstance } from 'vue'
const state = reactive({
    fileList: []
})

const { proxy } = getCurrentInstance()

function beforeRead() {
    return true
}

function bindEvent() {
    nextTick(() => {
        const init = (list) => {
            list.forEach((el, i) => {
                el.style.zIndex = 10
                el.$limitLeftmin = i % 3 * -98
                el.$limitLeftmax = (2 - i % 3) * 98
                el.$limitTopmin = (i / 3 | 0) * -100
            })
        }
        let startX, startY, xx = 0, yy = 0, endX, endY, isMove = false, handleIdx
        const nodeList = document.querySelectorAll('.van-uploader__preview')
        init(nodeList)
        const pageEle = document.querySelector('.page')
        const oWrap = document.querySelector(".van-uploader__wrapper");
        const screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        nodeList.forEach((el, i) => {
            console.log(el.$limitTopmin);
            el.addEventListener('touchstart', function (e) {
                e.preventDefault()
                handleIdx = Array.from(nodeList).findIndex(i => i === el)
                console.log(e);
                // console.log('💨💨💨 ~ e:', e.touches[0].pageX, e.touches[0].pageY)
                startX = e.touches[0].clientX
                startY = e.touches[0].clientY
            })
            el.addEventListener('touchmove', e => {
                console.log('touchmove........');
                isMove = true
                el.style.zIndex = 20
                // console.log('e.touches[0].pageX', e.touches[0].pageX);
                let offsetX = e.touches[0].pageX - startX,
                    offsetY = e.touches[0].pageY - startY;
                // console.log(offsetX, offsetY);
                let x = offsetX,
                    y = offsetY;
                if (x < el.$limitLeftmin) x = el.$limitLeftmin
                if (y < el.$limitTopmin) y = el.$limitTopmin
                if (x > el.$limitLeftmax) x = el.$limitLeftmax
                if (y > screenHeight - 100 - 46) y = screenHeight - 100 - 46 // 46为tabbar的高度
                el.style.left = x + 'px'
                el.style.top = y + 'px'
                endX = x
                endY = y
            })

            el.addEventListener("touchend", e => {
                console.log('touchend');
                el.style.zIndex = 10
                if (!isMove) return
                isMove = false
                var touch = e.changedTouches[0];
                // console.log('💨💨💨 ~ endY:', endY)
                var offsetY = touch.clientY - el.getBoundingClientRect().top;
                const eleHeight = e.target.offsetHeight
                const realY = eleHeight - offsetY + touch.clientY
                console.log('💨💨💨 ~ endX:', endX)
                console.log('💨💨💨 ~ endY:', endY)
                if (realY < screenHeight - 50 && realY > pageEle.offsetHeight) {
                    console.log('oversdfasdf');
                    restore(el)
                    return
                }
                let index
                console.log(nodeList, nodeList);
                for (const idx in nodeList) {
                    const ele = nodeList[idx]
                    console.log('💨💨💨 ~ ele:', ele)
                    try {
                        const rect = ele.getBoundingClientRect()
                        if (touch.clientX >= rect.left && touch.clientX <= rect.right && touch.clientY >= rect.top && touch.clientY <= rect.bottom && handleIdx != idx) {
                            index = +idx
                            break
                        }
                    } catch (error) {
                        // restore(el)
                        el.style.left = 0 + 'px'
                        el.style.top = 0 + 'px'
                    }
                }
                console.log('index', index);
                console.log('handleIdx', handleIdx);
                if (index === handleIdx || index === undefined) {
                    restore(el)
                    return
                }
                if (handleIdx > index) {
                    oWrap.insertBefore(nodeList[handleIdx], nodeList[index])
                } else {
                    console.log(123123122312);
                    oWrap.insertBefore(nodeList[index], nodeList[handleIdx])
                }
                nodeList[handleIdx].style.top = '0px'
                nodeList[handleIdx].style.left = '0px'
                bindEvent()

            });
        })

        function restore(el) {
            const time = 20
            let stepX = endX / time | 0 ? endX / time | 0 : 10, stepY = endY / time | 0 ? endY / time | 0 : 10
            const timmer = setInterval(() => {
                console.log('timmer');
                if (endX === 0 && endY === 0) clearInterval(timmer)
                if (endX > 0) {
                    endX = endX - stepX > 0 ? endX - stepX : 0
                }
                if (endX < 0) {
                    endX = endX + Math.abs(stepX) < 0 ? endX + Math.abs(stepX) : 0
                }
                // endX = endX - stepX > 0 ? endX - stepX : 0
                endY = endY - stepY > 0 ? endY - stepY : 0
                el.style.left = endX + 'px'
                el.style.top = endY + 'px'
            }, 20)
        }

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