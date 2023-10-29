import Mine from '@/views/app/mine.vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

const dom = mount(Mine)
describe('mine test', () => {
    it('function test', () => {
        const fn = dom.vm.formatter
        expect(fn({ date: new Date('2023-03-29') }).text).toBe('今天')
        expect(fn({ date: new Date('2023-03-01') }).topInfo).toBe('劳动节')
        expect(fn({ date: new Date('2023-11-29') }).type).toBe('disabled')
        expect(fn({ date: new Date('2023-10-30') }).type).toBe('disabled')
        expect(fn({ date: new Date('2023-09-30') }).type).toBe(undefined)

        // expect(dom.exists()).toBeTruthy()
    })
})