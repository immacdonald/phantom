import react from '@vitejs/plugin-react';
import { defineConfig, UserConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    if (command === 'serve') {
        return devConfig();
    } else if (command === 'build') {
        return prodConfig();
    } else {
        console.warn('Invalid build command provided, using fallback dev config');
        return devConfig();
    }
});

const baseConfig = {
    plugins: [tsconfigPaths(), svgr(), react()],
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
                silenceDeprecations: ['legacy-js-api']
            }
        }
    }
};

function devConfig(): UserConfig {
    return {
        ...baseConfig
    };
}

function prodConfig(): UserConfig {
    return {
        ...baseConfig,
        base: '/phantom",'
    };
}
