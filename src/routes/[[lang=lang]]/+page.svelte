<script lang="ts">
	import Picture from '$components/Picture.svelte';
	import Seo from '$components/Seo.svelte';
	import KapoResult from '$components/KapoResult.svelte';
	import KapoRecord from '$components/KapoRecord.svelte';
	import { localeHref } from '$i18n';

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
			<a class="hero-badge" href={d.join.ctaHref} target="_blank" rel="noopener noreferrer">
				{d.hero.badge}
				<span class="badge-arrow" aria-hidden="true">↗</span>
			</a>
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
			<Picture
				name="team-2025"
				alt={d.hero.imageAlt}
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
					<a class="glass" href={localeHref(data.locale, section.path)}>
						<!-- Same rule as PageHead: "연혁" over "연혁" reads as a typo. -->
						{#if section.label !== section.title}
							<span class="index-label">{section.label}</span>
						{/if}
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
		align-items: flex-end;
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

	/* Quiet by construction: a tinted pill at --text-xs, not a filled button.
	   It sits above the headline and must not compete with the two real CTAs
	   underneath it. */
	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.4em;
		margin-bottom: 0.875rem;
		padding: 5px 12px;
		border: 1px solid color-mix(in srgb, var(--brand) 22%, transparent);
		border-radius: var(--radius-full);
		background: var(--brand-soft);
		color: var(--brand);
		font-size: var(--text-xs);
		font-weight: 700;
		letter-spacing: var(--tracking-wide);
		transition:
			background-color var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out);
	}

	.hero-badge:hover {
		background: color-mix(in srgb, var(--brand) 14%, var(--brand-soft));
		border-color: color-mix(in srgb, var(--brand) 40%, transparent);
	}

	.badge-arrow {
		display: inline-block;
		transition: transform var(--dur-base) var(--ease-out);
	}

	.hero-badge:hover .badge-arrow,
	.hero-badge:focus-visible .badge-arrow {
		transform: translate(2px, -1px);
	}

	h1 {
		font-size: var(--text-4xl);
		letter-spacing: var(--tracking-display);
		margin-bottom: var(--space-5);
	}

	.hero-lead {
		font-size: 1.08rem;
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
		background: color-mix(in srgb, var(--bg-subtle) 60%, transparent);
	}

	.results :global(.record) {
		margin-top: var(--space-8);
	}

	/* ---------------- Section index ---------------- */

	.index ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--space-4);
	}

	.index a {
		position: relative;
		display: grid;
		/* The arrow gets its own column so a long lead can never run under it. */
		grid-template-columns: 1fr auto;
		align-content: start;
		gap: 0 var(--space-4);
		height: 100%;
		padding: var(--space-5);
		/* Surface, border, blur and hover all come from `.glass` in base.css. */
		border-radius: var(--radius-lg);
	}

	.index-label {
		grid-column: 1;
		font-size: var(--text-xs);
		font-weight: 700;
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--brand);
	}

	.index-title {
		grid-column: 1;
		margin-top: var(--space-2);
		font-size: 1.15rem;
		font-weight: 700;
		letter-spacing: var(--tracking-heading);
		line-height: var(--leading-snug);
	}

	.index-lead {
		grid-column: 1 / -1;
		margin-top: var(--space-2);
		font-size: 0.9rem;
		color: var(--text-muted);
	}

	.index-go {
		grid-column: 2;
		grid-row: 1 / span 2;
		align-self: center;
		font-size: 1.1rem;
		color: var(--text-faint);
		transition:
			transform var(--dur-base) var(--ease-out),
			color var(--dur-base) var(--ease-out);
	}

	.index a:hover .index-go {
		transform: translateX(3px);
		color: var(--brand);
	}
</style>
