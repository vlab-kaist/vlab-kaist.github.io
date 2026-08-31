<script lang="ts">
	import Logo from './Logo.svelte';
	import { fill, localeHref, type Dict, type Locale } from '$i18n';

	interface Props {
		dict: Dict;
		locale: Locale;
		/** Passed in from the page so the year is baked at prerender, not read
		 *  from the visitor's clock (which would be wrong if it drifts). */
		year: number;
	}

	let { dict, locale, year }: Props = $props();

	// Internal links in the dictionary are written locale-agnostically ("/join/")
	// so the copy does not have to know about the /en prefix. External ones are
	// absolute and pass through untouched.
	const href = (link: { href: string; external?: boolean }) =>
		link.external ? link.href : localeHref(locale, link.href);

	// Everyone who has built a version of this site, oldest first: seo-rii wrote
	// the original, and the 2026 redesign came from Micron-726 on top of
	// MoonlightWarrior's branch. Names link to GitHub because that is where the
	// work is; the display name is the handle, so nobody's legal name goes on a
	// public page without them putting it there themselves.
	const AUTHORS = [
		{ handle: 'seo-rii', url: 'https://github.com/seo-rii' },
		{ handle: 'Micron-726', url: 'https://github.com/Micron-726' },
		{ handle: 'MoonlightWarrior', url: 'https://github.com/MoonlightWarrior' }
	];

	const authorsHtml = AUTHORS.map(
		(a) => `<a href="${a.url}" target="_blank" rel="noopener noreferrer">${a.handle}</a>`
	).join(' · ');
</script>

<footer>
	<div class="inner">
		<div class="brand">
			<Logo size={26} decorative />
			<div>
				<p class="name" translate="no">Vlab</p>
				<p class="blurb">{dict.footer.blurb}</p>
			</div>
		</div>

		<ul class="links">
			{#each dict.footer.links as link (link.href)}
				<li>
					<a
						href={href(link)}
						target={link.external ? '_blank' : undefined}
						rel={link.external ? 'noopener noreferrer' : undefined}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>

		<div class="legal">
			<p>{fill(dict.footer.copyright, { year })}</p>
			<p class="authors">
				<!-- rel="noopener" was missing on this link in the old footer. The
				     handles are a fixed list in this component, not visitor input,
				     so there is nothing here for {@html} to smuggle. -->
				{@html fill(dict.footer.builtBy, { authors: authorsHtml })}
			</p>
		</div>
	</div>
</footer>

<style>
	/* No margin-top: whatever precedes the footer carries its own bottom padding,
	   and adding a section gap on top of it left a dead band of empty page. */
	footer {
		border-top: 1px solid var(--border);
		background: var(--bg-subtle);
		padding-block: var(--space-7);
	}

	.inner {
		max-width: var(--container);
		margin-inline: auto;
		padding-inline: var(--gutter);
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		gap: var(--space-6);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		margin-right: auto;
	}

	.name {
		font-weight: 800;
		letter-spacing: var(--tracking-lat);
		letter-spacing: 0.02em;
	}

	.blurb {
		font-size: var(--text-sm);
		color: var(--text-muted);
	}

	.links {
		display: flex;
		gap: var(--space-5);
		font-size: var(--text-sm);
	}

	.links a {
		color: var(--text-muted);
		transition: color var(--dur-fast) var(--ease-out);
	}

	.links a:hover {
		color: var(--text);
	}

	.legal {
		flex-basis: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-2);
		padding-top: var(--space-5);
		border-top: 1px solid var(--border);
		font-size: var(--text-xs);
		color: var(--text-faint);
	}

	.legal :global(a) {
		color: var(--text-muted);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.legal :global(a:hover) {
		color: var(--brand);
	}
</style>
