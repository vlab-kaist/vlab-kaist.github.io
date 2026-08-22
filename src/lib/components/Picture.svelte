<script lang="ts">
	import { images, type ImageName } from '$data/images';
	import { base } from '$app/paths';

	interface Props {
		name: ImageName;
		alt: string;
		/** `sizes` attribute — tell the browser how wide this renders so it can pick correctly. */
		sizes?: string;
		/** Above the fold? Then load eagerly and bump fetch priority. */
		priority?: boolean;
		class?: string;
		/** Override the intrinsic ratio, e.g. to crop a wide photo into a card. */
		ratio?: number;
	}

	let {
		name,
		alt,
		sizes = '100vw',
		priority = false,
		class: className = '',
		ratio
	}: Props = $props();

	const meta = $derived(images[name]);

	const srcset = (ext: string) =>
		meta.widths.map((w) => `${base}/img/${name}-${w}.${ext} ${w}w`).join(', ');
</script>

<!--
  One <picture>, three formats, descending by how modern they are: AVIF for
  browsers that take it, WebP for the rest, and a JPEG so nothing ever gets a
  broken image. `width`/`height` are always emitted so the browser reserves the
  right box and the page does not shift as photos land.
-->
<picture class={className}>
	<source type="image/avif" srcset={srcset('avif')} {sizes} />
	<source type="image/webp" srcset={srcset('webp')} {sizes} />
	<img
		src="{base}/img/{name}-{meta.fallback}.jpg"
		{alt}
		width={meta.width}
		height={meta.height}
		loading={priority ? 'eager' : 'lazy'}
		fetchpriority={priority ? 'high' : 'auto'}
		decoding={priority ? 'sync' : 'async'}
		style={ratio ? `aspect-ratio: ${ratio}` : undefined}
	/>
</picture>

<style>
	/* height:100% so that a parent with a fixed aspect-ratio actually gets
	   filled. Without it the <picture> takes its intrinsic height and the img's
	   own height:100% resolves against auto, leaving a gap under the photo.
	   Where the parent has no set height this collapses to auto and is a no-op. */
	picture {
		display: block;
		height: 100%;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		background: var(--bg-subtle);
	}
</style>
