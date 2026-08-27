export const locales = ['ko', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ko';

export interface Stat {
	/** Big number or score. Rendered in mono. */
	value: string;
	label: string;
	/** Optional qualifier shown under the label. */
	note?: string;
}

export interface TimelineEntry {
	/** ISO-ish `YYYY.MM`, used verbatim for display and for sorting. */
	date: string;
	title: string;
	body?: string;
	/** Highlighted entries get the brand accent treatment. */
	highlight?: boolean;
}

export interface Sponsor {
	name: string;
	/**
	 * Path under static/sponsors/. Supply a logo that reads on a dark field.
	 * Optional: a supporter can be credited before their artwork arrives, and a
	 * set wordmark is a better placeholder than a broken image or an empty slot.
	 * See CONTENT-TODO.md for how to add the asset once it does.
	 */
	logo?: string;
	href: string;
	/** Optional one-liner on what they actually provide. */
	note?: string;
	/**
	 * Set when the artwork is a dark monochrome or near-monochrome mark that
	 * disappears on the ink theme, and the owner publishes no light variant.
	 * The band then sets it on a white plate in dark mode — which is what brand
	 * guidelines prescribe for exactly this case, and is honest in a way that
	 * filtering the logo's colour is not.
	 */
	plateOnDark?: boolean;
}

export interface Project {
	id: string;
	name: string;
	tagline: string;
	body: string;
	tags: string[];
	repo?: string;
	image?: string;
	imageAlt?: string;
	featured?: boolean;
}

export interface Dict {
	meta: {
		title: string;
		description: string;
		ogAlt: string;
	};
	nav: {
		teams: string;
		projects: string;
		life: string;
		history: string;
		join: string;
		skipToContent: string;
		menu: string;
		close: string;
		language: string;
		/** Action labels for the theme toggle — what the click will do, not what
		 *  the current theme is. Only one of the two is ever in the a11y tree. */
		themeToLight: string;
		themeToDark: string;
	};
	hero: {
		/** Pill above the headline. It links out to the application form, so it
		 *  has to read as an announcement ("we are recruiting"), not as a label
		 *  ("a KAIST club") — the identity line moved down into `lead`. */
		badge: string;
		title: string;
		titleAccent: string;
		lead: string;
		ctaPrimary: string;
		ctaSecondary: string;
		imageAlt: string;
	};
	stats: {
		heading: string;
		items: Stat[];
	};
	teams: {
		heading: string;
		lead: string;
		quiz: {
			name: string;
			tagline: string;
			body: string;
			points: string[];
			imageAlt: string;
		};
		ai: {
			name: string;
			tagline: string;
			body: string;
			points: string[];
			imageAlt: string;
		};
	};
	projects: {
		heading: string;
		lead: string;
		viewRepo: string;
		items: Project[];
	};
	history: {
		heading: string;
		lead: string;
		entries: TimelineEntry[];
	};
	life: {
		heading: string;
		lead: string;
		/** One per photo, paired by index with the IMAGES list in LifeGrid.svelte.
		 *  Title only: the second line these used to carry was a caption in the
		 *  chatty sense ("you fight better on a full stomach") and the club wanted
		 *  the page to read straight. `alt` is unaffected — it is not decoration. */
		captions: { title: string; alt: string }[];
	};
	join: {
		heading: string;
		lead: string;
		body: string;
		/** Primary button — currently the application form. */
		cta: string;
		/** One line under the button saying where it goes, because the button
		 *  leaves the site and a form is a bigger commitment than a link. */
		ctaNote: string;
		/** Absolute URL. External on purpose: the club runs recruiting on a
		 *  Google Form, not on this site. */
		ctaHref: string;
		imageAlt: string;
		channels: { label: string; value: string; href: string }[];
	};
	sponsors: {
		heading: string;
		items: Sponsor[];
		/** The block addressed to companies rather than to students: a question,
		 *  one line of answer, and a button. */
		contact: { heading: string; body: string; label: string; href: string };
	};
	footer: {
		blurb: string;
		copyright: string;
		/** Contains `{authors}` — Footer.svelte fills it with linked names. */
		builtBy: string;
		links: { label: string; href: string; external?: boolean }[];
	};
	notFound: {
		title: string;
		body: string;
		cta: string;
	};
}
