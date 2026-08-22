<script lang="ts">
	import Picture from '$components/Picture.svelte';
	import Seo from '$components/Seo.svelte';
	import LifeGrid from '$components/LifeGrid.svelte';

	let { data } = $props();
	const d = $derived(data.dict);

	// The join CTA is whichever channel is an address, so the button and the
	// listed contact can never drift apart.
	const emailHref = $derived(
		d.join.channels.find((c) => c.href.startsWith('mailto:'))?.href ?? '#join'
	);

	// Alternating rows: the quiz team leads with its photo, the AI team with its
	// text. Same components, mirrored — which is what stops two structurally
	// identical blocks from reading as a copy-paste.
	const teamRows = $derived([
		{ id: 'quiz', team: d.teams.quiz, image: 'quiz-2025' as const, mirrored: false },
		{ id: 'ai', team: d.teams.ai, image: 'rocketleague' as const, mirrored: true }
	]);

	const featured = $derived(d.projects.items.find((p) => p.featured));
	const rest = $derived(d.projects.items.filter((p) => !p.featured));
</script>

<Seo dict={d} locale={data.locale} />

<!--
  Every section opens the same way: a small accent label, a title, one line of
  lead, and a hairline rule under the lot. Repeating that exactly is what lets
  the sections below it differ as much as they do without the page coming apart.
-->
{#snippet sectionHead(eyebrow: string, heading: string, lead: string)}
	<header class="section-head reveal">
		<p class="eyebrow">{eyebrow}</p>
		<h2>{heading}</h2>
		<p class="section-lead">{lead}</p>
	</header>
{/snippet}

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
				<a class="btn btn-primary" href="#join">{d.hero.ctaPrimary}</a>
				<a class="btn btn-ghost" href="#projects">{d.hero.ctaSecondary}</a>
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

<!-- ============================ TEAMS ============================ -->
<section id="teams" class="section">
	<div class="container">
		{@render sectionHead(d.nav.teams, d.teams.heading, d.teams.lead)}

		<div class="team-rows">
			{#each teamRows as row (row.id)}
				<article class="team reveal" class:mirrored={row.mirrored}>
					<div class="team-media">
						<Picture
							name={row.image}
							alt={row.team.imageAlt}
							sizes="(max-width: 900px) 92vw, 420px"
							ratio={1.6}
						/>
					</div>
					<div class="team-body">
						<h3>{row.team.name}</h3>
						<p class="team-tagline">{row.team.tagline}</p>
						<p class="team-text">{row.team.body}</p>
						<ul class="team-points">
							{#each row.team.points as point (point)}
								<li>{point}</li>
							{/each}
						</ul>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- ============================ PROJECTS ============================ -->
<section id="projects" class="section section-alt">
	<div class="container">
		{@render sectionHead(d.nav.projects, d.projects.heading, d.projects.lead)}

		{#if featured}
			<!-- The only element on the page that carries the full brand gradient
			     as a device: one project is the reason the club is known, and it
			     gets the one gradient edge. -->
			<article class="featured reveal">
				<ul class="tags">
					{#each featured.tags as tag (tag)}
						<li>{tag}</li>
					{/each}
				</ul>
				<h3>{featured.name}</h3>
				<p class="featured-tagline">{featured.tagline}</p>
				<p class="featured-text">{featured.body}</p>
			</article>
		{/if}

		<ul class="cards">
			{#each rest as project (project.id)}
				<li class="reveal">
					<article class="card">
						<h3>{project.name}</h3>
						<p class="card-tagline">{project.tagline}</p>
						<p class="card-text">{project.body}</p>
						<ul class="tags tags-sm">
							{#each project.tags as tag (tag)}
								<li>{tag}</li>
							{/each}
						</ul>
						{#if project.repo}
							<a class="card-link" href={project.repo} target="_blank" rel="noopener noreferrer">
								{d.projects.viewRepo}
								<span aria-hidden="true">→</span>
							</a>
						{/if}
					</article>
				</li>
			{/each}
		</ul>
	</div>
</section>

<!-- ============================ LIFE ============================ -->
<section id="life" class="section">
	<div class="container">
		{@render sectionHead(d.nav.life, d.life.heading, d.life.lead)}
		<LifeGrid dict={d} />
	</div>
</section>

<!-- ============================ HISTORY ============================ -->
<section id="history" class="section section-alt">
	<div class="container">
		{@render sectionHead(d.nav.history, d.history.heading, d.history.lead)}

		<ol class="timeline">
			{#each d.history.entries as entry (entry.date + entry.title)}
				<li class="reveal" class:highlight={entry.highlight}>
					<span class="rail" aria-hidden="true">
						<span class="dot"></span>
						<span class="line"></span>
					</span>
					<div class="entry">
						<time datetime={entry.date.replace('.', '-')}>{entry.date}</time>
						<h3>{entry.title}</h3>
						{#if entry.body}<p>{entry.body}</p>{/if}
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- ============================ JOIN ============================ -->
<section id="join" class="section">
	<div class="container join">
		<div class="join-copy reveal">
			<!-- Solid, not gradient: the gradient marks brand moments, and this is
			     an ask. -->
			<span class="rule rule-solid" aria-hidden="true"></span>
			<h2>{d.join.heading}</h2>
			<p class="join-lead">{d.join.lead}</p>
			<p class="join-text">{d.join.body}</p>

			<!-- The club is not running an application form, so the mail address
			     is the call to action rather than a recruiting link. -->
			<a class="btn btn-primary" href={emailHref}>{d.join.cta}</a>

			<dl class="channels">
				{#each d.join.channels as channel (channel.label)}
					<div>
						<dt>{channel.label}</dt>
						<dd>
							<a
								href={channel.href}
								target={channel.href.startsWith('mailto:') ? undefined : '_blank'}
								rel={channel.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
							>
								{channel.value}
							</a>
						</dd>
					</div>
				{/each}
			</dl>
		</div>

		<div class="join-media reveal">
			<Picture name="win-2025" alt={d.join.imageAlt} sizes="(max-width: 900px) 92vw, 440px" />
		</div>
	</div>
</section>

<style>
	/* ---------------- Layout primitives ---------------- */

	.container {
		max-width: var(--container);
		margin-inline: auto;
		padding-inline: var(--gutter);
	}

	.section {
		padding-block: var(--section-gap);
	}

	/* Alternating bands, separated by a real hairline rather than the soft
	   fading dividers of the dark design — on paper a drawn line is the whole
	   point, and a gradient that fades to nothing just looks like a mistake. */
	.section-alt {
		border-top: 1px solid var(--border);
		background: var(--bg-subtle);
	}

	.rule {
		display: block;
		width: 36px;
		height: 3px;
		border-radius: 2px;
		margin-bottom: 1.125rem;
	}

	.rule-gradient {
		background: var(--brand-gradient);
	}

	.rule-solid {
		background: var(--brand);
	}

	.eyebrow {
		font-size: var(--text-xs);
		font-weight: 700;
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--brand);
	}

	.section-head {
		max-width: var(--measure);
		margin-bottom: var(--space-8);
		padding-bottom: 1.125rem;
		border-bottom: 1px solid var(--border);
	}

	.section-head h2 {
		margin-top: var(--space-2);
		font-size: var(--text-3xl);
	}

	.section-lead {
		margin-top: var(--space-3);
		color: var(--text-muted);
	}

	/* ---------------- Buttons ---------------- */

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.75rem 1.375rem;
		border-radius: var(--radius-md);
		font-weight: 600;
		font-size: 0.95rem;
		transition:
			background-color var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out),
			transform var(--dur-fast) var(--ease-out);
	}

	.btn:active {
		transform: translateY(1px);
	}

	.btn-primary {
		background: var(--brand);
		color: var(--brand-contrast);
	}

	.btn-primary:hover {
		background: var(--brand-strong);
	}

	.btn-ghost {
		border: 1px solid var(--border-strong);
		color: var(--text);
	}

	.btn-ghost:hover {
		border-color: var(--text-faint);
		background: var(--surface);
	}

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

	/* `min(…, 100%)` rather than a bare min-width on all of these two-column
	   blocks. The min-width is what makes the columns wrap instead of squeezing,
	   but a bare 320px also refuses to shrink below 320px — which overflows the
	   page on a 320px-wide phone. Capping it at the container's own width keeps
	   the wrap behaviour and drops the overflow. */
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

	/* ---------------- Teams ---------------- */

	.team-rows {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.team {
		display: flex;
		gap: var(--space-7);
		flex-wrap: wrap;
		align-items: flex-start;
	}

	.team-media {
		flex: 1;
		min-width: min(280px, 100%);
		max-width: 420px;
	}

	.team-media :global(picture) {
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		overflow: hidden;
	}

	.team-body {
		flex: 1;
		min-width: min(280px, 100%);
	}

	/* `order` rather than row-reverse: when the row wraps on a narrow screen the
	   photo must still come first in both rows, and row-reverse would flip one
	   of them so the text landed above its own heading's photo. */
	.mirrored .team-media {
		order: 2;
	}

	.team h3 {
		font-size: var(--text-2xl);
	}

	.team-tagline {
		font-weight: 600;
		color: var(--brand);
		margin-top: var(--space-1);
		margin-bottom: var(--space-4);
	}

	.team-text {
		font-size: 0.98rem;
		color: var(--text-muted);
		max-width: var(--measure-tight);
		margin-bottom: var(--space-5);
	}

	.team-points {
		list-style: disc;
		padding-left: 1.25rem;
		color: var(--text-body);
		font-size: 0.92rem;
		line-height: 1.9;
	}

	@media (max-width: 900px) {
		.mirrored .team-media {
			order: 0;
		}
	}

	/* ---------------- Projects ---------------- */

	.featured {
		position: relative;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--surface);
		padding: clamp(1.5rem, 4vw, 2.25rem);
		margin-bottom: var(--space-5);
		overflow: hidden;
	}

	.featured::before {
		content: '';
		position: absolute;
		inset: 0 0 auto 0;
		height: 2px;
		background: var(--brand-gradient);
	}

	.featured h3 {
		font-size: 1.5rem;
	}

	.featured-tagline {
		font-weight: 600;
		color: var(--brand);
		margin-top: var(--space-2);
		margin-bottom: 0.875rem;
	}

	.featured-text {
		font-size: 0.96rem;
		color: var(--text-muted);
		max-width: 70ch;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: var(--space-5);
	}

	.card {
		height: 100%;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border);
		border-radius: var(--radius-photo);
		background: var(--surface);
		padding: var(--space-5);
		transition:
			border-color var(--dur-base) var(--ease-out),
			box-shadow var(--dur-base) var(--ease-out);
	}

	.card:hover {
		border-color: var(--border-strong);
		box-shadow: var(--shadow-md);
	}

	.card h3 {
		font-size: 1.1rem;
		font-weight: 700;
	}

	.card-tagline {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--brand);
		margin-top: var(--space-1);
		margin-bottom: 0.625rem;
	}

	.card-text {
		font-size: 0.88rem;
		color: var(--text-muted);
		margin-bottom: var(--space-4);
	}

	/* Pushed to the bottom so every card's repo link lines up regardless of how
	   long its description runs. */
	.card .tags {
		margin-top: auto;
		margin-bottom: var(--space-3);
	}

	.card-link {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--brand);
	}

	.card-link:hover {
		color: var(--brand-strong);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-bottom: var(--space-4);
	}

	.tags li {
		font-size: var(--text-xs);
		padding: 3px 10px;
		border: 1px solid var(--border-strong);
		border-radius: var(--radius-full);
		color: var(--text-muted);
		line-height: 1.5;
	}

	.tags-sm li {
		font-size: 11px;
		padding: 2px 8px;
		color: var(--text-faint);
	}

	/* ---------------- History ---------------- */

	.timeline {
		max-width: 680px;
	}

	.timeline li {
		display: flex;
		gap: var(--space-5);
	}

	.rail {
		flex: none;
		width: 14px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--border-strong);
		flex: none;
	}

	/* Only the entries the club calls out get the gradient dot. If everything
	   were highlighted the timeline would just be a list of dots again. */
	.highlight .dot {
		background: var(--brand-gradient);
	}

	.line {
		width: 2px;
		flex: 1;
		background: var(--border-strong);
		margin-top: 2px;
	}

	.timeline li:last-child .line {
		display: none;
	}

	.entry {
		padding-bottom: var(--space-6);
	}

	.timeline li:last-child .entry {
		padding-bottom: 0;
	}

	.entry time {
		display: block;
		font-family: var(--font-mono);
		font-size: 12.5px;
		color: var(--text-faint);
		margin-bottom: var(--space-1);
	}

	.entry h3 {
		font-size: 1.02rem;
		font-weight: 700;
	}

	.highlight .entry h3 {
		color: var(--brand);
	}

	.entry p {
		font-size: 0.9rem;
		color: var(--text-muted);
		margin-top: var(--space-1);
	}

	/* ---------------- Join ---------------- */

	.join {
		display: flex;
		gap: clamp(2rem, 5vw, 3.5rem);
		flex-wrap: wrap;
		align-items: center;
	}

	.join-copy {
		flex: 1.1;
		min-width: min(320px, 100%);
	}

	.join-copy h2 {
		font-size: var(--text-3xl);
	}

	.join-lead {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--brand);
		margin-top: 0.875rem;
		margin-bottom: var(--space-4);
	}

	.join-text {
		color: var(--text-muted);
		max-width: 48ch;
		margin-bottom: var(--space-6);
	}

	.channels {
		display: flex;
		gap: var(--space-7);
		flex-wrap: wrap;
		margin-top: var(--space-6);
		padding-top: var(--space-5);
		border-top: 1px solid var(--border);
	}

	.channels dt {
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
		color: var(--text-faint);
		margin-bottom: var(--space-1);
	}

	.channels dd {
		margin: 0;
		font-size: 0.92rem;
		font-weight: 700;
	}

	.channels a:hover {
		color: var(--brand);
	}

	.join-media {
		flex: 1;
		min-width: min(280px, 100%);
		max-width: 440px;
	}

	.join-media :global(picture) {
		aspect-ratio: 1.35;
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		overflow: hidden;
	}

	/* ---------------- Narrow screens ---------------- */

	@media (max-width: 720px) {
		.scoreboard ul {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 400px) {
		.channels {
			gap: var(--space-5);
		}
	}
</style>
