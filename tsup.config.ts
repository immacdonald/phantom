import {postcssModules, sassPlugin} from 'esbuild-sass-plugin'
import { copy } from 'esbuild-plugin-copy';
import { defineConfig } from 'tsup';

export default defineConfig({
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: true,
  bundle: true,
  skipNodeModulesBundle: true,
  entry: ['src/index.ts', '!src/ui/'],
  external: ['src/ui'],
  target: 'es2020',
  outDir: 'lib',
  esbuildPlugins: [
    /*sassPlugin({
      type: "style",
      transform: postcssModules({})
    }),*/
    copy({
      resolveFrom: 'cwd',
      assets: {
        from: ['./src/ui/**'],
        to: ['./lib/ui'],
      },
      watch: true,
    }),
],
})