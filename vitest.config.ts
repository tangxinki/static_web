import { defineConfig } from 'vitest/config'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
export default defineConfig({
    test: {
        environment: 'happy-dom',
        include: ['./test/*'],
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    plugins: [
        vue(),
        // auto import vue、vueuse
        // AutoImport({
        //     imports: ['vue', '@vueuse/core'],
        //     vueTemplate: true,
        //     dts: true, // not matter
        // }),
    ]
})