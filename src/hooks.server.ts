import type { Handle } from '@sveltejs/kit';
import { defaultLocale, isLocale } from '$i18n';

/**
 * Stamps the real `lang` attribute onto <html> for each prerendered page.
 *
 * This has to happen here rather than in a component: `<svelte:head>` can only
 * append nodes *into* <head>, so `<svelte:head><html lang="en" /></svelte:head>`
 * emits a stray <html> tag inside the head and leaves the actual document
 * language untouched. The old site shipped lang="en" on Korean content for four
 * years; doing this in a component would have silently reintroduced it.
 */
export const handle: Handle = ({ event, resolve }) => {
	const segment = event.url.pathname.split('/')[1];
	const locale = isLocale(segment) ? segment : defaultLocale;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', locale)
	});
};
