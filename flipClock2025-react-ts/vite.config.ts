import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'

// https://vite.dev/config/
export default defineConfig({
    server: { host: '0.0.0.0' },
    // 静态资源引用路径，默认为"/"
    base: './',
    plugins: [
        react(),
        checker({
            eslint: {
                // useFlatConfig: true 表示使用扁平模式配置（eslint.config.js）
                // useFlatConfig: false 表示使用传统模式配置（如.eslintrc.json、.eslintrc.cjs）
                useFlatConfig: true,
                lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
            },
        }),
    ],
})
