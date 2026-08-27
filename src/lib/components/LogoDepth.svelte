<script lang="ts">
	/**
	 * The Vlab mark, extruded and turning with the scroll.
	 *
	 * Not WebGL. The mark is a flat vector silhouette, and an extruded flat
	 * silhouette is exactly what CSS 3D transforms are for: a stack of copies
	 * pushed apart on Z inside a `preserve-3d` parent is a solid object as far
	 * as the compositor is concerned. three.js would have cost ~150KB gzipped
	 * plus a render loop plus a canvas that has to be kept in sync with the
	 * theme, to draw a shape that has no curvature, no lighting model and no
	 * camera moves. This costs one component and no JavaScript at all.
	 *
	 * The rotation is driven by `animation-timeline: scroll()`, not by time.
	 * That matters for more than novelty: a time-based loop is autoplaying
	 * motion that never stops, which the interface guidelines say needs a pause
	 * control once it runs past five seconds. Scroll-driven motion has a pause
	 * control already — it is called not scrolling. Every frame is something
	 * the visitor asked for.
	 *
	 * Degradation, in order of how much the browser supports:
	 *   scroll timelines           → turns as you scroll
	 *   no scroll-timeline support → holds the static angled pose below
	 *   prefers-reduced-motion     → holds the static angled pose
	 *   no 3D transforms at all    → a single flat mark at low opacity
	 * The pose is set on the element itself and the animation only overrides it,
	 * so every fallback lands on something deliberate rather than on a flat
	 * front-facing shape.
	 */

	interface Props {
		/** How many extrusion slices. More is smoother and costs more raster. */
		layers?: number;
		/** Z distance between slices, in px. */
		step?: number;
		/**
		 * `ambient` — fixed behind the whole page, turning with the scroll.
		 * `feature` — the object itself, centred. Used on the 404, which has no
		 *   scroll to drive anything and nothing else on it to look at, so the
		 *   turn there is a one-shot entrance that settles rather than a loop.
		 */
		placement?: 'ambient' | 'feature';
	}

	let { layers = 14, step = 5, placement = 'ambient' }: Props = $props();

	// Same path as Logo.svelte, and it has to stay the same. fill-rule evenodd is
	// load-bearing: under the default nonzero rule this fills in as a solid
	// triangle instead of a V.
	const V_PATH =
		'M2547.29 866.055l41.17 71.316h1.05l41.37-71.316zm-778.17 0L2200 1608.95l339.19-584.81h-678.38l-50.32-86.769h677.78l-11.3-19.575h0l-29.87-51.741h0 0z';

	const slices = $derived(Array.from({ length: layers }, (_, i) => i));
</script>

<div class="stage {placement}" aria-hidden="true">
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
	.stage {
		position: fixed;
		/* Off the right edge and vertically centred: the hero's own photo owns
		   the right column, so the mark sits behind and past it rather than
		   competing for the same rectangle. */
		top: 50%;
		right: -11vw;
		width: min(32vw, 430px);
		aspect-ratio: 940 / 900;
		translate: 0 -50%;
		z-index: -1;
		pointer-events: none;
		perspective: 1400px;
		/* Fades out before the footer so the page still ends on solid ground
		   rather than trailing off into a shape. */
		mask-image: linear-gradient(to bottom, transparent, #000 18%, #000 78%, transparent);
	}

	/* The object's own bloom. With the liquid field gone this is the only colour
	   on an otherwise plain page, which matters most in light mode — paper with
	   a faint grey mark on it is the "boring plain screen" we started from. It
	   belongs to the mark rather than being a second ambient system: it is
	   anchored to the object, scales with it, and dies with it. */
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
		opacity: var(--bloom-opacity, 0.5);
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

	.stage {
		/* Low enough that it never competes with a text block that happens to
		   scroll past it. It is an object in the room, not a graphic on the
		   page. */
		opacity: var(--depth-opacity, 0.16);
	}

	:global(:root[data-theme='dark']) .stage {
		--depth-opacity: 0.34;
	}

	:global(:root[data-theme='dark']) .slice {
		--depth-shade: #05040a;
	}

	/* 404: the mark is the subject, but it is not allowed behind the copy.
	   Centring it put muted 14px text on top of the bright violet body — axe
	   passes that, because axe compares text against the background *colour*
	   and cannot see an SVG sibling painted behind it, which is exactly the
	   kind of contrast failure an automated check will never catch. So it sits
	   in the lower-right instead, bleeding off both edges: still the largest
	   thing on the page, still the first thing you see, and never underneath a
	   word. */
	.stage.feature {
		position: absolute;
		top: auto;
		bottom: -14vh;
		left: auto;
		right: -12vw;
		width: min(72vw, 560px);
		translate: none;
		opacity: 0.26;
		mask-image: none;
	}

	:global(:root[data-theme='dark']) .stage.feature {
		opacity: 0.42;
	}

	/* One-shot, not a loop: it turns in once and settles on the static pose.
	   A 404 has no scroll to drive anything, and a permanently spinning mark on
	   a page with nothing else on it is a loading spinner by another name. */
	@media (prefers-reduced-motion: no-preference) {
		.feature .mark {
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

	/* Scroll-driven rotation. `scroll(root)` maps the document's whole scroll
	   range onto the animation, so the mark makes exactly one pass from top of
	   page to bottom no matter how long the page is. */
	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: scroll()) {
			.ambient .mark {
				animation: turn linear both;
				animation-timeline: scroll(root);
			}
		}
	}

	@keyframes turn {
		from {
			transform: rotateX(10deg) rotateY(-40deg) rotateZ(-4deg);
		}
		to {
			transform: rotateX(-6deg) rotateY(26deg) rotateZ(3deg);
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
			width: 56vw;
			right: -24vw;
			--depth-opacity: 0.07;
		}

		:global(:root[data-theme='dark']) .stage {
			--depth-opacity: 0.22;
		}
	}
</style>
