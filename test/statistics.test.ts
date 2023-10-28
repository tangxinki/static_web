import { expect, it, describe } from 'vitest'
import { useStatistics } from '../src/views/app/about'
describe('statistics test', () => {
    it('test state property', () => {
        const { state, statistics } = useStatistics()
        statistics('2023-10-28')

        expect(state.year).toBe(2023)
    })
})