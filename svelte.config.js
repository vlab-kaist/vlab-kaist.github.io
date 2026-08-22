import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			// GitHub Pages serves no fallback for unknown paths, so emit a
			// branded 404 page rather than Pages' generic one.
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		prerender: {
			handleHttpError: 'fail',
			handleMissingId: 'fail'
		},
		alias: {
			$components: 'src/lib/components',
			$data: 'src/lib/data',
			$i18n: 'src/lib/i18n'
		}
	}
};

export default config;
