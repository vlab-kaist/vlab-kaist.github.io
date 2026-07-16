import type { ParamMatcher } from '@sveltejs/kit';
import { defaultLocale, locales } from '$i18n/types';

/**
 * Matches the optional `[[lang]]` segment.
 *
 * The default locale is served from the root (`/`), not `/ko`, so it must not
 * match here — otherwise `/ko` and `/` would both resolve and we would ship two
 * URLs with identical content for search engines to fight over.
 */
export const match: ParamMatcher = (param) =>
	(locales as readonly string[]).includes(param) && param !== defaultLocale;
