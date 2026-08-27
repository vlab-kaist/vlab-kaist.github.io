<script lang="ts">
	import Seo from '$components/Seo.svelte';
	import PageHead from '$components/PageHead.svelte';

	let { data } = $props();
	const d = $derived(data.dict);
</script>

<Seo
	dict={d}
	locale={data.locale}
	path="/history/"
	title="{d.history.heading} · Vlab"
	description={d.history.lead}
/>

<div class="container page">
	<PageHead eyebrow={d.nav.history} title={d.history.heading} lead={d.history.lead} />

	<ol class="timeline">
		{#each d.history.entries as entry (entry.date + entry.title)}
			<li class="reveal" class:highlight={entry.highlight}>
				<span class="rail" aria-hidden="true">
					<span class="dot"></span>
					<span class="line"></span>
				</span>
				<div class="entry">
					<time datetime={entry.date.replace('.', '-')}>{entry.date}</time>
					<h2>{entry.title}</h2>
					{#if entry.body}<p>{entry.body}</p>{/if}
				</div>
			</li>
		{/each}
	</ol>
</div>

<style>
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

	/* Tabular figures so every stamp in the column is exactly as wide as the
	   next — the alignment the old monospace stack was there for, without
	   dragging in a second typeface to get it. */
	.entry time {
		display: block;
		font-family: var(--font-numeric);
		font-variant-numeric: tabular-nums;
		font-size: 12.5px;
		letter-spacing: var(--tracking-lat);
		color: var(--text-faint);
		margin-bottom: var(--space-1);
	}

	.entry h2 {
		font-size: 1.02rem;
		font-weight: 700;
	}

	.highlight .entry h2 {
		color: var(--brand);
	}

	.entry p {
		font-size: 0.9rem;
		color: var(--text-muted);
		margin-top: var(--space-1);
	}
</style>
