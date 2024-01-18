import type { AppRouteRecordRaw } from '@/router/types'


const PAGE_MAIN_ROUTE: AppRouteRecordRaw = {
    path: '/main',
    name: 'main',
    component: () => import('@/layouts/home/index.vue'),
    meta: {
        title: '关于',
        ignoreAuth: true
    },
    children: [{
        path: '/main/detail',
        name: 'Detail',
        component: () => import('@/views/home/detail.vue'),
        meta: {
            title: '详情a',
            ignoreAuth: true
        },
    },
    {
        path: '/main/test',
        name: 'Detaile',
        component: () => import('@/views/home/test.vue'),
        meta: {
            title: '测试',
            ignoreAuth: true
        },
    },
    {
        path: '/main/canvas',
        name: 'canvas',
        component: () => import('@/views/app/canvas.vue'),
        meta: {
            title: '测试',
            ignoreAuth: true
        },
    },
    {
        path: '/main/testx',
        name: 'canvas',
        component: () => import('@/views/app/dashbord.vue'),
        meta: {
            title: '测试',
            ignoreAuth: true
        },
    },
    ]
};


export default PAGE_MAIN_ROUTE