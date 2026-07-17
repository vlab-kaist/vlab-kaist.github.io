import { ko } from './ko';
import { en } from './en';
import { defaultLocale, locales, type Dict, type Locale } from './types';

export { locales, defaultLocale };
export type { Locale, Dict };

const dicts: Record<Locale, Dict> = { ko, en };

export function t(locale: Locale): Dict {
	return dicts[locale] ?? dicts[defaultLocale];
}

export function isLocale(value: string | undefined): value is Locale {
	return !!value && (locales as readonly string[]).includes(value);
}

/**
 * Resolve a locale from the optional `[[lang]]` route param.
 * `undefined` (i.e. `/`) means the default locale.
 */
export function localeFromParam(param: string | undefined): Locale {
	return isLocale(param) ? param : defaultLocale;
}

/**
 * Build an href for `path` in `locale`.
 * The default locale lives at the root; others are prefixed (`/en/...`).
 *
 * Always emits a trailing slash, to match `trailingSlash: 'always'` in
 * +layout.ts. Without it the canonical tag, the hreflang alternates and the
 * sitemap would all advertise `/en`, which only exists as a redirect to `/en/`
 * — pointing canonical URLs at a redirect is exactly the kind of thing that
 * quietly costs a site its search ranking.
 */
export function localeHref(locale: Locale, path = '/'): string {
	const clean = path.startsWith('/') ? path : `/${path}`;
	const withSlash = clean.endsWith('/') ? clean : `${clean}/`;
	return locale === defaultLocale ? withSlash : `/${locale}${withSlash}`;
}

/** `<html lang>` value. */
export const htmlLang: Record<Locale, string> = { ko: 'ko', en: 'en' };

/** Name of each locale, written in that locale. */
export const localeName: Record<Locale, string> = { ko: '한국어', en: 'English' };

/** Interpolate `{token}` placeholders. */
export function fill(template: string, values: Record<string, string | number>): string {
	return template.replace(/\{(\w+)\}/g, (match, key) =>
		key in values ? String(values[key]) : match
	);
}
