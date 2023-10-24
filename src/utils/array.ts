import { treeOptions } from './types'


/**
 * @description 求数组交集
 * @param {any} a:any[]
 * @param {any} b:any[]
 * @param {any} k:string|number
 * @returns {any}
 */
export function intersection(a: any[], b: any[], k: string | number): any[] {
    return a.filter(t => (k ? b.map(i => i[k]).includes(t[k]) : b.includes(t)))
}


export function findTreeId(list: Recordable[], id: string | number, options?: treeOptions) {
    options = { childrenName: options?.childrenName || 'children', targetKey: options?.targetKey || 'id' }
    const processTree = (list: Recordable[], id: string | number): Recordable | null => {
        for (const item of list) {
            if (item[options!.targetKey] === id) return item
            if (item[options!.childrenName] && item[options!.childrenName].length) {
                const res = processTree(item[options!.childrenName], id)
                if (res) return res
            }
        }
        return null
    }
    return processTree(list, id)
}
