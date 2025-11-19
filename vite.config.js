import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'PUBLIC',  // ✅ Указываем папку PUBLIC вместо public
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    // Отключаем оптимизацию изображений для сохранения качества
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Сохраняем оригинальные имена файлов изображений
          if (assetInfo.name && /\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name)) {
            return `assets/images/[name].[hash][extname]`;
          }
          return `assets/[name].[hash][extname]`;
        }
      }
    }
  },
  // Отключаем сжатие изображений
  esbuild: {
    // Не минифицируем изображения
    minifyIdentifiers: false,
    minifySyntax: false,
    minifyWhitespace: false
  }
})