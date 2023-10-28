import { defineConfig } from 'vitest/config'
import { resolve } from 'path'
export default defineConfig({
    test: {
        include: ['./test/*'],
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    plugins: [

    ]
})