import { Ref, ref } from 'vue'

interface AutoRequestOptions {
    loading?: boolean;
    onSuccess: (data: any) => void;
}
type ReqestApi<T, K extends any[]> = (...parmas: K) => Promise<T>

type AutoRequestResult<T, K extends Array<any>> = {
    loading: Ref<boolean>
    run: ReqestApi<T, K>
}

export function useLoading<T, K extends any[]>(fun: ReqestApi<T, K>, options?: AutoRequestOptions): AutoRequestResult<T, K> {
    const { loading = false, onSuccess } = options || { loading: false }
    const requestLoading = ref(loading)

    const run: ReqestApi<T, K> = (...params) => {
        requestLoading.value = true
        return fun(...params)
            .then(res => {
                onSuccess?.(res)
                return res
            })
            .finally(() => {
                requestLoading.value = false;
            });
    }
    return { loading: requestLoading, run }
}