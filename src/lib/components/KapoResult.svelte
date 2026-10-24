<script lang="ts">
	import Picture from '$components/Picture.svelte';
	import type { Dict } from '$i18n/types';

	interface Props {
		kapo: Dict['kapo'];
	}

	let { kapo }: Props = $props();
</script>

<!--
  The latest 카포전, one card per event. The scoreline is styled after the
  broadcast's own lower-third — KAIST on the left in blue, POSTECH on the right
  in red, split down the middle — because that is the picture anyone who
  watched already has in their head. It is the one loud thing on the home
  page; everything around it stays in the site's quiet paper-and-violet.

  Each scoreline is read out as a sentence ("KAIST 2 : 0 POSTECH") from a
  visually-hidden span; the big digits are aria-hidden so a screen reader does
  not announce "2", "colon", "0" as three separate things.
-->
<section class="kapo" aria-labelledby="kapo-heading">
	<header class="kapo-head reveal">
		<h2 id="kapo-heading">{kapo.heading}</h2>
		<p>{kapo.when}</p>
	</header>

	<div class="matches">
		{#each kapo.matches as match (match.id)}
			{@const [us, them] = match.score}
			<article class="match reveal">
				<figure class="match-media">
					<Picture
						name={match.image}
						alt={match.imageAlt}
						sizes="(max-width: 860px) 92vw, 540px"
						ratio={16 / 9}
					/>
				</figure>

				<p class="scoreline">
					<span class="visually-hidden">
						{kapo.us}
						{us} : {them}
						{kapo.them}, {us > them ? kapo.won : kapo.lost}
					</span>
					<span class="side side-us" aria-hidden="true">
						<span class="team">{kapo.us}</span>
						<span class="pts" class:lead={us > them}>{us}</span>
					</span>
					<span class="colon" aria-hidden="true">:</span>
					<span class="side side-them" aria-hidden="true">
						<span class="pts" class:lead={them > us}>{them}</span>
						<span class="team">{kapo.them}</span>
					</span>
				</p>

				<div class="match-body">
					<h3>
						{match.event}
						<span class="outcome" class:won={us > them}>{us > them ? kapo.won : kapo.lost}</span>
					</h3>
					<p class="format">{match.format}</p>
					<p class="text">{match.body}</p>
					<a class="watch" href={match.video} target="_blank" rel="noopener noreferrer">
						{kapo.watch}<span aria-hidden="true"> ↗</span>
					</a>
				</div>
			</article>
		{/each}
	</div>

	<p class="credit">{kapo.credit}</p>
</section>

<style>
	.kapo-head {
		margin-bottom: var(--space-6);
	}

	.kapo-head h2 {
		font-size: var(--text-3xl);
	}

	.kapo-head p {
		margin-top: var(--space-2);
		color: var(--text-muted);
		max-width: var(--measure);
	}

	.matches {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: var(--space-5);
	}

	.match {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--surface);
		overflow: hidden;
	}

	.match-media {
		border-bottom: 1px solid var(--border);
	}

	/* ---- Scoreline ---- */

	/* A two-colour top edge split exactly at the colon. The colon column is
	   `auto`, the sides are equal `1fr`s, so 50% is always the colon. */
	.scoreline {
		position: relative;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: var(--space-4);
		padding: var(--space-4) var(--space-5);
		background: var(--bg-subtle);
	}

	.scoreline::before {
		content: '';
		position: absolute;
		inset: 0 0 auto;
		height: 4px;
		background: linear-gradient(90deg, var(--kaist) 50%, var(--postech) 50%);
	}

	.side {
		display: flex;
		align-items: baseline;
		gap: var(--space-3);
		min-width: 0;
	}

	.side-us {
		justify-content: flex-end;
	}

	.team {
		font-size: var(--text-sm);
		font-weight: 800;
		letter-spacing: var(--tracking-lat);
	}

	.side-us .team {
		color: var(--kaist);
	}

	.side-them .team {
		color: var(--postech);
	}

	.pts,
	.colon {
		font-family: var(--font-numeric);
		font-variant-numeric: tabular-nums;
		font-size: clamp(2rem, 4.2vw, 2.9rem);
		font-weight: 800;
		line-height: 1;
		letter-spacing: var(--tracking-lat);
	}

	/* The losing number steps back rather than disappearing: the margin is the
	   story, so both figures have to be readable. */
	.pts {
		color: var(--text-faint);
	}

	.pts.lead {
		color: var(--text);
	}

	.colon {
		color: var(--text-faint);
		/* Optically centre the colon on the figures' x-height. */
		transform: translateY(-0.06em);
	}

	/* ---- Body ---- */

	.match-body {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: var(--space-5);
	}

	.match-body h3 {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		font-size: var(--text-xl);
	}

	.outcome {
		padding: 2px 10px;
		border-radius: var(--radius-full);
		border: 1px solid var(--border-strong);
		font-size: var(--text-xs);
		font-weight: 700;
		color: var(--text-muted);
	}

	.outcome.won {
		border-color: transparent;
		background: var(--brand);
		color: var(--brand-contrast);
	}

	.format {
		margin-top: var(--space-1);
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--brand);
	}

	.text {
		margin-top: var(--space-3);
		font-size: 0.95rem;
		color: var(--text-muted);
	}

	/* Pushed to the bottom so the two links line up across the pair even when
	   one body runs a line longer than the other. */
	.watch {
		margin-top: auto;
		padding-top: var(--space-4);
		align-self: flex-start;
		font-size: var(--text-sm);
		font-weight: 700;
		color: var(--text);
		text-decoration: underline;
		text-decoration-color: var(--border-strong);
		text-underline-offset: 4px;
		transition: text-decoration-color var(--dur-fast) var(--ease-out);
	}

	.watch:hover {
		text-decoration-color: var(--brand);
	}

	.credit {
		margin-top: var(--space-4);
		font-size: var(--text-xs);
		color: var(--text-faint);
	}

	@media (max-width: 860px) {
		.matches {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 420px) {
		.scoreline {
			gap: var(--space-3);
			padding-inline: var(--space-4);
		}

		.side {
			gap: var(--space-2);
		}

		.team {
			font-size: var(--text-xs);
		}
	}
</style>
