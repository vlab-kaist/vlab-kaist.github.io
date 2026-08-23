<script lang="ts">
	import Picture from '$components/Picture.svelte';
	import Seo from '$components/Seo.svelte';
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
			<p class="eyebrow">{d.hero.eyebrow}</p>
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
			<Picture name="team-2025" alt={d.hero.imageAlt} sizes="340px" priority ratio={1.55} />
			<figcaption>{d.hero.imageCaption}</figcaption>
		</figure>
	</div>
</section>

<!-- ---------------------------- SCOREBOARD ---------------------------- -->
<!-- VLAB's story is numbers: scores, margins, training scale. Leading with them
     says more in one glance than a paragraph of prose could. Set in mono and
     banded off from the hero so it reads as a record, not as body copy. -->
<section class="scoreboard" aria-labelledby="scoreboard-heading">
	<div class="container">
		<h2 class="visually-hidden" id="scoreboard-heading">{d.stats.heading}</h2>
		<ul>
			{#each d.stats.items as stat (stat.label)}
				<li>
					<span class="stat-value">{stat.value}</span>
					<span class="stat-label">{stat.label}</span>
					{#if stat.note}<span class="stat-note">{stat.note}</span>{/if}
				</li>
			{/each}
		</ul>
	</div>
</section>

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
						<span class="index-label">{section.label}</span>
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
	   both themes or a contrast failure. Framed at 340px it is a photograph on a
	   page instead, and the headline gets to be black on paper. */
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
		flex: 1.3;
		min-width: min(320px, 100%);
	}

	.hero-copy .eyebrow {
		margin-bottom: 0.875rem;
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
		min-width: min(260px, 100%);
		max-width: 340px;
	}

	.hero-media :global(picture) {
		border-radius: var(--radius-photo);
		border: 1px solid var(--border);
		overflow: hidden;
	}

	/* Sans, not mono. The reference design set this credit in monospace, but the
	   caption is mostly hangul and no mono stack ships a Korean face — every
	   browser falls back mid-string and the spacing goes ragged. Mono is kept
	   for what it is actually good at here: the scores and the timeline dates. */
	.hero-media figcaption {
		margin-top: var(--space-2);
		font-size: var(--text-xs);
		color: var(--text-faint);
	}

	/* ---------------- Scoreboard ---------------- */

	.scoreboard {
		border-block: 1px solid var(--border);
		background: color-mix(in srgb, var(--brand-soft) 45%, transparent);
	}

	.scoreboard ul {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-5);
		padding-block: var(--space-6);
	}

	.stat-value {
		display: block;
		font-family: var(--font-mono);
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: var(--tracking-heading);
		line-height: 1.2;
	}

	.stat-label {
		display: block;
		font-size: 0.9rem;
		font-weight: 600;
		margin-top: var(--space-1);
		line-height: var(--leading-snug);
	}

	.stat-note {
		display: block;
		font-size: 0.78rem;
		color: var(--text-faint);
		line-height: var(--leading-snug);
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
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--surface);
		transition:
			border-color var(--dur-base) var(--ease-out),
			box-shadow var(--dur-base) var(--ease-out);
	}

	.index a:hover {
		border-color: var(--border-strong);
		box-shadow: var(--shadow-md);
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
		font-weight: 800;
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

	/* ---------------- Narrow screens ---------------- */

	@media (max-width: 720px) {
		.scoreboard ul {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
