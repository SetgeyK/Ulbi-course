import jsx from '@svgr/plugin-jsx';
import svgo from '@svgr/plugin-svgo';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [
        svgr({
            include: '**/*.svg',
            svgrOptions: {
                exportType: 'default',
                icon: true,
                plugins: [svgo, jsx],
                svgProps: {
                    fill: 'currentColor',
                },
                svgoConfig: {
                    plugins: [
                        {
                            name: 'preset-default',
                            params: {
                                overrides: {
                                    convertColors: {
                                        currentColor: true,
                                    },
                                },
                            },
                        },
                    ],
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
