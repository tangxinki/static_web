<template>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
    </van-pull-refresh>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router'
// import { useTitle } from '@/hooks/web/useTitle'
import { useAppStore } from '@/store/modules/app'

export default {
    setup() {
        const route = useRoute()
        const appStore = useAppStore()

        setTimeout(() => {
            console.log(route.meta.title);
            // document.title = 'value'
            appStore.setNavbarTitle('xxx')
        }, 2000);

        const list = ref<any[]>([]);
        const loading = ref(false);
        const finished = ref(false);
        const refreshing = ref(false);

        const onLoad = () => {
            setTimeout(() => {
                console.log('onLoad');

                if (refreshing.value) {
                    list.value = [];
                    refreshing.value = false;
                }

                for (let i = 0; i < 10; i++) {
                    list.value.push(list.value.length + 1);
                }
                loading.value = false;

                if (list.value.length >= 40) {
                    finished.value = true;
                }
            }, 1000);
        };

        const onRefresh = () => {
            // 清空列表数据
            finished.value = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            loading.value = true;
            onLoad();
        };

        return {
            list,
            onLoad,
            loading,
            finished,
            onRefresh,
            refreshing,
        };
    },
};
</script>