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
		history: string;
		join: string;
		skipToContent: string;
		menu: string;
		close: string;
		theme: string;
		language: string;
	};
	hero: {
		eyebrow: string;
		title: string;
		titleAccent: string;
		lead: string;
		ctaPrimary: string;
		ctaSecondary: string;
		imageAlt: string;
		scrollHint: string;
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
	join: {
		heading: string;
		lead: string;
		body: string;
		cta: string;
		ctaNote: string;
		channels: { label: string; value: string; href: string }[];
	};
	footer: {
		blurb: string;
		copyright: string;
		builtBy: string;
		links: { label: string; href: string; external?: boolean }[];
	};
	notFound: {
		title: string;
		body: string;
		cta: string;
	};
}
