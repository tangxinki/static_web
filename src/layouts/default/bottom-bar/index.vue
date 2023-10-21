<template>
    <van-tabbar v-model="active" @change="change">
        <van-tabbar-item v-for="item, i in tabList" :key="i" :name="item.name" :icon="item.icon">
            {{ item.label }}
        </van-tabbar-item>
    </van-tabbar>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { ref } from 'vue'
import { TabsType } from "./type";
const active = ref('home')
const router = useRouter()
const tabList = ref<Array<TabsType>>([
    { name: "home", icon: 'home-o', label: '首页' },
    { name: "goods", icon: 'search', label: '商品' },
    { name: "dynamic", icon: 'friends-o', label: '动态' },
    { name: "mine", icon: 'setting-o', label: '我的' }]
)
// watchEffect(() => {
//     console.log(route)
// })

watch(
    () => router.currentRoute.value,
    (newValue: RouteLocationNormalizedLoaded) => {
        if (newValue.path !== active.value && tabList.value.some(i => i.name === newValue.path)) {
            active.value = newValue.path.replace(/\//, '')
        }
    },
    { immediate: true }
)
function change(e: number | string) {
    router.push('/' + e)
}
</script>

<style lang="scss" scoped></style>