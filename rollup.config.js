import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser';
import oldie from 'oldie'
import postcssNested from 'postcss-nested'

// `npm run build` -> `production` is true
// `npm run local` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default[ 
	{
		input: 'javascripts/govuk-frontend.js',
		output: {
			file: 'public/assets/javascript/govuk-frontend.js',
			// legacy: true,
			format: 'iife', // immediately-invoked function expression — suitable for <script> tags
			sourcemap: false
		},
		plugins: [
			resolve(), // tells Rollup how to find date-fns in node_modules
			commonjs(), // converts date-fns to ES modules
			production && terser() // minify, but only in production
		]
	},
	{
		input: "javascripts/html5shiv.min.js",
		output: {
			file: 'public/assets/javascript/html5shiv.min.js',
		}
	},
	{
		input: 'styles/application.scss',
		output: {
			file: 'public/assets/styles/application',
		},
		plugins: [
			postcss({
				extract: 'application.css',
				minimize: production,
				plugins: [postcssNested]
			})
		]
	},
	{
		input: 'styles/application-legacy.scss',
		output: {
			file: 'public/assets/styles/application-legacy'
		},
		plugins: [
			postcss({
				extract: 'application-legacy.css',
				minimize: production,
				plugins: [postcssNested, oldie({
					rgba: { filter: true },
					rem: { disable: true },
					unmq: { disable: true },
					pseudo: { disable: true },
					not: { disable: true }
				})]
			})
		]
	}
];
