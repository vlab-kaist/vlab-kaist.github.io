<script lang="ts">
	import type { Dict, KapoYear } from '$i18n/types';

	interface Props {
		kapo: Dict['kapo'];
	}

	let { kapo }: Props = $props();

	const r = $derived(kapo.record);

	// The dictionary lists years newest-first, like the timeline. A record
	// strip reads left to right in time, ending on the running total, so it is
	// flipped here rather than stored twice.
	const years = $derived([...r.years].reverse());

	const rows = $derived(
		(['ai', 'quiz'] as const).map((id) => {
			const outcomes = years.map((y: KapoYear) => y[id]);
			const w = outcomes.filter((o) => o === 'win').length;
			return {
				id,
				label: r[id],
				outcomes,
				total: r.total.replace('{w}', String(w)).replace('{l}', String(outcomes.length - w))
			};
		})
	);
</script>

<!--
  A real <table>: two events against five years is tabular data, and the row
  and column headers are what let a screen reader say "과학퀴즈, 2024, 승"
  instead of reading out a grid of syllables.
-->
<section class="record reveal" aria-labelledby="record-heading">
	<h2 id="record-heading">{r.heading}</h2>

	<div class="scroll">
		<table>
			<thead>
				<tr>
					<th scope="col"><span class="visually-hidden">{r.event}</span></th>
					{#each years as y (y.year)}
						<th scope="col" class="year">{y.year}</th>
					{/each}
					<th scope="col" class="overall">{r.overall}</th>
				</tr>
			</thead>
			<tbody>
				{#each rows as row (row.id)}
					<tr>
						<th scope="row">{row.label}</th>
						{#each row.outcomes as outcome, i (years[i].year)}
							<td>
								<span class="chip" class:win={outcome === 'win'}>
									{outcome === 'win' ? kapo.won : kapo.lost}
								</span>
							</td>
						{/each}
						<td class="overall">{row.total}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<style>
	h2 {
		font-size: var(--text-xl);
		margin-bottom: var(--space-4);
	}

	/* Only scrolls if a very narrow screen or a long English label forces it;
	   at 320px the Korean table still fits. */
	.scroll {
		overflow-x: auto;
	}

	table {
		width: 100%;
		max-width: 680px;
		border-collapse: collapse;
		font-variant-numeric: tabular-nums;
	}

	th,
	td {
		padding: var(--space-2) var(--space-2);
		text-align: center;
		white-space: nowrap;
	}

	thead th {
		font-size: var(--text-xs);
		font-weight: 600;
		color: var(--text-faint);
		border-bottom: 1px solid var(--border);
	}

	/* The newest year is the one this page is about. */
	thead .year:nth-last-child(2) {
		color: var(--text);
		font-weight: 800;
	}

	tbody th {
		text-align: left;
		padding-left: 0;
		font-size: var(--text-sm);
		font-weight: 700;
	}

	tbody tr + tr > * {
		border-top: 1px solid var(--border);
	}

	.chip {
		display: inline-grid;
		place-items: center;
		min-width: 2.4em;
		padding: 3px 8px;
		border-radius: var(--radius-full);
		border: 1px solid var(--border-strong);
		font-size: var(--text-xs);
		font-weight: 700;
		color: var(--text-faint);
	}

	.chip.win {
		border-color: transparent;
		background: var(--brand);
		color: var(--brand-contrast);
	}

	.overall {
		padding-left: var(--space-4);
		text-align: right;
	}

	td.overall {
		font-size: var(--text-sm);
		font-weight: 700;
	}

	/* Phone width: tighten the cells rather than let the total column scroll
	   out of view — the total is the point of the row. */
	@media (max-width: 480px) {
		th,
		td {
			padding: var(--space-2) 2px;
		}

		.chip {
			min-width: 2em;
			padding: 2px 6px;
		}

		.overall {
			padding-left: var(--space-2);
		}
	}
</style>
