import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
export default defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const random = generateUniqueString();
  return {
    plugins: [
      uni(),
      // vueJsx({

      // })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@images': resolve(__dirname, 'src/static/images'),
      },
    },

    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/js/entry-${random}.js`,
          chunkFileNames: `assets/js/chunk-[name]-${random}.js`,
          assetFileNames: `assets/[ext]/[name]-${random}.[ext]`,

        },
      }
    },
    server: {
      // cors: true, // 默认启用并允许任何源
      // // open: true, // 在服务器启动时自动在浏览器中打开应用程序
      // proxy: {// 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      //   '/apis/': {
      //     // target: 'http://1.15.170.198:11080', //张昭伟
      //     // target: 'http://1.15.170.198:11080', //流威虎
      //     target: env.VITE_BASE_URL,
      //     secure: false,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/apis/, '')
      //   }
      // }
    }
  }
})

function generateUniqueString() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
