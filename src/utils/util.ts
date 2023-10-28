import type { BlobFile } from '#/utils'
import { isObject } from './is'
// import { getDicts } from '@/api/modules/common'


/**
 * @description 是否为空
 */
export const isEmpty = (value: unknown) => {
    return value == null && typeof value == 'undefined'
}

/**
 * @description 对象格式化为Query语法
 * @param { Object } params
 * @return {string} Query语法
 */
export function objectToQuery(params: Record<string, any>): string {
    let query = ''
    for (const props of Object.keys(params)) {
        const value = params[props]
        const part = encodeURIComponent(props) + '='
        if (!isEmpty(value)) {
            console.log(encodeURIComponent(props), isObject(value))
            if (isObject(value)) {
                for (const key of Object.keys(value)) {
                    if (!isEmpty(value[key])) {
                        const params = props + '[' + key + ']'
                        const subPart = encodeURIComponent(params) + '='
                        query += subPart + encodeURIComponent(value[key]) + '&'
                    }
                }
            } else {
                query += part + encodeURIComponent(value) + '&'
            }
        }
    }
    return query.slice(0, -1)
}

/**
 * @description 格式化输出价格
 * @param  { string } price 价格
 * @param  { string } take 小数点操作
 * @param  { string } prec 小数位补
 */
export function formatPrice({ price, take = 'all', prec = undefined }: any) {
    let [integer, decimals = ''] = (price + '').split('.')

    // 小数位补
    if (prec !== undefined) {
        const LEN = decimals.length
        for (let i = prec - LEN; i > 0; --i) decimals += '0'
        decimals = decimals.substr(0, prec)
    }

    switch (take) {
        case 'int':
            return integer
        case 'dec':
            return decimals
        case 'all':
            return integer + '.' + decimals
    }
}

/**
 * @description 组合异步任务
 * @param  { string } task 异步任务
 */

export function series(...task: Array<(_arg: any) => any>) {
    return function (): Promise<any> {
        return new Promise((resolve, reject) => {
            const iteratorTask = task.values()
            const next = (res?: any) => {
                const nextTask = iteratorTask.next()
                if (nextTask.done) {
                    resolve(res)
                } else {
                    Promise.resolve(nextTask.value(res)).then(next).catch(reject)
                }
            }
            next()
        })
    }
}

/**
 * @description 添加单位
 * @param {String | Number} value 值 100
 * @param {String} unit 单位 px em rem
 */
export const addUnit = (value: string | number, unit = 'rpx') => {
    return !Object.is(Number(value), NaN) ? `${value}${unit}` : value
}

/**
 * 自动适配不同的后端架构
 * 1. 例如 /act/oa/task ,在微服务架构保持不变,在单体架构编程 /admin/oa/task
 * 2. 特殊 /gen/xxx ,在微服务架构、单体架构编程 都需保持不变
 *
 * @param originUrl 原始路径
 */
export const adaptationUrl = (originUrl?: string) => {
    // 微服务架构 不做路径转换,为空不做路径转换
    const isMicro = import.meta.env.VITE_IS_MICRO
    if (isEmpty(isMicro) || isMicro === 'true') {
        return originUrl
    }

    // 验证码服务
    if (originUrl?.startsWith('/code/')) {
        return `/admin${originUrl}`
    }

    // 如果是代码生成服务，不做路径转换
    if (originUrl?.startsWith('/gen')) {
        return originUrl
    }
    // 转为 /admin 路由前缀的请求
    return `/admin/${originUrl?.split('/').splice(2).join('/')}`
}

/**
 * @description 节流
 * @param {any} func:(
 * @returns {any}
 */
export function throttle(func: () => void, delay: number): () => void {
    let timeout: NodeJS.Timeout | null;
    return (...args: any) => {
        // @ts-ignore 
        const context = this
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
                func.apply(context, args)
            }, delay)
        }
    };
}

/**
 * @description Merges two objects, giving the last one precedence
 */
export function merge(target: Recordable, source: Recordable): Recordable {
    if (typeof target !== 'object') {
        target = {}
    }
    if (Array.isArray(source)) {
        return source.slice()
    }
    Object.keys(source).forEach(property => {
        const sourceProperty = source[property]
        if (typeof sourceProperty === 'object' && sourceProperty !== null) {
            target[property] = merge(target[property], sourceProperty)
        } else {
            target[property] = sourceProperty
        }
    })
    return target
}



/**
 * @description 对象深拷贝
 * @param {any} source:Recordable
 * @returns {any}
 */
export function deepClone(source: Recordable) {
    if (!source && typeof source !== "object") {
        throw new Error("error arguments deepClone")
    }
    const targetObj: Recordable = source.constructor === Array ? [] : {}
    Object.keys(source).forEach((keys) => {
        if (source[keys] && typeof source[keys] === "object") {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    });
    return targetObj
}


/**
 * @description 判断url是否为绝对路径
 */
export function posUrl(url: string) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
}


export function base64toFile(dataurl: string, imgName: string) {
    let arr = dataurl.split(','),
        mine = arr[0].match(/:(.*?);/)![1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    const blobs: BlobFile = new Blob([u8arr], { type: mine })
    blobs.lastModifiedDate = new Date()
    blobs.name = imgName
    return blobs
}

/**
 * @description 数组参数处理
 */
export function nestParmas(originObject: Recordable, fieldArray: string[]) {
    return fieldArray.reduce((prev, next) => (prev[next] = originObject[next], prev), {} as Recordable)
}

/**
 * @description 求数组交集
 */
export function intersection(a: any[], b: any[], k: string) {
    return a.filter(t => (k ? b.map(i => i[k]).includes(t[k]) : b.includes(t)))
}

/**
 * 获取文件后缀名
 */
export const getSuffix = (filename: string) => {
    if (!filename) return ""
    if (filename.indexOf(".") == -1) return ""
    const fileExtension = filename.substring(filename.lastIndexOf(".") + 1)
    return fileExtension
}


// 获取数据字典，根据字典类型， 传入数组[], 唯一也传入数组类型
// 例如： ['gender', 'job_type']
export function httpGetDicts(types: string[]) {
    if (!types.length) {
        console.error('请传入字典类型')
        return
    }
    const dicts = ergodicData(types);
    return new Promise((resolve, reject) => {
        Promise.all(dicts.map(async item => await item.value(item.key)))
            .then((res) => {
                let sourceDic = {}
                for (let i = 0; i < res.length; i++) {
                    const item = res[i]
                    sourceDic[types[i]] = item.data
                }
                resolve(sourceDic)
            })
            .catch(error => {
                reject(error)
            })
    });
}

function ergodicData(types: string[]) {
    let dicts: { key: string, value: typeof getDicts }[] = []
    for (let i = 0; i < types.length; i++) {
        const item = types[i]
        let dic = {
            key: item,
            value: getDicts
        };
        dicts.push(dic)
    }
    return dicts
}


