<script lang="ts">
	import Seo from '$components/Seo.svelte';
	import PageHead from '$components/PageHead.svelte';

	let { data } = $props();
	const d = $derived(data.dict);

	const featured = $derived(d.projects.items.find((p) => p.featured));
	const rest = $derived(d.projects.items.filter((p) => !p.featured));
</script>

<Seo
	dict={d}
	locale={data.locale}
	path="/projects/"
	title="{d.projects.heading} — Vlab"
	description={d.projects.lead}
/>

<div class="container page">
	<PageHead eyebrow={d.nav.projects} title={d.projects.heading} lead={d.projects.lead} />

	{#if featured}
		<!-- The only element on the site that carries the full brand gradient as a
		     device: one project is the reason the club is known, and it gets the
		     one gradient edge. -->
		<article class="featured glass reveal">
			<ul class="tags">
				{#each featured.tags as tag (tag)}
					<li>{tag}</li>
				{/each}
			</ul>
			<h2>{featured.name}</h2>
			<p class="featured-tagline">{featured.tagline}</p>
			<p class="featured-text">{featured.body}</p>
		</article>
	{/if}

	<ul class="cards">
		{#each rest as project (project.id)}
			<li class="reveal">
				<article class="card glass">
					<h2>{project.name}</h2>
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

<style>
	.featured {
		position: relative;
		/* Surface, border, blur and hover come from `.glass` in base.css; the
		   gradient top edge below is the only thing this rule still owns. */
		border-radius: var(--radius-lg);
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

	.featured h2 {
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
		/* Surface, border, blur and hover: `.glass` in base.css. */
		border-radius: var(--radius-photo);
		padding: var(--space-5);
	}

	.card h2 {
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
	.card :global(.tags) {
		margin-top: auto;
		margin-bottom: var(--space-3);
	}

	.card-link {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--brand);
	}

	/* The arrow leads the hover: it moves, the label does not. Moving the whole
	   line would reflow the card's last row against its neighbours. */
	.card-link span {
		display: inline-block;
		transition: transform var(--dur-base) var(--ease-out);
	}

	.card-link:hover {
		color: var(--brand-strong);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.card-link:hover span,
	.card-link:focus-visible span {
		transform: translateX(4px);
	}
</style>
