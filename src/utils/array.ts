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

let list = [
    {
        id: '1',
        children: [{ id: '1.1' }, { id: '1.2' }, { id: '1.3' }, { id: '1.4' }]
    },
    {
        id: '2',
        children: [{ id: '2.1' }, { id: '2.2' }, { id: '2.3' }, { id: '2.4' }]
    },
    {
        id: '3',
        children: [{ id: '3.1' }, { id: '3.2' }, { id: '3.3' }, { id: '3.4' }]
    }
]

const a = findTreeId(list, '3.2')
console.log('💨💨💨 ~ a:', a)
