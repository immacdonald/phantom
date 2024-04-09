import {postcssModules, sassPlugin} from 'esbuild-sass-plugin'
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
  entry: ['src/index.ts', 'src/components/index.ts'],
  target: 'es2020',
  outDir: 'lib',
  esbuildPlugins: [sassPlugin({
    type: "style",
    transform: postcssModules({})
  })],
})