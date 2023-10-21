<template>
    <div class="home-con">
        <scroll-list @up="loadData" @down="downCallback" ref="scrollRef">
            <div class="wapper">
                <div class="aa" v-for="item, i in state.rowData" :key="i">{{ item.id }}</div>
            </div>
        </scroll-list>
    </div>
</template>

<script setup lang="ts">
import { ScrollList } from '@/components/scroll-list'
const scrollRef = ref<InstanceType<typeof ScrollList>>()
const state = reactive<{ rowData: any[] }>({
    rowData: []
})
let a = false
function loadData(ops: any) {
    console.log(ops);
    setTimeout(() => {
        if (ops.isInit) {
            const res = new Array(10).fill(0).map((_, i) => ({ id: i + 1 }))
            state.rowData = res
        } else {
            const res = new Array(10).fill(0).map((_, i) => ({ id: state.rowData.length + i + 1 }))
            state.rowData = state.rowData.concat(res)
        }
        scrollRef.value?.endByPage(10, 20)
        a = true
    }, a ? 2000 : 2000);
}

function downCallback(ops: any) {
    loadData(ops)
}

// import { useRouter } from "vue-router"
// const router = useRouter()
// function handleOk() {
//     router.push('/main/detail')
// }
</script>

<style>
.home-con {
    padding-bottom: 100px;
}

.aa {
    width: 100vw;
    height: 50px;
    border: 1px solid #ccc;
}

.wapper {
    min-height: 40vh;
    /* height: calc(100vh - 400px); */
}
</style>