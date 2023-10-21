import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types';
import PAGE_NOT_FOUND_ROUTE from './basic'

const modules = import.meta.glob('./modules/*.ts', { eager: true })
const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach(key => {
    const mod = (modules as Recordable)[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
})
export const RootRoute: AppRouteRecordRaw = {
    path: '/',
    name: 'Root',
    component: () => import('@/layouts/default/index.vue'),
    meta: {
        title: '首页',
        ignoreAuth: true
    },
    children: [
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/app/home.vue'),
            meta: {
                title: '首页',
                ignoreAuth: true
            },
        },
        {
            path: '/goods',
            name: 'Goods',
            component: () => import('@/views/app/goods.vue'),
            meta: {
                title: '商品',
                ignoreAuth: true
            },
        },
        {
            path: '/dynamic',
            name: 'Dynamic',
            component: () => import('@/views/app/about.vue'),
            meta: {
                title: '动态',
                ignoreAuth: true
            },
        },
        {
            path: '/mine',
            name: 'Mine',
            component: () => import('@/views/app/mine.vue'),
            meta: {
                title: '我的',
                ignoreAuth: true
            },
        },
    ]
};

export const LoginRoute: AppRouteRecordRaw = {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/system/login/Login.vue'),
    meta: {
        title: '登录',
    },
}


export const basicRoutes = [
    RootRoute,
    LoginRoute,
    PAGE_NOT_FOUND_ROUTE,
    ...routeModuleList
]

