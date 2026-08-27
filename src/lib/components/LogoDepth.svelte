<script lang="ts">
	/**
	 * The Vlab mark, extruded, as the 404 page's subject.
	 *
	 * Scoped to the 404 on purpose. It was briefly the background of every page
	 * and it was too much there — a large moving object competing with the copy
	 * on pages that have real work to do. A 404 has no work to do. It is the one
	 * page people reach by accident, with room for the mark to be the thing you
	 * look at rather than the wallpaper.
	 *
	 * Not WebGL. The mark is a flat vector silhouette, and an extruded flat
	 * silhouette is what CSS 3D transforms are for: 14 copies of the path pushed
	 * apart on Z inside a `preserve-3d` parent, with the gradient mark on the
	 * front face. three.js would have cost ~150KB gzipped plus a render loop
	 * plus a canvas kept in sync with the theme, to draw a shape with no
	 * curvature, no lighting model and no camera moves. This ships no
	 * JavaScript.
	 *
	 * The turn is a one-shot entrance that settles, never a loop. A 404 has no
	 * scroll to drive anything, and a permanently spinning mark on an otherwise
	 * empty page is a loading spinner by another name. Under
	 * prefers-reduced-motion it holds the settled pose from the first frame.
	 *
	 * It sits in the lower-right, bleeding off both edges, and never behind the
	 * copy. Centred, it put 14px muted text on top of the bright violet body —
	 * and axe-core passed that in both themes, because axe compares text against
	 * the background *colour* and cannot see an SVG sibling painted behind it.
	 */
	interface Props {
		/** How many extrusion slices. More is smoother and costs more raster. */
		layers?: number;
		/** Z distance between slices, in px. */
		step?: number;
	}

	let { layers = 14, step = 5 }: Props = $props();

	// Same path as Logo.svelte, and it has to stay the same. fill-rule evenodd is
	// load-bearing: under the default nonzero rule this fills in as a solid
	// triangle instead of a V.
	const V_PATH =
		'M2547.29 866.055l41.17 71.316h1.05l41.37-71.316zm-778.17 0L2200 1608.95l339.19-584.81h-678.38l-50.32-86.769h677.78l-11.3-19.575h0l-29.87-51.741h0 0z';

	const slices = $derived(Array.from({ length: layers }, (_, i) => i));
</script>

<div class="stage" aria-hidden="true">
	<!-- The path is defined once and referenced by every slice. Inlining it per
	     slice cost 5.2KB of HTML on every page, for fifteen copies of the same
	     230-character string — on a site that self-hosts its fonts to save one
	     CDN hop, that is not a rounding error. -->
	<svg class="defs" viewBox="1740 730 940 900" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<path id="v-depth" d={V_PATH} fill-rule="evenodd" />
			<linearGradient id="v-depth-face" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0" stop-color="var(--brand-crimson)" />
				<stop offset="0.5" stop-color="var(--brand-violet)" />
				<stop offset="1" stop-color="var(--brand-cyan)" />
			</linearGradient>
		</defs>
	</svg>

	<div class="mark">
		{#each slices as i (i)}
			<svg
				class="slice"
				viewBox="1740 730 940 900"
				xmlns="http://www.w3.org/2000/svg"
				style="--z: {-i * step}px; --i: {i}; --n: {layers}"
			>
				<use href="#v-depth" />
			</svg>
		{/each}

		<!-- Front face: the real mark, carrying the brand gradient. -->
		<svg class="face" viewBox="1740 730 940 900" xmlns="http://www.w3.org/2000/svg">
			<use href="#v-depth" fill="url(#v-depth-face)" />
		</svg>
	</div>
</div>

<style>
	/* Lower-right and bleeding off both edges rather than centred: centred put
	   14px muted text on top of the bright violet body. See the note at the top
	   of this file for why no automated check caught that. */
	.stage {
		position: absolute;
		bottom: -14vh;
		right: -12vw;
		width: min(72vw, 560px);
		aspect-ratio: 940 / 900;
		z-index: -1;
		pointer-events: none;
		perspective: 1400px;
		opacity: 0.26;
	}

	:global(:root[data-theme='dark']) .stage {
		opacity: 0.42;
	}

	/* The object's own bloom — the only colour on an otherwise empty page. */
	.stage::before {
		content: '';
		position: absolute;
		inset: -30%;
		z-index: -1;
		background: radial-gradient(
			circle at 45% 45%,
			color-mix(in srgb, var(--brand-violet) 55%, transparent),
			transparent 62%
		);
		filter: blur(60px);
		opacity: 0.5;
	}

	.mark {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		/* The static pose. Everything below only ever overrides this. */
		transform: rotateX(8deg) rotateY(-26deg) rotateZ(-3deg);
	}

	/* Definitions only; nothing to paint. */
	.defs {
		position: absolute;
		width: 0;
		height: 0;
	}

	.slice,
	.face {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	/* Extrusion slices. They darken with depth so the side of the object reads
	   as a side and not as motion blur — the far slices are nearly the page
	   ground, the near ones carry a little brand colour. */
	.slice {
		transform: translateZ(var(--z));
		fill: color-mix(
			in srgb,
			var(--brand-violet) calc((1 - var(--i) / var(--n)) * 55%),
			var(--depth-shade)
		);
		opacity: calc(1 - (var(--i) / var(--n)) * 0.45);
	}

	.face {
		transform: translateZ(1px);
	}

	:global(:root) {
		--depth-shade: #1a1730;
	}

	:global(:root[data-theme='dark']) .slice {
		--depth-shade: #05040a;
	}

	/* One-shot, not a loop: it turns in once and settles on the static pose.
	   A 404 has no scroll to drive anything, and a permanently spinning mark on
	   a page with nothing else on it is a loading spinner by another name. */
	@media (prefers-reduced-motion: no-preference) {
		.mark {
			animation: settle 2.4s var(--ease-out) both;
		}
	}

	@keyframes settle {
		from {
			transform: rotateX(16deg) rotateY(-62deg) rotateZ(-6deg);
		}
		to {
			transform: rotateX(8deg) rotateY(-26deg) rotateZ(-3deg);
		}
	}

	/* Without 3D support the stack collapses to one flat mark; drop the slices
	   so it does not render as a smear. */
	@supports not (transform-style: preserve-3d) {
		.slice {
			display: none;
		}
	}

	@media (max-width: 800px) {
		.stage {
			width: 88vw;
			right: -26vw;
			bottom: -10vh;
			opacity: 0.2;
		}

		:global(:root[data-theme='dark']) .stage {
			opacity: 0.34;
		}
	}
</style>
