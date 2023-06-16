import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export const svgrOptions = {
    icon: true,
    svgoConfig: {
        plugins: [
            {
                name: 'convertColors',
                params: {
                    currentColor: true,
                },
            },
        ],
    },
};

export default defineConfig({
    plugins: [
        svgr({
            exportAsDefault: true,
            svgrOptions: {
                replaceAttrValues: {
                    fill: 'currentColor',
                    color: 'currentColor',
                },
            },
        }),
        react(),
    ],
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
    define: {
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('http://localhost:8000'),
        __PROJECT__: JSON.stringify('frontend'),
    },
});
