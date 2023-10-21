import { usePermissionStore } from "@/store/modules/permission"
import { intersection } from 'lodash-es'
import { isArray } from '@/utils/is'


export function usePermission() {
    const permissionStore = usePermissionStore()

    function hasPermission(value?: string[] | string) {
        if (!value) {
            return true
        }
        const allCodeList = permissionStore.getPermCodeList as string[]
        if (!isArray(value)) {
            return allCodeList.includes(value)
        }
        return !!(intersection(value, allCodeList) as string[]).length
    }
    return {
        hasPermission
    }
}