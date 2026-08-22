<script lang="ts">
	import Picture from './Picture.svelte';
	import type { ImageName } from '$data/images';
	import type { Dict } from '$i18n';

	interface Props {
		dict: Dict;
	}

	let { dict }: Props = $props();

	// Canonical image order. Captions in the dictionary pair with this by index,
	// so it must not be reordered — the display order lives in LAYOUT instead.
	const IMAGES: ImageName[] = [
		'life-practice',
		'life-festival',
		'life-picnic',
		'life-dinner',
		'life-strawberry'
	];

	// Display order and shape. The practice shot leads at double width because
	// it is the only photo that shows the club working; the three outdoor shots
	// share the second row. Picnic and strawberry are near-identical frames, so
	// they sit at opposite ends of that row rather than side by side.
	const LAYOUT: { image: ImageName; wide?: boolean }[] = [
		{ image: 'life-practice', wide: true },
		{ image: 'life-festival' },
		{ image: 'life-strawberry' },
		{ image: 'life-dinner' },
		{ image: 'life-picnic' }
	];

	const items = $derived(
		LAYOUT.map(({ image, wide }) => ({
			image,
			wide: wide ?? false,
			...dict.life.captions[IMAGES.indexOf(image)]
		}))
	);
</script>

<!--
  A plain grid, replacing the crossfading carousel the dark design used. Five
  photos is not enough material for a carousel to earn its autoplay, its pause
  affordance and its reduced-motion fallback; showing all five at once is both
  less code and more of the club visible at a glance.
-->
<ul class="grid">
	{#each items as item (item.image)}
		<li class="reveal" class:wide={item.wide}>
			<figure>
				<Picture
					name={item.image}
					alt={item.alt}
					sizes={item.wide
						? '(max-width: 560px) 92vw, (max-width: 900px) 92vw, 730px'
						: '(max-width: 560px) 92vw, (max-width: 900px) 46vw, 355px'}
				/>
				<figcaption>
					<span class="title">{item.title}</span>
					<span class="subtitle">{item.subtitle}</span>
				</figcaption>
			</figure>
		</li>
	{/each}
</ul>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-4);
	}

	.wide {
		grid-column: span 2;
	}

	figure {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	/* The ratios are chosen so that items sharing a row resolve to the same
	   height at equal column widths: 2.77 next to 1.35 in row one (the wide
	   item also eats the gap), 1.76 across row two. */
	figure :global(picture) {
		aspect-ratio: 1.35;
		border-radius: var(--radius-photo);
		border: 1px solid var(--border);
		overflow: hidden;
	}

	.wide figure :global(picture) {
		aspect-ratio: 2.77;
	}

	li:nth-child(n + 3) figure :global(picture) {
		aspect-ratio: 1.76;
	}

	figcaption {
		display: flex;
		flex-direction: column;
		line-height: var(--leading-snug);
	}

	.title {
		font-size: 0.95rem;
		font-weight: 700;
	}

	.subtitle {
		font-size: 0.82rem;
		color: var(--text-faint);
	}

	@media (max-width: 900px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}

		/* Ratios relax as the columns get wider, or the wide item flattens into
		   a letterbox. */
		figure :global(picture),
		li:nth-child(n + 3) figure :global(picture) {
			aspect-ratio: 1.5;
		}

		.wide figure :global(picture) {
			aspect-ratio: 2.2;
		}
	}

	@media (max-width: 560px) {
		.grid {
			grid-template-columns: 1fr;
		}

		.wide {
			grid-column: auto;
		}

		.wide figure :global(picture) {
			aspect-ratio: 1.5;
		}
	}
</style>
