<script lang="ts">
	import Picture from '$components/Picture.svelte';
	import Seo from '$components/Seo.svelte';

	let { data } = $props();
	const d = $derived(data.dict);

	// The join CTA is whichever channel is an address, so the button and the
	// listed contact can never drift apart.
	const emailHref = $derived(
		d.join.channels.find((c) => c.href.startsWith('mailto:'))?.href ?? '#join'
	);

	const teamPanels = $derived([
		{
			id: 'quiz',
			team: d.teams.quiz,
			image: 'quiz-2025' as const,
			accent: 'var(--brand-cyan)'
		},
		{
			id: 'ai',
			team: d.teams.ai,
			image: 'rocketleague' as const,
			accent: 'var(--brand-violet)'
		}
	]);

	const featured = $derived(d.projects.items.find((p) => p.featured));
	const rest = $derived(d.projects.items.filter((p) => !p.featured));
</script>

<Seo dict={d} locale={data.locale} />

<!-- ============================ HERO ============================ -->
<section class="hero">
	<div class="hero-media">
		<Picture name="team-2025" alt={d.hero.imageAlt} sizes="100vw" priority />
		<div class="hero-scrim"></div>
	</div>

	<div class="hero-body">
		<p class="eyebrow">{d.hero.eyebrow}</p>
		<h1>
			{d.hero.title}<br />
			<span class="gradient-text">{d.hero.titleAccent}</span>
		</h1>
		<p class="lead">{d.hero.lead}</p>
		<div class="hero-cta">
			<a class="btn btn-primary" href="#join">{d.hero.ctaPrimary}</a>
			<a class="btn btn-ghost" href="#projects">{d.hero.ctaSecondary}</a>
		</div>
	</div>

	<!-- ---------------------- SCOREBOARD ---------------------- -->
	<!-- VLAB's story is numbers: scores, margins, training scale. Leading with
	     them says more in one glance than a paragraph of prose could. -->
	<div class="scoreboard">
		<h2 class="visually-hidden">{d.stats.heading}</h2>
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
		<header class="section-head">
			<h2>{d.teams.heading}</h2>
			<p class="section-lead">{d.teams.lead}</p>
		</header>
	</div>

	<div class="container">
		<div class="panels">
			{#each teamPanels as panel (panel.id)}
				<article class="panel" style="--accent: {panel.accent}">
					<div class="panel-media">
						<Picture
							name={panel.image}
							alt={panel.team.imageAlt}
							sizes="(max-width: 900px) 92vw, 46vw"
						/>
					</div>
					<div class="panel-body">
						<h3>{panel.team.name}</h3>
						<p class="panel-tagline">{panel.team.tagline}</p>
						<p class="panel-text">{panel.team.body}</p>
						<ul class="panel-points">
							{#each panel.team.points as point (point)}
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
		<header class="section-head">
			<h2>{d.projects.heading}</h2>
			<p class="section-lead">{d.projects.lead}</p>
		</header>

		{#if featured}
			<article class="featured">
				<div class="featured-media">
					<Picture
						name="flex-rlbot"
						alt={featured.imageAlt ?? featured.name}
						sizes="(max-width: 900px) 92vw, 52vw"
					/>
				</div>
				<div class="featured-body">
					<ul class="tags">
						{#each featured.tags as tag (tag)}
							<li>{tag}</li>
						{/each}
					</ul>
					<h3>{featured.name}</h3>
					<p class="featured-tagline">{featured.tagline}</p>
					<p class="featured-text">{featured.body}</p>
				</div>
			</article>
		{/if}

		<ul class="cards">
			{#each rest as project (project.id)}
				<li>
					<article class="card">
						<h3>{project.name}</h3>
						<p class="card-tagline">{project.tagline}</p>
						<p class="card-text">{project.body}</p>
						<ul class="tags">
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

<!-- ============================ HISTORY ============================ -->
<section id="history" class="section">
	<div class="container">
		<header class="section-head">
			<h2>{d.history.heading}</h2>
			<p class="section-lead">{d.history.lead}</p>
		</header>

		<ol class="timeline">
			{#each d.history.entries as entry (entry.date + entry.title)}
				<li class:highlight={entry.highlight}>
					<time datetime={entry.date.replace('.', '-')}>{entry.date}</time>
					<div class="timeline-body">
						<h3>{entry.title}</h3>
						{#if entry.body}<p>{entry.body}</p>{/if}
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<!-- ============================ JOIN ============================ -->
<section id="join" class="section section-alt">
	<div class="container join">
		<div class="join-copy">
			<h2>{d.join.heading}</h2>
			<p class="join-lead">{d.join.lead}</p>
			<p class="join-text">{d.join.body}</p>

			<div class="join-actions">
				<!-- The club is not running an application form, so the mail address
				     is the call to action rather than a recruiting link. -->
				<a class="btn btn-primary" href={emailHref}>{d.join.cta}</a>
			</div>

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

		<div class="join-media">
			<Picture name="win-2025" alt={d.join.imageAlt} sizes="(max-width: 900px) 92vw, 44vw" />
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

	.section-alt {
		background: var(--bg-subtle);
		border-block: 1px solid var(--border);
	}

	.section-head {
		max-width: var(--measure);
		margin-bottom: var(--space-7);
	}

	.section-head h2 {
		font-size: var(--text-3xl);
	}

	.section-lead {
		margin-top: var(--space-4);
		font-size: var(--text-lg);
		color: var(--text-muted);
	}

	/* ---------------- Buttons ---------------- */

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.8rem 1.6rem;
		border-radius: var(--radius-full);
		font-weight: 600;
		font-size: var(--text-sm);
		transition:
			transform var(--dur-fast) var(--ease-out),
			background-color var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out);
	}

	.btn:active {
		transform: translateY(1px);
	}

	.btn-primary {
		background: #fff;
		color: #0a0a10;
	}

	.btn-primary:hover {
		background: #dcdcea;
	}

	.btn-ghost {
		border: 1px solid rgb(255 255 255 / 0.28);
		color: #fff;
		backdrop-filter: blur(6px);
	}

	.btn-ghost:hover {
		border-color: rgb(255 255 255 / 0.6);
		background: rgb(255 255 255 / 0.08);
	}

	/* ---------------- Hero ---------------- */

	.hero {
		position: relative;
		/* The team photo is 2.16:1. A taller hero would force `cover` to scale it
		   up and crop the sides away, which is where the pavilion framing lives. */
		min-height: min(86svh, 820px);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		isolation: isolate;
	}

	.hero-media {
		position: absolute;
		inset: 0;
		z-index: -2;
	}

	.hero-media :global(picture),
	.hero-media :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 38%;
	}

	/* z-index is relative to .hero-media, which is its own stacking context.
	   A negative value here would paint the scrim *behind* the <img> it is
	   meant to cover; it needs to sit above the image but below .hero-body. */
	.hero-scrim {
		position: absolute;
		inset: 0;
		z-index: 1;
		background: var(--scrim-v), var(--scrim-h);
	}

	.hero-body {
		max-width: var(--container);
		width: 100%;
		margin-inline: auto;
		padding: var(--space-9) var(--gutter) var(--space-7);
		color: #fff;
	}

	.eyebrow {
		font-size: var(--text-sm);
		font-weight: 600;
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: rgb(255 255 255 / 0.72);
		margin-bottom: var(--space-4);
	}

	.hero h1 {
		font-size: var(--text-5xl);
		font-weight: 800;
		max-width: 14ch;
	}

	/* The gradient wordmark needs a touch more weight to survive being clipped
	   to text at display size. */
	.hero h1 .gradient-text {
		font-weight: 900;
	}

	.lead {
		margin-top: var(--space-5);
		max-width: 46ch;
		font-size: var(--text-lg);
		color: rgb(255 255 255 / 0.82);
		line-height: var(--leading-normal);
	}

	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		margin-top: var(--space-6);
	}

	/* ---------------- Scoreboard ---------------- */

	.scoreboard {
		position: relative;
		background: color-mix(in srgb, var(--bg) 82%, transparent);
		backdrop-filter: blur(16px) saturate(150%);
		-webkit-backdrop-filter: blur(16px) saturate(150%);
		border-top: 1px solid var(--border);
	}

	.scoreboard ul {
		max-width: var(--container);
		margin-inline: auto;
		padding: var(--space-5) var(--gutter);
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-5);
	}

	.scoreboard li {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.stat-value {
		font-family: var(--font-mono);
		font-size: var(--text-2xl);
		font-weight: 700;
		letter-spacing: -0.02em;
		font-variant-numeric: tabular-nums;
		color: var(--text);
	}

	.stat-label {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--text);
	}

	.stat-note {
		font-size: var(--text-xs);
		color: var(--text-faint);
	}

	/* ---------------- Team panels ---------------- */

	.panels {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
		gap: var(--space-5);
	}

	.panel {
		display: flex;
		flex-direction: column;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-xl);
		overflow: hidden;
		transition:
			border-color var(--dur-base) var(--ease-out),
			transform var(--dur-base) var(--ease-out);
	}

	.panel:hover {
		border-color: var(--accent);
		transform: translateY(-3px);
	}

	/* Image first, then text — the old cards put the copy above the photo,
	   which read as a caption floating over nothing. */
	.panel-media {
		aspect-ratio: 16 / 9;
		overflow: hidden;
		border-bottom: 1px solid var(--border);
	}

	.panel-media :global(img) {
		transition: transform var(--dur-slow) var(--ease-out);
	}

	.panel:hover .panel-media :global(img) {
		transform: scale(1.03);
	}

	.panel-body {
		padding: var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		flex: 1;
	}

	.panel-body h3 {
		font-size: var(--text-2xl);
	}

	.panel-tagline {
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--accent);
	}

	.panel-text {
		color: var(--text-muted);
	}

	.panel-points {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		margin-top: auto;
		padding-top: var(--space-4);
		border-top: 1px dashed var(--border);
	}

	.panel-points li {
		position: relative;
		padding-left: var(--space-5);
		font-size: var(--text-sm);
		color: var(--text-muted);
	}

	.panel-points li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.62em;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
	}

	/* ---------------- Featured project ---------------- */

	.featured {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: var(--space-6);
		align-items: center;
		padding: var(--space-6);
		margin-bottom: var(--space-6);
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-xl);
		position: relative;
		overflow: hidden;
	}

	.featured::before {
		content: '';
		position: absolute;
		inset: 0 0 auto 0;
		height: 2px;
		background: var(--brand-gradient);
	}

	.featured-media {
		border-radius: var(--radius-lg);
		overflow: hidden;
		border: 1px solid var(--border);
	}

	.featured-body h3 {
		font-size: var(--text-3xl);
		margin-top: var(--space-3);
	}

	.featured-tagline {
		margin-top: var(--space-2);
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--brand);
	}

	.featured-text {
		margin-top: var(--space-4);
		color: var(--text-muted);
	}

	/* ---------------- Project cards ---------------- */

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
		gap: var(--space-5);
	}

	.card {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: var(--space-6);
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		transition:
			border-color var(--dur-base) var(--ease-out),
			background-color var(--dur-base) var(--ease-out);
	}

	.card:hover {
		border-color: var(--border-strong);
		background: var(--surface-hover);
	}

	.card h3 {
		font-size: var(--text-xl);
	}

	.card-tagline {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--brand);
	}

	.card-text {
		font-size: var(--text-sm);
		color: var(--text-muted);
	}

	.card-link {
		margin-top: auto;
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--text);
		display: inline-flex;
		gap: var(--space-2);
	}

	.card-link span {
		transition: transform var(--dur-fast) var(--ease-out);
	}

	.card-link:hover span {
		transform: translateX(3px);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-top: auto;
	}

	.tags li {
		padding: 0.2rem 0.6rem;
		border: 1px solid var(--border);
		border-radius: var(--radius-full);
		font-size: var(--text-xs);
		color: var(--text-faint);
	}

	.featured .tags {
		margin-top: 0;
	}

	/* ---------------- Timeline ---------------- */

	.timeline {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
		padding-left: var(--space-6);
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 5px;
		top: 6px;
		bottom: 6px;
		width: 1px;
		background: linear-gradient(to bottom, var(--border-strong), transparent);
	}

	.timeline li {
		position: relative;
		display: grid;
		grid-template-columns: 6.5rem 1fr;
		gap: var(--space-5);
		align-items: baseline;
	}

	.timeline li::before {
		content: '';
		position: absolute;
		left: calc(-1 * var(--space-6) + 1px);
		top: 0.55em;
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: var(--border-strong);
		outline: 4px solid var(--bg);
	}

	.timeline li.highlight::before {
		background: var(--brand);
	}

	.timeline time {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		font-variant-numeric: tabular-nums;
		color: var(--text-faint);
	}

	.timeline h3 {
		font-size: var(--text-lg);
	}

	.timeline li.highlight h3 {
		color: var(--brand);
	}

	.timeline-body p {
		margin-top: var(--space-2);
		font-size: var(--text-sm);
		color: var(--text-muted);
		max-width: var(--measure);
	}

	/* ---------------- Join ---------------- */

	.join {
		display: grid;
		grid-template-columns: 1fr 0.85fr;
		gap: var(--space-8);
		align-items: center;
	}

	.join-copy h2 {
		font-size: var(--text-3xl);
	}

	.join-lead {
		margin-top: var(--space-4);
		font-size: var(--text-xl);
		font-weight: 600;
		color: var(--brand);
	}

	.join-text {
		margin-top: var(--space-4);
		color: var(--text-muted);
		max-width: 44ch;
	}

	.join-actions {
		margin-top: var(--space-6);
	}

	.join .btn-primary {
		background: var(--brand);
		color: var(--brand-contrast);
	}

	.join .btn-primary:hover {
		background: var(--brand-500);
	}

	.channels {
		display: flex;
		gap: var(--space-6);
		margin-top: var(--space-6);
		padding-top: var(--space-5);
		border-top: 1px solid var(--border);
	}

	.channels dt {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
		color: var(--text-faint);
		margin-bottom: 2px;
	}

	.channels dd {
		margin: 0;
		font-size: var(--text-sm);
		font-weight: 600;
	}

	.channels a:hover {
		color: var(--brand);
	}

	.join-media {
		border-radius: var(--radius-xl);
		overflow: hidden;
		border: 1px solid var(--border);
		aspect-ratio: 4 / 3;
	}

	/* ---------------- Responsive ---------------- */

	@media (max-width: 900px) {
		.featured,
		.join {
			grid-template-columns: 1fr;
		}

		.featured-media {
			order: -1;
		}

		.join-media {
			aspect-ratio: 16 / 10;
		}
	}

	@media (max-width: 720px) {
		.scoreboard ul {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 560px) {
		.hero h1 {
			max-width: none;
		}

		.timeline li {
			grid-template-columns: 1fr;
			gap: var(--space-1);
		}

		.channels {
			flex-direction: column;
			gap: var(--space-4);
		}
	}
</style>
