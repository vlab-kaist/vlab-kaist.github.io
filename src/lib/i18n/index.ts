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
 */
export function localeHref(locale: Locale, path = '/'): string {
	const clean = path.startsWith('/') ? path : `/${path}`;
	if (locale === defaultLocale) return clean === '/' ? '/' : clean;
	return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
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
