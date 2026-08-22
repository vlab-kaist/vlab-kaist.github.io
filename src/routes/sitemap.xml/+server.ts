import { locales, localeHref } from '$i18n';
import { SITE_URL } from '$lib/config';
import type { RequestHandler } from './$types';

export const prerender = true;

/** Every page, in every locale. Keep in step as routes are added. */
const paths = ['/'];

export const GET: RequestHandler = () => {
	const urls = paths
		.map((path) => {
			// Each URL declares its translations so Google serves the right one
			// rather than treating ko and en as duplicate content.
			const alternates = locales
				.map(
					(l) =>
						`\n\t\t<xhtml:link rel="alternate" hreflang="${l}" href="${new URL(localeHref(l, path), SITE_URL).href}" />`
				)
				.join('');

			return locales
				.map(
					(locale) => `\t<url>
		<loc>${new URL(localeHref(locale, path), SITE_URL).href}</loc>${alternates}
		<changefreq>monthly</changefreq>
		<priority>${path === '/' ? '1.0' : '0.7'}</priority>
	</url>`
				)
				.join('\n');
		})
		.join('\n');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`,
		{ headers: { 'Content-Type': 'application/xml' } }
	);
};
