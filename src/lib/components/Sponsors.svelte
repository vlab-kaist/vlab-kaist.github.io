<script lang="ts">
	import { base } from '$app/paths';
	import type { Dict } from '$i18n';

	interface Props {
		dict: Dict;
	}

	let { dict }: Props = $props();
</script>

{#if dict.sponsors.items.length}
	<section class="sponsors" aria-labelledby="sponsors-heading">
		<div class="inner">
			<h2 id="sponsors-heading">{dict.sponsors.heading}</h2>

			<ul>
				{#each dict.sponsors.items as sponsor (sponsor.name)}
					<li>
						<!-- rel="sponsored" is the correct annotation for a paid or
						     in-kind sponsor link; without it this reads to search engines
						     as an ordinary editorial endorsement. -->
						<a
							href={sponsor.href}
							target="_blank"
							rel="noopener noreferrer sponsored"
							title={sponsor.note ?? sponsor.name}
						>
							<img src="{base}/sponsors/{sponsor.logo}" alt={sponsor.name} loading="lazy" />
						</a>
						{#if sponsor.note}
							<p class="note">{sponsor.note}</p>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}

<style>
	/* The join section above sits on plain paper, so this band draws its own
	   rule; without it the sponsor logo floats in the gap between the club's
	   last words and the footer. */
	.sponsors {
		border-top: 1px solid var(--border);
		padding-block: var(--space-6);
	}

	.inner {
		max-width: var(--container);
		margin-inline: auto;
		padding-inline: var(--gutter);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-5);
		text-align: center;
	}

	h2 {
		font-size: var(--text-xs);
		font-weight: 600;
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--text-faint);
	}

	ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: var(--space-7);
	}

	li {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-2);
	}

	/* Sponsor marks sit quiet by default and come up on hover: this is a credit,
	   not an advertisement, and it should not out-shout the club's own content.
	   Opacity only — never a colour filter, which would alter someone's brand. */
	a {
		display: block;
		opacity: 0.65;
		transition:
			opacity var(--dur-base) var(--ease-out),
			transform var(--dur-base) var(--ease-out);
	}

	a:hover,
	a:focus-visible {
		opacity: 1;
		transform: translateY(-2px);
	}

	/* Sized against the wordmark, not the file. Elice's mark is lettering inside
	   a blob, so a good chunk of the height is the blob's own padding — at 30px
	   the actual word came out smaller than the label above it. */
	img {
		height: 38px;
		width: auto;
		max-width: 240px;
		object-fit: contain;
	}

	.note {
		font-size: var(--text-xs);
		color: var(--text-faint);
	}

	@media (max-width: 560px) {
		ul {
			gap: var(--space-5);
		}

		img {
			height: 32px;
		}
	}
</style>
