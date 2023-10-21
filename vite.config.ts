import { resolve } from 'path';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import { createVitePlugins } from './build/vite/plugin'
import { wrapperEnv } from './build/utils';
import { OUTPUT_DIR } from './build/constant'
// TODO: add Icons
// @ts-ignore
// import { svgBuilder } from '/@/components/IconSelector/index';

const lifecycle = process.env.npm_lifecycle_event
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
const viteConfig = defineConfig(({ mode, command }: ConfigEnv) => {
  const root = process.cwd();
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env);
  const isBuild = command === 'build';
  return {
    plugins: createVitePlugins(viteEnv, isBuild),
    root: process.cwd(), // 项目根目录
    resolve: {
      alias: [
        // {
        //   find: 'vue-i18n',
        //   replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        // },
        // /@/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: pathResolve('types') + '/',
        },
      ]
    }, // 路径别名配置
    base: command === 'serve' ? './' : env.VITE_PUBLIC_PATH,
    // optimizeDeps: {
    //   include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en'],
    // },
    server: {
      host: '0.0.0.0', // 服务器地址
      port: env.VITE_PORT as unknown as number, // 服务器端口号
      open: env.VITE_OPEN === 'true', // 是否自动打开浏览器
      hmr: true, // 启用热更新
      proxy: {
        '/api': {
          target: env.VITE_ADMIN_PROXY_PATH, // 目标服务器地址
          ws: true, // 是否启用 WebSocket
          changeOrigin: true, // 是否修改请求头中的 Origin 字段
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    esbuild: {
      pure: ['console.log', 'debugger']
    },
    build: {
      outDir: OUTPUT_DIR, // 打包输出目录
      chunkSizeWarningLimit: 1500, // 代码分包阈值
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].[hash].js`,
          chunkFileNames: `assets/[name].[hash].js`,
          assetFileNames: `assets/[name].[hash].[ext]`,
          compact: true,
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            // echarts: ['echarts'],
          },
        },
      },
    },
    css: { preprocessorOptions: { css: { charset: false } } },
    define: {
      __VUE_I18N_LEGACY_API__: JSON.stringify(false),
      __VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
      __INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
      __VERSION__: JSON.stringify(process.env.npm_package_version),
      __NEXT_NAME__: JSON.stringify(process.env.npm_package_name),
      __BUILD_TIME__: JSON.stringify(new Date().toLocaleString()),
    },
  };
});

export default viteConfig;
