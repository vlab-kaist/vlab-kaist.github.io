<!--
  The ambient field the whole site sits on: four large brand-coloured blooms
  that drift, overlap and — because each one is heavily blurred — merge where
  they cross, which is what reads as "liquid" rather than "four circles".

  Painting: `position: fixed; z-index: -1` puts it above the body's flat --bg
  and below every content box. Transparent sections (hero, page bodies) let it
  through; solid or glass panels sit on top of it. That difference is the whole
  effect — depth comes from what covers the field, not from the field itself.

  Performance: the drift animates `transform` only, so it stays on the
  compositor and never triggers layout or paint. The organic shape is a static
  per-blob `border-radius`; animating that instead would look wetter and would
  also re-rasterise a 55vw blurred element every frame.

  It is decorative and inert: aria-hidden, pointer-events: none, and under
  prefers-reduced-motion the blooms simply stop where they are.
-->
<div class="liquid" aria-hidden="true">
	<span class="blob blob-1"></span>
	<span class="blob blob-2"></span>
	<span class="blob blob-3"></span>
	<span class="blob blob-4"></span>
</div>

<style>
	.liquid {
		position: fixed;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		pointer-events: none;
		/* Let the field fade out before the footer, so the page ends on solid
		   ground instead of trailing off into colour. */
		mask-image: linear-gradient(to bottom, #000 0%, #000 62%, transparent 100%);
	}

	.blob {
		position: absolute;
		opacity: var(--liquid-opacity);
		filter: blur(var(--liquid-blur));
		will-change: transform;
	}

	/* Lopsided radii — a blurred perfect circle still reads as a circle. */
	.blob-1 {
		width: 52vw;
		height: 46vw;
		top: -12vw;
		right: -6vw;
		border-radius: 58% 42% 47% 53% / 52% 46% 54% 48%;
		background: radial-gradient(circle at 40% 40%, var(--brand-violet), transparent 70%);
		animation: drift-1 38s var(--ease-in-out) infinite alternate;
	}

	.blob-2 {
		width: 46vw;
		height: 44vw;
		top: 26%;
		left: -16vw;
		border-radius: 44% 56% 62% 38% / 48% 55% 45% 52%;
		background: radial-gradient(circle at 55% 45%, var(--brand-cyan), transparent 70%);
		animation: drift-2 46s var(--ease-in-out) infinite alternate;
	}

	.blob-3 {
		width: 40vw;
		height: 38vw;
		bottom: 4%;
		right: -4vw;
		border-radius: 51% 49% 39% 61% / 57% 43% 57% 43%;
		background: radial-gradient(circle at 45% 55%, var(--brand-crimson), transparent 72%);
		animation: drift-3 42s var(--ease-in-out) infinite alternate;
	}

	/* The one that does the merging: it crosses the paths of 1 and 2, and where
	   three blurred fields overlap the hue goes somewhere none of them are. */
	.blob-4 {
		width: 34vw;
		height: 36vw;
		top: 8%;
		left: 32%;
		border-radius: 63% 37% 55% 45% / 41% 59% 41% 59%;
		background: radial-gradient(circle at 50% 50%, var(--brand-violet), transparent 74%);
		animation: drift-4 52s var(--ease-in-out) infinite alternate;
	}

	@keyframes drift-1 {
		to {
			transform: translate3d(-7vw, 6vh, 0) scale(1.14) rotate(-8deg);
		}
	}

	@keyframes drift-2 {
		to {
			transform: translate3d(8vw, -5vh, 0) scale(1.1) rotate(10deg);
		}
	}

	@keyframes drift-3 {
		to {
			transform: translate3d(-5vw, -7vh, 0) scale(1.18) rotate(6deg);
		}
	}

	@keyframes drift-4 {
		to {
			transform: translate3d(6vw, 9vh, 0) scale(1.22) rotate(-12deg);
		}
	}

	/* Phones: fewer, smaller, cheaper. A 52vw blurred bloom on a 390px screen is
	   most of the viewport, and four of them is a lot of fill rate for a
	   background nobody is looking at. */
	@media (max-width: 720px) {
		.blob {
			filter: blur(calc(var(--liquid-blur) * 0.6));
		}

		.blob-4 {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.blob {
			animation: none;
		}
	}
</style>
