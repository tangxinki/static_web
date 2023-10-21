<template>
    <!-- <transition mode="out-in" appear name="'fade-slide"> -->
    <div>
        <van-nav-bar :title="title" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <div class="app-page">
            <RouterView />
        </div>
    </div>
    <!-- </transition> -->
</template>

<script setup lang="ts">
// TODO: 添加公用css 样式变量等；

import { computed } from "vue";
import { useAppStore } from '@/store/modules/app'
const route = useRoute()
const appStore = useAppStore()
const title = computed(() => {
    return appStore.getNavbarTitle || route.meta.title
})

const onClickLeft = () => history.back()

</script>

<style lang="scss" scoped></style>