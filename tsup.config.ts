import path from 'path';
import autoprefixer from 'autoprefixer';
import { copy } from 'esbuild-plugin-copy';
import svgr from 'esbuild-plugin-svgr';
import { postcssModules, sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';
import { defineConfig } from 'tsup';

export default defineConfig({
    clean: true,
    sourcemap: true,
    minify: true,
    skipNodeModulesBundle: true,
    tsconfig: path.resolve(__dirname, './tsconfig.json'),
    dts: true,
    entry: [
        './src/index.ts',
        './src/components/index.ts?(x)',
        './src/contexts/*.ts?(x)',
        './src/assets/**/index.ts?(x)',
        './src/components/**/**/!(index).ts?(x)',
        './src/hooks/*.ts?(x)',
        './src/types/*.ts?(x)',
        './src/utility/*.ts?(x)',
        './src/styles/styles.scss'
    ],
    format: ['esm'],
    outDir: 'lib/',
    target: 'es2020',
    bundle: true,
    platform: 'browser',
    external: ['react', 'react-dom', 'react-router', 'react-router-dom', 'react/jsx-runtime'],
    ignoreWatch: ['docs/**'],
    esbuildPlugins: [
        sassPlugin({
            type: 'style',
            filter: /\.module\.scss$/,
            precompile(source, pathname) {
                const filePath = pathname.split('/').slice(-1)[0];
                if (!filePath.startsWith('_')) {
                    const prepend = `@use "${path.resolve(path.relative(__dirname, pathname), path.resolve(__dirname, './src/styles/tokens'))}" as *;`;
                    return prepend + '\n' + source;
                } else {
                    return source;
                }
            },
            transform: async (css, resolveDir, context) => {
                const prefixedCSS = (await postcss([autoprefixer()]).process(css, { from: undefined })).css;

                return await postcssModules({
                    generateScopedName: 'phantom-[local]_[hash:base64:5]'
                })(prefixedCSS, resolveDir, context);
            }
        }),
        sassPlugin({
            type: 'css',
            filter: /^[^_][^.]*\.scss$/,
            transform: async (css) => {
                const result = await postcss([autoprefixer()]).process(css, { from: undefined });
                return result.css;
            }
        }),
        svgr(),
        copy({
            resolveFrom: 'cwd',
            assets: [
                {
                    from: ['./src/styles/styles.scss'],
                    to: ['./lib/styles/']
                },
                {
                    from: ['./src/styles/tokens/*'],
                    to: ['./lib/styles/tokens/']
                }
            ],
            watch: true
        })
    ]
});
