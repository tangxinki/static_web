import { defineStore } from 'pinia'
import type { AppState } from '#/store'
import { store } from '@/store'
export const useAppStore = defineStore({
    id: 'app',
    state: (): AppState => ({
        darkMode: 'light',
        // navbar title
        navTitle: ""
    }),
    getters: {
        getNavbarTitle(state) {
            return state.navTitle
        }
    },
    actions: {
        setNavbarTitle(title: string) {
            this.navTitle = title
        },
        clear() {
            this.navTitle = ''
        }
    }
})

export function useAppStoreWithOut() {
    return useAppStore(store);
}
