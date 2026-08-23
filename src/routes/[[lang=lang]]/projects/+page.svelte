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
	title="{d.projects.heading} — VLAB"
	description={d.projects.lead}
/>

<div class="container page">
	<PageHead eyebrow={d.nav.projects} title={d.projects.heading} lead={d.projects.lead} />

	{#if featured}
		<!-- The only element on the site that carries the full brand gradient as a
		     device: one project is the reason the club is known, and it gets the
		     one gradient edge. -->
		<article class="featured reveal">
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
				<article class="card">
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

	.card-link:hover {
		color: var(--brand-strong);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
