type Key = keyof typeof mapData
const mapData = {
    ExamineMap: {
        0: '已通过',
        1: '未通过',
    },
    Audit: {
        0: '拒绝',
        1: '同意',
    },
    Auditx: {
        0: '拒绝',
        1: '同意',
    },
} as const

/**
 * 获取字典的值
 * @param {any} key:T
 * @param {any} subKey:number
 * @returns {any}
 */
export function getValue<T extends Key>(key: T, subKey: number): string {
    return mapData[key][subKey] ?? ''
}

/**
 * 获取字典key的数组   [{label:'已通过',value:0}]
 * @param {T} key:T
 */
export function enumsMap<T extends Key>(key: T) {
    const mapOject = mapData[key] || {}
    return Object.entries(mapOject).map(([value, label]) => ({ label, value: +value }));
}