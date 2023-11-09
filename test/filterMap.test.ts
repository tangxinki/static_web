import { register } from '../src/utils/array'
register()
import { describe, it, expect } from 'vitest'
describe('array test', () => {
    it('test state property', () => {
        const arr = [{ age: 7 }, { age: 2 }, { age: 3 }, { age: 5 }, { age: 20 }]
        const res = arr.filterMap((item) => item.age > 10, item => item.age + '岁')
        expect(res).toEqual(['20岁'])
    })
})