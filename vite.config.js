// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // 若用Vue则保留，纯HTML则删除

export default defineConfig({
  plugins: [vue()], // 纯HTML项目删除这行
  base: './', // 之前修复3D路径加的配置，保留！
  build: {
    // 方案1：直接调高警告阈值（最简单，推荐小白）
    chunkSizeWarningLimit: 2000, // 阈值改为2000kb（2MB），超过才警告
    // 方案2：拆分大体积依赖（进阶，优化加载速度）
    rollupOptions: {
      output: {
        // 把Three.js等3D库单独拆分成一个代码块
        manualChunks(id) {
          if (id.includes('three')) {
            return 'three-vendor'; // 拆分Three.js到单独的chunk
          }
          if (id.includes('node_modules')) {
            return 'vendor'; // 其他第三方依赖拆到vendor chunk
          }
        }
      }
    }
  }
})
