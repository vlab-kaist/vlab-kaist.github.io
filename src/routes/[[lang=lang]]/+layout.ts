import { localeFromParam, t } from '$i18n';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params }) => {
	const locale = localeFromParam(params.lang);
	return {
		locale,
		dict: t(locale),
		// Baked at build time so the footer year cannot drift with a stale
		// client clock, and so the prerendered HTML is deterministic.
		year: new Date().getFullYear()
	};
};
