<script lang="ts">
	import Picture from '$components/Picture.svelte';
	import type { ImageName } from '$data/images';

	interface Props {
		/** Leave unset until the photo exists; the slot shows an empty frame. */
		name?: ImageName;
		alt: string;
		/** Text inside the empty frame. */
		label: string;
		ratio: number;
		sizes?: string;
		priority?: boolean;
	}

	let { name, alt, label, ratio, sizes, priority = false }: Props = $props();
</script>

<!--
  A place for a photo the club has not sent yet. Same box, same ratio and the
  same frame as the photo that will go in it, so dropping the photo in later
  does not move anything else on the page. The label is plain text, not alt:
  there is no image here to describe.
-->
{#if name}
	<Picture {name} {alt} {sizes} {priority} {ratio} />
{:else}
	<div class="slot" style="aspect-ratio: {ratio}">
		<span>{label}</span>
	</div>
{/if}

<style>
	.slot {
		display: grid;
		place-items: center;
		width: 100%;
		padding: var(--space-4);
		border: 1.5px dashed var(--border-strong);
		border-radius: inherit;
		background: color-mix(in srgb, var(--bg-subtle) 70%, transparent);
		text-align: center;
	}

	span {
		font-size: var(--text-sm);
		color: var(--text-faint);
	}
</style>
