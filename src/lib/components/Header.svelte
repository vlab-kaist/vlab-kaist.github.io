<script lang="ts">
	import { page } from '$app/state';
	import Logo from './Logo.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import { localeHref, localeName, locales, type Dict, type Locale } from '$i18n';

	interface Props {
		dict: Dict;
		locale: Locale;
	}

	let { dict, locale }: Props = $props();

	let open = $state(false);

	// Real routes, not in-page anchors. The single long page was split so each
	// nav item is its own document; the header is now navigation rather than a
	// scroll shortcut.
	const sections = $derived([
		{ path: '/teams/', label: dict.nav.teams },
		{ path: '/projects/', label: dict.nav.projects },
		{ path: '/life/', label: dict.nav.life },
		{ path: '/history/', label: dict.nav.history },
		{ path: '/join/', label: dict.nav.join }
	]);

	// Compare against the resolved href so the check works in both locales, and
	// normalise the trailing slash the router may or may not have applied yet.
	const current = $derived(page.url.pathname.replace(/\/?$/, '/'));
	const isActive = (path: string) => current === localeHref(locale, path);

	// Swapping language must keep you on the page you were reading.
	const otherLocale = $derived(locales.find((l) => l !== locale) as Locale);
	const currentPath = $derived(
		page.url.pathname.replace(new RegExp(`^/(${locales.join('|')})(?=/|$)`), '') || '/'
	);

	$effect(() => {
		document.body.style.overflow = open ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:document
	onkeydown={(e) => {
		if (e.key === 'Escape' && open) open = false;
	}}
/>

<a class="skip-link" href="#main">{dict.nav.skipToContent}</a>

<!--
  Sticky rather than fixed, and opaque from the first pixel. The 2026 hero is a
  light two-column block, not a full-bleed photo, so there is nothing for a
  transparent header to sit over — and a header that changes colour on scroll
  would be the only moving chrome on an otherwise still page.
-->
<header class:open>
	<nav aria-label="Primary">
		<a class="brand" href={localeHref(locale)} onclick={() => (open = false)}>
			<Logo size={24} decorative />
			<span class="wordmark">Vlab</span>
		</a>

		<ul class="links">
			{#each sections as section (section.path)}
				<li>
					<a
						href={localeHref(locale, section.path)}
						class:join={section.path === '/join/'}
						aria-current={isActive(section.path) ? 'page' : undefined}
						onclick={() => (open = false)}
					>
						{section.label}
					</a>
				</li>
			{/each}
		</ul>

		<div class="actions">
			<ThemeToggle {dict} />

			<a class="lang" href={localeHref(otherLocale, currentPath)} hreflang={otherLocale}>
				<span class="visually-hidden">{dict.nav.language}: {localeName[otherLocale]}</span>
				<span aria-hidden="true">{otherLocale.toUpperCase()}</span>
			</a>

			<button
				class="burger"
				aria-expanded={open}
				aria-controls="mobile-nav"
				onclick={() => (open = !open)}
			>
				<span class="visually-hidden">{open ? dict.nav.close : dict.nav.menu}</span>
				<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
					{#if open}
						<path d="M6 6l12 12M18 6L6 18" />
					{:else}
						<path d="M3.5 7.5h17M3.5 16.5h17" />
					{/if}
				</svg>
			</button>
		</div>
	</nav>
</header>

<!-- The old site simply had no mobile nav: the logo and three Korean links sat
     side by side and overflowed.

     Always rendered, hidden with the `hidden` attribute rather than an {#if}.
     Two reasons, both a11y: the burger's aria-controls has to point at an
     element that actually exists even while the menu is shut, and a bare <div>
     of links belongs to no landmark — axe flags every link in it as content
     outside a region. `hidden` keeps it out of the accessibility tree and out
     of the tab order for free, and the open animation still fires because the
     element goes display:none -> block when the attribute drops. -->
<nav id="mobile-nav" class="sheet" aria-label={dict.nav.menu} hidden={!open}>
	<ul>
		{#each sections as section (section.path)}
			<li>
				<a
					href={localeHref(locale, section.path)}
					class:sheet-cta={section.path === '/join/'}
					aria-current={isActive(section.path) ? 'page' : undefined}
					onclick={() => (open = false)}
				>
					{section.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: var(--z-header);
		height: var(--header-h);
		display: flex;
		align-items: center;
		border-bottom: 1px solid var(--border);
		/* Near-opaque on its own: backdrop-filter is skipped under forced-colors,
		   in some embedded webviews, and whenever compositing is unavailable —
		   the blur is an enhancement, not the legibility. */
		background: color-mix(in srgb, var(--bg) 94%, transparent);
	}

	@supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
		header {
			background: color-mix(in srgb, var(--bg) 88%, transparent);
			backdrop-filter: blur(10px) saturate(140%);
			-webkit-backdrop-filter: blur(10px) saturate(140%);
		}
	}

	/* `header nav`, not a bare `nav`: the mobile sheet below is a <nav> too, and
	   a bare element selector would hand it this rule's `display: flex` — which
	   overrides the UA stylesheet's `[hidden] { display: none }` and leaves the
	   sheet painted over every desktop page. */
	header nav {
		width: 100%;
		max-width: var(--container);
		margin-inline: auto;
		padding-inline: var(--gutter);
		display: flex;
		align-items: center;
		gap: var(--space-6);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		flex-shrink: 0;
		margin-right: auto;
		/* Logo's detached marks paint with currentColor. */
		color: var(--text);
	}

	/* "Vlab" is Latin and it is a logotype, so it keeps the tight setting the
	   hangul headings just gave up. */
	.wordmark {
		font-size: 1.0625rem;
		font-weight: 800;
		letter-spacing: var(--tracking-lat);
	}

	.links {
		display: flex;
		gap: 2px;
		font-size: var(--text-sm);
		font-weight: 500;
	}

	.links a {
		display: block;
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-md);
		color: var(--text-muted);
		transition:
			color var(--dur-fast) var(--ease-out),
			background-color var(--dur-fast) var(--ease-out);
	}

	.links a:hover {
		color: var(--text);
		background: color-mix(in srgb, var(--border) 45%, transparent);
	}

	/* "함께하기" is the one nav item that is also the site's goal, so it carries
	   the accent as a tinted pill rather than a filled button — a filled button
	   in a 64px header out-shouts the hero CTA directly below it. */
	.links .join,
	.links .join:hover {
		color: var(--brand);
		background: var(--brand-soft);
	}

	/* Now that these are page links rather than scroll targets, the header has
	   to say where you are. An underline rather than a filled pill, so it does
	   not collide with the tinted "함께하기" item. */
	.links a[aria-current='page'] {
		color: var(--text);
		box-shadow: inset 0 -2px 0 var(--brand);
		border-radius: var(--radius-md) var(--radius-md) 0 0;
	}

	.links .join[aria-current='page'] {
		color: var(--brand);
	}

	.sheet a[aria-current='page'] {
		color: var(--brand);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		margin-left: var(--space-2);
	}

	.lang {
		display: grid;
		place-items: center;
		height: 30px;
		padding-inline: var(--space-2);
		border-radius: var(--radius-md);
		font-size: var(--text-xs);
		font-weight: 700;
		letter-spacing: var(--tracking-wide);
		color: var(--text-faint);
		transition:
			color var(--dur-fast) var(--ease-out),
			background-color var(--dur-fast) var(--ease-out),
			transform var(--dur-fast) var(--ease-out);
	}

	.lang:hover {
		color: var(--text);
		background: color-mix(in srgb, var(--border) 45%, transparent);
	}

	/* The header controls are small enough that a lift would just look like a
	   wobble, so they take the press half of the button treatment only. */
	.lang:active,
	.burger:active {
		transform: scale(0.92);
		transition-duration: 70ms;
	}

	.burger {
		display: none;
		place-items: center;
		width: 34px;
		height: 34px;
		border: 0;
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--text-muted);
		cursor: pointer;
		transition:
			color var(--dur-fast) var(--ease-out),
			background-color var(--dur-fast) var(--ease-out),
			transform var(--dur-fast) var(--ease-out);
	}

	.burger:hover {
		color: var(--text);
		background: color-mix(in srgb, var(--border) 45%, transparent);
	}

	.burger svg {
		width: 17px;
		height: 17px;
		stroke-width: 1.8;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	/* Explicit rather than relying on the UA `[hidden]` rule alone: `hidden` is
	   only as strong as the weakest author rule that sets `display` on this
	   element, and that is a trap worth closing once. */
	.sheet[hidden] {
		display: none;
	}

	.sheet {
		position: fixed;
		inset: var(--header-h) 0 0 0;
		z-index: calc(var(--z-header) - 1);
		background: var(--bg);
		padding: var(--space-5) var(--gutter);
		animation: fade var(--dur-base) var(--ease-out);
	}

	.sheet ul {
		display: flex;
		flex-direction: column;
	}

	.sheet a {
		display: block;
		padding: var(--space-4) 0;
		font-size: var(--text-2xl);
		font-weight: 700;
		letter-spacing: var(--tracking-heading);
		border-bottom: 1px solid var(--border);
	}

	.sheet-cta {
		color: var(--brand);
	}

	@keyframes fade {
		from {
			opacity: 0;
			transform: translateY(-6px);
		}
	}

	@media (max-width: 800px) {
		.links {
			display: none;
		}

		.burger {
			display: grid;
		}
	}
</style>
