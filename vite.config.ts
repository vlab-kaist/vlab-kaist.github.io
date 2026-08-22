import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		// The site is content, not an app — flag anything that creeps toward app-sized JS.
		chunkSizeWarningLimit: 200
	}
});
