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
</script>

<footer>
	<div class="inner">
		<div class="brand">
			<Logo size={26} decorative />
			<div>
				<p class="name">VLAB</p>
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
			<p>
				<!-- rel="noopener" was missing on this link in the old footer. -->
				{@html fill(dict.footer.builtBy, {
					author:
						'<a href="https://seo-rii.github.io/" target="_blank" rel="noopener noreferrer">seo-rii</a>'
				})}
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
