import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { basicRoutes } from './routes'

// app router
export const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
    routes: basicRoutes as unknown as RouteRecordRaw[],
    // strict: true,
    // scrollBehavior: () => ({ left: 0, top: 0 }),
});




// config router
export function setupRouter(app: App<Element>) {
    app.use(router);
}