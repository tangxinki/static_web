import { defineStore } from 'pinia'
import { store } from '@/store'

interface PermissionState {
    // 权限代码列表
    permCodeList: string[] | number[];
}
export const usePermissionStore = defineStore({
    id: 'permission',
    state: (): PermissionState => ({
        permCodeList: []
    }),
    getters: {
        getPermCodeList(state): string[] | number[] {
            return state.permCodeList;
        },
    },
    actions: {
        setPermCodeList(codeList: string[]) {
            this.permCodeList = codeList;
        },
    }
})

export function useAppStoreWithOut() {
    return usePermissionStore(store);
}
