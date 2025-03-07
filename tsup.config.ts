import path from 'path';
import { copy } from 'esbuild-plugin-copy';
import svgr from 'esbuild-plugin-svgr';
import { postcssModules, sassPlugin } from 'esbuild-sass-plugin';
import { defineConfig } from 'tsup';

export default defineConfig({
    clean: true,
    sourcemap: true,
    minify: true,
    skipNodeModulesBundle: true,
    tsconfig: path.resolve(__dirname, "./tsconfig.json"),
    dts: true,
    entry: [
        "./src/index.ts",
        "./src/components/index.ts?(x)",
        "./src/contexts/*.ts?(x)",
        "./src/assets/**/index.ts?(x)",
        "./src/components/**/**/!(index).ts?(x)",
        "./src/hooks/*.ts?(x)",
        "./src/types/*.ts?(x)",
        "./src/utility/*.ts?(x)",
        "./src/styles/styles.scss"
    ],
    format: ["esm"],
    outDir: "lib/",
    target: 'es2020',
    bundle: true,
    platform: "browser",
    external: [
        "react",
        "react-dom",
        "react/jsx-runtime"
    ],
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
            transform: postcssModules({
                generateScopedName: 'phantom-[local]_[hash:base64:5]'
            })
        }),
        sassPlugin({
            type: 'css',
            filter: /^[^_][^.]*\.scss$/,
        }),
        svgr(),
        copy({
            resolveFrom: 'cwd',
            assets: {
                from: ['./src/styles/**'],
                to: ['./lib/styles/']
            },
            watch: true
        })
    ]
});