import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import electron from 'vite-plugin-electron/simple'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig(({ mode }) => {
    const isWeb = mode === 'pages'

    return {
        base: isWeb ? '/igmg-vakitmatik-frontend/' : '/',
        plugins: [
            react(),
            tsconfigPaths(),
            ...(isWeb
                    ? []
                    : [electron({
                        main: { entry: 'electron/main.ts' },
                        preload: { input: path.join(__dirname, 'electron/preload.ts') },
                        renderer: process.env.NODE_ENV === 'test' ? undefined : {}
                    })]
            ),
        ],
        css: {
            postcss: {
                plugins: [tailwindcss(), autoprefixer()],
            },
        },
        build: {
            outDir: 'dist',
            sourcemap: true,
        },
        define: {
            __WEB__: isWeb,
            'process.env.NODE_ENV': JSON.stringify(mode),
        },
    }
})

