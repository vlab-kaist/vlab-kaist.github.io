<script lang="ts">
	import { page } from '$app/state';
	import Logo from './Logo.svelte';
	import { theme } from '$lib/theme.svelte';
	import { localeHref, localeName, locales, type Dict, type Locale } from '$i18n';

	interface Props {
		dict: Dict;
		locale: Locale;
	}

	let { dict, locale }: Props = $props();

	let open = $state(false);
	let scrolled = $state(false);

	const sections = $derived([
		{ href: '#teams', label: dict.nav.teams },
		{ href: '#projects', label: dict.nav.projects },
		{ href: '#history', label: dict.nav.history }
	]);

	// The header sits over the hero photo at the top of the page and needs no
	// backdrop there; once you scroll past it, it needs one to stay readable.
	function onScroll() {
		scrolled = window.scrollY > 24;
	}

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

<svelte:window onscroll={onScroll} />
<svelte:document
	onkeydown={(e) => {
		if (e.key === 'Escape' && open) open = false;
	}}
/>

<a class="skip-link" href="#main">{dict.nav.skipToContent}</a>

<header class:scrolled class:open>
	<nav aria-label="Primary">
		<a class="brand" href={localeHref(locale)} onclick={() => (open = false)}>
			<Logo size={30} decorative />
			<span class="wordmark">VLAB</span>
		</a>

		<ul class="links">
			{#each sections as section (section.href)}
				<li><a href={section.href} onclick={() => (open = false)}>{section.label}</a></li>
			{/each}
		</ul>

		<div class="actions">
			<a class="cta" href="#join" onclick={() => (open = false)}>{dict.nav.join}</a>

			<a class="icon-btn lang" href={localeHref(otherLocale, currentPath)} hreflang={otherLocale}>
				<span class="visually-hidden">{dict.nav.language}: {localeName[otherLocale]}</span>
				<span aria-hidden="true">{otherLocale.toUpperCase()}</span>
			</a>

			<button class="icon-btn" onclick={() => theme.toggle()}>
				<span class="visually-hidden">{dict.nav.theme}</span>
				{#if theme.current === 'dark'}
					<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
						<circle cx="12" cy="12" r="4.2" />
						<path
							d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"
						/>
					</svg>
				{:else}
					<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
						<path d="M20.5 14.4A8.6 8.6 0 1 1 9.6 3.5a6.9 6.9 0 0 0 10.9 10.9Z" />
					</svg>
				{/if}
			</button>

			<button
				class="icon-btn burger"
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
     side by side and overflowed. -->
{#if open}
	<div id="mobile-nav" class="sheet">
		<ul>
			{#each sections as section (section.href)}
				<li><a href={section.href} onclick={() => (open = false)}>{section.label}</a></li>
			{/each}
			<li>
				<a class="sheet-cta" href="#join" onclick={() => (open = false)}>{dict.nav.join}</a>
			</li>
		</ul>
	</div>
{/if}

<style>
	header {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: var(--z-header);
		height: var(--header-h);
		display: flex;
		align-items: center;
		border-bottom: 1px solid transparent;
		transition:
			background-color var(--dur-base) var(--ease-out),
			border-color var(--dur-base) var(--ease-out),
			backdrop-filter var(--dur-base) var(--ease-out);

		/* Once the header has a backdrop it belongs to the page, so it follows
		   the theme. */
		--header-fg: var(--text);
		--header-fg-muted: var(--text-muted);
		--header-pill-bg: var(--text);
		--header-pill-fg: var(--bg);
	}

	/* At the top of the page the header is transparent and sits over the hero
	   photo, which is scrimmed dark in BOTH themes. So its colours cannot come
	   from the theme: in light mode --text is near-black and the nav would go
	   near-invisible against the photo. They are pinned to light-on-dark here.
	   Assumes every page that renders this header opens with the dark hero;
	   a page without one should start in the scrolled state. */
	header:not(.scrolled):not(.open) {
		--header-fg: #ffffff;
		--header-fg-muted: rgb(255 255 255 / 0.75);
		--header-pill-bg: #ffffff;
		--header-pill-fg: #0a0a10;
	}

	/* Opaque enough to stay readable on its own: backdrop-filter is skipped
	   under forced-colors, in some embedded webviews, and whenever compositing
	   is unavailable — the blur is an enhancement, not the legibility. */
	header.scrolled,
	header.open {
		background: color-mix(in srgb, var(--bg) 88%, transparent);
		border-bottom-color: var(--border);
	}

	@supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
		header.scrolled,
		header.open {
			background: color-mix(in srgb, var(--bg) 72%, transparent);
			backdrop-filter: blur(14px) saturate(160%);
			-webkit-backdrop-filter: blur(14px) saturate(160%);
		}
	}

	nav {
		width: 100%;
		max-width: var(--container-wide);
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
		/* Logo's detached marks paint with currentColor. */
		color: var(--header-fg);
		transition: color var(--dur-base) var(--ease-out);
	}

	.wordmark {
		font-size: var(--text-lg);
		font-weight: 800;
		letter-spacing: 0.02em;
	}

	.links {
		display: flex;
		gap: var(--space-5);
		margin-right: auto;
		font-size: var(--text-sm);
		font-weight: 500;
	}

	.links a {
		color: var(--header-fg-muted);
		transition: color var(--dur-fast) var(--ease-out);
	}

	.links a:hover {
		color: var(--header-fg);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin-left: auto;
	}

	.cta {
		padding: 0.45rem 0.95rem;
		border-radius: var(--radius-full);
		background: var(--header-pill-bg);
		color: var(--header-pill-fg);
		font-size: var(--text-sm);
		font-weight: 600;
		transition:
			opacity var(--dur-fast) var(--ease-out),
			background-color var(--dur-base) var(--ease-out),
			color var(--dur-base) var(--ease-out);
	}

	.cta:hover {
		opacity: 0.85;
	}

	.icon-btn {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border: 0;
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--header-fg-muted);
		cursor: pointer;
		transition:
			background-color var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}

	.icon-btn:hover {
		background: color-mix(in srgb, var(--header-fg) 12%, transparent);
		color: var(--header-fg);
	}

	.icon-btn svg {
		width: 17px;
		height: 17px;
		stroke-width: 1.8;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.lang {
		width: auto;
		padding-inline: var(--space-2);
		font-size: var(--text-xs);
		font-weight: 700;
		letter-spacing: var(--tracking-wide);
	}

	.burger {
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
		gap: var(--space-2);
	}

	.sheet a {
		display: block;
		padding: var(--space-4) 0;
		font-size: var(--text-2xl);
		font-weight: 700;
		letter-spacing: var(--tracking-display);
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

		.cta {
			display: none;
		}

		.burger {
			display: grid;
		}
	}
</style>
