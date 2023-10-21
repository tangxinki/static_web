import { defineStore } from 'pinia'
import type { UserInfo } from '#/store'
import { store } from '@/store'
import { getToken } from '@/utils/auth'
interface UserState {
    userInfo: Nullable<UserInfo>;
    token?: string;
    roleList?: string[];
}

export const useAppStore = defineStore({
    id: 'app-user',
    persist: true,
    state: (): UserState => ({
        userInfo: null,
        token: undefined,
        roleList: []
    }),
    getters: {
        getToken(state): string {
            return state.token || getToken()
        }
    },
    actions: {

    }
})

export function useUserStoreWithOut() {
    return useAppStore(store);
}
