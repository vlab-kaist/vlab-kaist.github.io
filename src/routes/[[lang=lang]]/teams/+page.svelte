<script lang="ts">
	import Picture from '$components/Picture.svelte';
	import Seo from '$components/Seo.svelte';
	import PageHead from '$components/PageHead.svelte';

	let { data } = $props();
	const d = $derived(data.dict);

	// AI leads. The club's own ordering: the AI event is what Vlab won most
	// recently and what most of the work on the projects page is for, so it goes
	// first here and in every paired mention in the copy (meta title, hero lead,
	// footer blurb, join). Half a swap would read as an oversight.
	//
	// Alternating rows: the first team leads with its photo, the second with its
	// text. Same components, mirrored — which is what stops two structurally
	// identical blocks from reading as a copy-paste.
	const teamRows = $derived([
		{ id: 'ai', team: d.teams.ai, image: 'rocketleague' as const, mirrored: false },
		{ id: 'quiz', team: d.teams.quiz, image: 'quiz-2025' as const, mirrored: true }
	]);
</script>

<Seo
	dict={d}
	locale={data.locale}
	path="/teams/"
	title="{d.teams.heading} · Vlab"
	description={d.teams.lead}
/>

<div class="container page">
	<PageHead eyebrow={d.nav.teams} title={d.teams.heading} lead={d.teams.lead} />

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
					<h2>{row.team.name}</h2>
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

<style>
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

	.team h2 {
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
</style>
