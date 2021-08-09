import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import postcssNested from 'postcss-nested'
import outputManifest from 'rollup-plugin-output-manifest'

// `npm run build` -> `production` is true
// `npm run local` -> `production` is false
const production = !process.env.ROLLUP_WATCH

export default [
  {
    input: 'javascripts/application.js',
    output: {
      name: 'application',
      entryFileNames: '[hash][name].js',
      dir: 'public/assets/javascript',
      format: 'iife', // immediately-invoked function expression — suitable for <script> tags
      sourcemap: false
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      production && terser(), // minify, but only in production
      outputManifest()
    ]
  },
  {
    input: 'styles/application.scss',
    output: {
      name: 'application',
      entryFileNames: '[hash][name].css',
      dir: 'public/assets/styles'
    },
    plugins: [
      outputManifest(),
      postcss({
        extract: true,
        minimize: production,
        plugins: [postcssNested]
      })
    ]
  }
]
