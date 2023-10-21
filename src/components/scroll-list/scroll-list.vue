<template>
    <van-pull-refresh v-model="state.refreshing" :pull-distance="down.offset" :disabled="!down.use" @refresh="onRefresh">
        <van-list :offset="100" :immediate-check="true" :loading="state.loading" :finished="state.finished"
            :finished-text="finishedText" @load="onLoad">
            <slot></slot>
        </van-list>
    </van-pull-refresh>
    <div class="empty" v-show="state.noData">
        <van-image class="empty_img" width="250" height="250" src="/src/assets/images/mescroll-empty.png" />
    </div>
    <van-back-top :bottom="100" />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
interface ScrollProps {
    up?: {
        page: {
            num: number;
            size: number;
        };
        noMoreSize: number;
        noMoreText: string;
        emptyText: string;
    },
    down?: {
        use: boolean,
        offset: number
    }
}


const props = withDefaults(defineProps<ScrollProps>(), {
    up: () => ({
        page: {
            num: 1,
            size: 10
        },
        noMoreSize: 5,
        noMoreText: '没有更多了',
        emptyText: '暂无相关数据'
    }),
    down: () => ({
        use: true,
        offset: 50
    })
})

const emit = defineEmits(['up', 'down'])
const state = reactive({
    loading: false,
    noData: false,
    refreshing: false,
    dataLength: 0,
    finished: false,
    isFirst: true
})

const finishedText = computed(() => {
    return state.noData ? props.up.emptyText : (state.dataLength < props.up.noMoreSize ? '' : props.up.noMoreText)
})

onMounted(() => {
    // onRefresh()
})
function onLoad() {
    // if (!state.isFirst) state.loading = true
    state.loading = true
    state.isFirst = false
    emit('up', props.up.page)
}
function onRefresh() {
    init()
    emit('down', { ...props.up.page, isInit: true })
}

/**
 * @description 请求完成时调用
 * @param {any} dataSize:number 当前请求的数据条数
 * @param {any} totalPage:number 总条数
 */
function endByPage(dataSize: number, totalPage: number) {
    state.loading = false
    state.refreshing = false
    if (totalPage === 0) {
        state.noData = true
        state.finished = true
        return
    }
    props.up.page.num++
    state.dataLength += dataSize
    if (state.dataLength >= totalPage) {
        state.finished = true
    }
}

/**
 * @description 初始化
 */
function init() {
    state.dataLength = 0
    state.loading = false
    state.finished = false
    state.refreshing = true
    props.up.page.num = 1

}
defineExpose({
    endByPage,
})
</script>

<style lang="scss" scoped>
.empty {
    position: fixed;
    top: 25vh;
    left: 10vw;
    z-index: 10;
}
</style>