import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import Components from 'unplugin-vue-components/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite';
import viteCompression from 'vite-plugin-compression';
import topLevelAwait from 'vite-plugin-top-level-await'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { createStyleImportPlugin, VxeTableResolve } from 'vite-plugin-style-import';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const lifecycle = process.env.npm_lifecycle_event
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
    const { VITE_LEGACY } = viteEnv
    const vitePlugins: (PluginOption | PluginOption[])[] = [
        vue(), // Vue 插件
        vueJsx(),
        Components({
            resolvers: [VantResolver(), ElementPlusResolver()],
        }),
        // svgBuilder('./src/assets/icons/'), // 将 SVG 文件转换成 Vue 组件
        vueSetupExtend(), // setup语法糖增强插件
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: ['vue', 'vue-router', 'pinia'], // 自动导入的依赖库数组
            dts: './auto-imports.d.ts', // 自动导入类型定义文件路径
        }),
        createStyleImportPlugin({
            resolves: [VxeTableResolve()], // 配置vxetable 按需加载
        }),
        topLevelAwait({
            promiseExportName: '__tla', // TLA Promise 变量名
            promiseImportName: (i) => `__tla_${i}`, // TLA Promise 导入名
        }),
        viteCompression({
            deleteOriginFile: false, // 压缩后删除原来的文件
        }),
        lifecycle === 'report' ? visualizer({ open: true, brotliSize: true, filename: 'report.html' }) : null,
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            svgoOptions: isBuild,
            // default
            symbolId: 'icon-[dir]-[name]',
        })
    ]
    VITE_LEGACY && isBuild && vitePlugins.push(legacy())
    return vitePlugins
} 