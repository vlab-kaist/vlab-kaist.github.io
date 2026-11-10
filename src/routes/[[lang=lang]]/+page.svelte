<script lang="ts">
	import PhotoSlot from '$components/PhotoSlot.svelte';
	import Seo from '$components/Seo.svelte';
	import KapoResult from '$components/KapoResult.svelte';
	import KapoRecord from '$components/KapoRecord.svelte';
	import { localeHref } from '$i18n';
	import { RECRUITING } from '$lib/config';

	let { data } = $props();
	const d = $derived(data.dict);

	// The home page is now an entrance, not the whole site: hero, the record,
	// and a way into each of the five sections. Everything that used to scroll
	// past below this lives at its own URL.
	const sections = $derived([
		{ path: '/teams/', label: d.nav.teams, title: d.teams.heading, lead: d.teams.lead },
		{ path: '/projects/', label: d.nav.projects, title: d.projects.heading, lead: d.projects.lead },
		{ path: '/life/', label: d.nav.life, title: d.life.heading, lead: d.life.lead },
		{ path: '/history/', label: d.nav.history, title: d.history.heading, lead: d.history.lead },
		{ path: '/join/', label: d.nav.join, title: d.join.heading, lead: d.join.lead }
	]);
</script>

<Seo dict={d} locale={data.locale} />

<!-- ============================ HERO ============================ -->
<section class="hero">
	<div class="container hero-inner">
		<div class="hero-copy">
			<span class="rule rule-gradient" aria-hidden="true"></span>
			<!-- The eyebrow used to read "KAIST 학술동아리", which the lead sentence
			     directly below already says. Trading a label for a live link costs
			     nothing and gives the one visitor who arrived already decided a
			     direct path to the form. It points at the form rather than at
			     /join/ on purpose: the 함께하기 button below goes to /join/, and two
			     hero elements with the same destination is one too many. -->
			<!-- Out of season the pill stays (people look for it) but stops
			     linking to a form nobody is reading. Pressing it says so, in
			     place, instead of sending the visitor somewhere to find out. -->
			<!-- unslop: was a tinted pill above the headline, a button that revealed
			     "closed" when pressed. Now one quiet line that just says it. -->
			{#if RECRUITING}
				<a class="hero-status" href={d.join.ctaHref} target="_blank" rel="noopener noreferrer">
					{d.hero.badge} <span aria-hidden="true">↗</span>
				</a>
			{:else}
				<p class="hero-status">{d.join.closed}</p>
			{/if}
			<h1>
				{d.hero.title}<br />{d.hero.titleAccent}
			</h1>
			<p class="hero-lead">{d.hero.lead}</p>
			<div class="hero-cta">
				<a class="btn btn-primary" href={localeHref(data.locale, '/join/')}>{d.hero.ctaPrimary}</a>
				<a class="btn btn-ghost" href={localeHref(data.locale, '/projects/')}>
					{d.hero.ctaSecondary}
				</a>
			</div>
		</div>

		<figure class="hero-media">
			<PhotoSlot
				name="team-2026"
				alt={d.hero.imageAlt}
				label={d.hero.photoSlot}
				sizes="(max-width: 900px) 92vw, 520px"
				priority
				ratio={1.5}
			/>
		</figure>
	</div>
</section>

<!-- ---------------------------- 카포전 ---------------------------- -->
<!-- This used to be a band of four stats (a score, a headcount, a final, a
     founding year). They were true but generic — the same big-number-small-
     label strip any club page has. What Vlab actually has to show is a result,
     so the band became the latest 카포전 itself, with the full record under it.
     The headcount moved into the hero lead; the RLBot final lives on the
     projects and history pages, where it has its own context. -->
<div class="results">
	<div class="container">
		<KapoResult kapo={d.kapo} />
		<KapoRecord kapo={d.kapo} />
	</div>
</div>

<!-- ---------------------------- SECTION INDEX ---------------------------- -->
<!-- The header nav is behind a burger on mobile, so the home page cannot rely
     on it as the only way in. Each card carries the section's own heading and
     lead, which is exactly the text that used to introduce it further down the
     old single page — so this costs no new copy. -->
<section class="index page">
	<div class="container">
		<h2 class="visually-hidden">{d.nav.menu}</h2>
		<ul>
			{#each sections as section (section.path)}
				<li class="reveal">
					<a href={localeHref(data.locale, section.path)}>
						<!-- Always rendered so the columns line up; empty when it would
						     only repeat the title ("연혁" over "연혁"). -->
						<span class="index-label">{section.label !== section.title ? section.label : ''}</span>
						<span class="index-title">{section.title}</span>
						<span class="index-lead">{section.lead}</span>
						<span class="index-go" aria-hidden="true">→</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	/* ---------------- Hero ---------------- */

	/* Deliberately not a full-bleed photo. The one the club has is a night shot,
	   and stretching it edge to edge meant either white text on a dark scrim in
	   both themes or a contrast failure. Framed, it is a photograph on a page
	   instead, and the headline gets to be black on paper.

	   It is framed large: at 520px it carries roughly the same visual weight as
	   the headline beside it, which is what stops the hero from reading as
	   "text, with a thumbnail". The credit line that used to sit under it is
	   gone — the group photo does not need to be captioned to be understood,
	   and the caption was the only small print above the fold. The location
	   still lives in the alt text, where it is doing real work. */
	.hero {
		padding-block: clamp(3.5rem, 8vw, 5.5rem) clamp(4rem, 9vw, 6rem);
	}

	.hero-inner {
		display: flex;
		gap: clamp(2rem, 5vw, 3.5rem);
		align-items: center;
		flex-wrap: wrap;
	}

	/* `min(…, 100%)` rather than a bare min-width on these two-column blocks.
	   The min-width is what makes the columns wrap instead of squeezing, but a
	   bare 320px also refuses to shrink below 320px — which overflows the page
	   on a 320px-wide phone. Capping it at the container's own width keeps the
	   wrap behaviour and drops the overflow. */
	.hero-copy {
		flex: 1.15;
		min-width: min(320px, 100%);
	}

	.hero-status {
		display: inline-block;
		margin-bottom: var(--space-3);
		font-size: var(--text-sm);
		color: var(--text-faint);
	}

	a.hero-status:hover {
		color: var(--text);
	}

	h1 {
		font-size: var(--text-4xl);
		letter-spacing: var(--tracking-display);
		margin-bottom: var(--space-5);
	}

	/* pre-line: the copy carries its own line break (see hero.lead in ko.ts). */
	.hero-lead {
		white-space: pre-line;
		font-size: 1.125rem;
		color: var(--text-muted);
		max-width: 46ch;
		margin-bottom: var(--space-6);
	}

	.hero-cta {
		display: flex;
		gap: var(--space-3);
		flex-wrap: wrap;
	}

	.hero-media {
		flex: 1;
		min-width: min(300px, 100%);
		max-width: 520px;
		/* Inherited by the empty PhotoSlot frame. */
		border-radius: var(--radius-lg);
	}

	.hero-media :global(picture) {
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		overflow: hidden;
		box-shadow: var(--shadow-lg);
	}

	/* ---------------- Results ---------------- */

	/* Banded off from the hero the way the old stats strip was: a hairline
	   above and below and a thin tint, translucent so the field behind the page
	   still drifts through. */
	.results {
		padding-block: var(--section-gap);
		border-block: 1px solid var(--border);
		background: var(--bg-subtle);
	}

	.results :global(.record) {
		margin-top: var(--space-8);
	}

	/* ---------------- Section index ---------------- */

	/* unslop: five equal glass cards in a 3 + 2 grid, with a hole, became a
	   contents list. Same text, one row per section, hairlines between. */
	.index ul {
		border-top: 1px solid var(--border);
	}

	.index li {
		border-bottom: 1px solid var(--border);
	}

	.index a {
		display: grid;
		grid-template-columns: 6rem minmax(0, 1fr) minmax(0, 1.3fr) 20px;
		align-items: baseline;
		gap: var(--space-1) var(--space-5);
		padding: var(--space-5) var(--space-4);
		margin-inline: calc(var(--space-4) * -1);
		border-radius: var(--radius-md);
		transition: background-color var(--dur-fast) var(--ease-out);
	}

	.index a:hover {
		background: var(--surface);
	}

	.index-label {
		font-size: var(--text-sm);
		color: var(--text-faint);
	}

	.index-title {
		font-size: var(--text-xl);
		font-weight: 600;
		line-height: var(--leading-snug);
	}

	.index-lead {
		font-size: 0.9375rem;
		color: var(--text-muted);
	}

	.index-go {
		justify-self: end;
		color: var(--text-faint);
		transition:
			transform var(--dur-fast) var(--ease-out),
			color var(--dur-fast) var(--ease-out);
	}

	.index a:hover .index-go {
		transform: translateX(2px);
		color: var(--text);
	}

	@media (max-width: 760px) {
		.index a {
			grid-template-columns: minmax(0, 1fr) 20px;
			margin-inline: 0;
			padding-inline: 0;
		}

		.index-label,
		.index-title,
		.index-lead {
			grid-column: 1;
		}

		.index-label:empty {
			display: none;
		}

		.index-go {
			grid-column: 2;
			grid-row: 1;
		}
	}
</style>
