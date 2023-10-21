import type { AppRouteRecordRaw } from '@/router/types'

// 404 on a page
const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
    path: '/:path(.*)*',
    name: 'PageNotFound',
    component: () => import('@/views/system/exception/Exception.vue'),
    meta: {
        title: 'ErrorPage',
    },
};


export default PAGE_NOT_FOUND_ROUTE