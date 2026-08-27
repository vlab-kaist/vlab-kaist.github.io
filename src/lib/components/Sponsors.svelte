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
							{#if sponsor.logo}
								<img src="{base}/sponsors/{sponsor.logo}" alt={sponsor.name} loading="lazy" />
							{:else}
								<!-- No artwork yet. Set the name rather than leaving a hole: a
								     supporter who is credited in type still reads as credited,
								     and it keeps the band from collapsing to one logo. -->
								<span class="wordmark">{sponsor.name}</span>
							{/if}
						</a>
						{#if sponsor.note}
							<p class="note">{sponsor.note}</p>
						{/if}
					</li>
				{/each}
			</ul>

			<!-- The one block on the site addressed to companies rather than to
			     students, so it lives in the band they would already be looking at.
			     A question, one line of answer, and a button: an underlined 12px
			     link was findable only by someone already looking for it, which is
			     the wrong bar for the audience that pays for things.

			     Outlined rather than filled — the filled treatment belongs to the
			     student CTA ("지원하기"), and two solid buttons on one page means
			     neither is the primary action. -->
			<div class="contact">
				<p class="contact-heading">{dict.sponsors.contact.heading}</p>
				<p class="contact-body">{dict.sponsors.contact.body}</p>
				<a class="btn btn-ghost" href={dict.sponsors.contact.href}>
					{dict.sponsors.contact.label}
				</a>
			</div>
		</div>
	</section>
{/if}

<style>
	.contact {
		margin-top: var(--space-7);
		padding-top: var(--space-6);
		/* A rule rather than more whitespace: the logos above are a credit and
		   this is a pitch, and without the line the button reads as belonging to
		   the sponsor whose mark sits directly above it. */
		border-top: 1px solid var(--border);
	}

	.contact-heading {
		font-size: var(--text-lg);
		font-weight: 700;
		letter-spacing: var(--tracking-heading);
	}

	.contact-body {
		margin-top: var(--space-2);
		margin-bottom: var(--space-5);
		font-size: var(--text-sm);
		color: var(--text-muted);
	}

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
	   Opacity only — never a colour filter, which would alter someone's brand.
	   (The one exception is directly below, and it is the exception that proves
	   the rule.)

	   `li a`, not a bare `a`: the "후원하기" link below is an anchor in this same
	   component, and at 0.65 opacity its 12px text measured 3.18:1 on the dark
	   ground — a contrast failure produced entirely by a selector meant for
	   logos. Opacity dims text as happily as it dims an image. */
	li a {
		display: block;
		opacity: 0.65;
		transition:
			opacity var(--dur-base) var(--ease-out),
			transform var(--dur-base) var(--ease-out);
	}

	li a:hover,
	li a:focus-visible {
		opacity: 1;
		transform: translateY(-2px);
	}

	/* Placeholder credit. Sized to sit on the same optical line as a logo, and
	   deliberately quiet — it is a name, not a mark, and should not out-shout
	   the sponsors who did send artwork. */
	.wordmark {
		display: block;
		font-size: 0.95rem;
		font-weight: 700;
		letter-spacing: var(--tracking-heading);
		/* Matches the logo height below, so a name and a mark occupy the same
		   band and the row keeps one optical line however they are mixed. */
		line-height: 38px;
		color: var(--text);
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

	/* KAIST's School of Computing publishes only a monochrome dark lockup, which
	   is invisible on ink. Inverting a greyscale mark is the standard way to get
	   the light-on-dark version of it — it moves value, not hue, so nothing that
	   is part of the brand's colour is being changed. It is still a workaround:
	   the real fix is the department's own light or colour artwork, which is
	   logged in CONTENT-TODO.md. Scoped by attribute so it can never catch a
	   sponsor whose logo is already in colour. */
	:global(:root[data-theme='dark']) img[src*='kaist-cs'] {
		filter: invert(1);
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
