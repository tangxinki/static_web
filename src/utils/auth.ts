import { Local } from './storage'
import { TOKEN_KEY } from '@/enums/cacheEnum'


export function getToken() {
    return Local.get(TOKEN_KEY);
}


export function setToken(value: string) {
    return Local.set(TOKEN_KEY, value);
}

export function clearToken(key: string) {
    return Local.remove(key);
}