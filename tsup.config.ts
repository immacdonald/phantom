import {postcssModules, sassPlugin} from 'esbuild-sass-plugin'
import { copy } from 'esbuild-plugin-copy';
import { defineConfig } from 'tsup';
import svgr from 'esbuild-plugin-svgr';

export default defineConfig({
    splitting: true,
    sourcemap: true,
    clean: true,
    dts: true,
    format: ['cjs', 'esm'],
    minify: true,
    bundle: true,
    skipNodeModulesBundle: true,
    entry: ['src/index.ts'],
    target: 'es2020',
    outDir: 'lib',
    esbuildPlugins: [
        sassPlugin({
            type: "style",
            transform: postcssModules({})
        }),
        svgr(),
        copy({
            resolveFrom: 'cwd',
            assets: {
                from: ['./src/ui/{tokens.scss,variables.module.scss}'],
                to: ['./lib/style/']
            },
            watch: true
        })
    ]
});
