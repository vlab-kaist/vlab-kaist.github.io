<script lang="ts">
	interface Props {
		/** Small accent label above the title — the nav label for this page. */
		eyebrow: string;
		title: string;
		lead: string;
		/** Gradient is the brand device; the join page uses a solid rule instead. */
		rule?: 'none' | 'gradient' | 'solid';
	}

	let { eyebrow, title, lead, rule = 'none' }: Props = $props();

	// The history page's nav label and its heading are both "연혁", and printing
	// the same word twice in two sizes reads as a mistake. Every other page has
	// a short label over a longer title, which is the point of the pattern.
	const showEyebrow = $derived(eyebrow !== title);
</script>

<header class="page-head reveal">
	{#if rule !== 'none'}
		<span class="rule rule-{rule}" aria-hidden="true"></span>
	{/if}
	{#if showEyebrow}
		<p class="eyebrow">{eyebrow}</p>
	{/if}
	<h1>{title}</h1>
	<p class="page-lead">{lead}</p>
</header>
