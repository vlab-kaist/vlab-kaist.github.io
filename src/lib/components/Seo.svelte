<script lang="ts">
	import { page } from '$app/state';
	import { locales, localeHref, htmlLang, type Dict, type Locale } from '$i18n';
	import { SITE_URL } from '$lib/config';

	interface Props {
		dict: Dict;
		locale: Locale;
		/** Path without locale prefix, e.g. '/'. Used to build canonical + alternates. */
		path?: string;
		title?: string;
		description?: string;
	}

	let { dict, locale, path = '/', title, description }: Props = $props();

	const resolvedTitle = $derived(title ?? dict.meta.title);
	const resolvedDesc = $derived(description ?? dict.meta.description);
	const canonical = $derived(new URL(localeHref(locale, path), SITE_URL).href);
	const ogImage = $derived(new URL('/og.png', SITE_URL).href);

	// Organization schema so search engines understand what Vlab is rather than
	// guessing from a page that used to say nothing but "Vlab".
	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Organization',
			name: 'Vlab',
			alternateName: 'Vlab KAIST',
			url: SITE_URL,
			logo: new URL('/favicon.svg', SITE_URL).href,
			description: resolvedDesc,
			sameAs: ['https://github.com/vlab-kaist'],
			parentOrganization: {
				'@type': 'CollegeOrUniversity',
				name: 'KAIST',
				url: 'https://www.kaist.ac.kr/'
			}
		})
	);
</script>

<svelte:head>
	<title>{resolvedTitle}</title>
	<meta name="description" content={resolvedDesc} />
	<link rel="canonical" href={canonical} />

	{#each locales as alt (alt)}
		<link
			rel="alternate"
			hreflang={htmlLang[alt]}
			href={new URL(localeHref(alt, path), SITE_URL).href}
		/>
	{/each}
	<link
		rel="alternate"
		hreflang="x-default"
		href={new URL(localeHref('ko', path), SITE_URL).href}
	/>

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Vlab" />
	<meta property="og:locale" content={locale === 'ko' ? 'ko_KR' : 'en_US'} />
	<meta property="og:title" content={resolvedTitle} />
	<meta property="og:description" content={resolvedDesc} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={dict.meta.ogAlt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={resolvedTitle} />
	<meta name="twitter:description" content={resolvedDesc} />
	<meta name="twitter:image" content={ogImage} />

	{@html `<script type="application/ld+json">${jsonLd}<\/script>`}
</svelte:head>
