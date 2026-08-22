<!--
  Ambient background. A fixed layer of large, soft brand-coloured blooms that
  sit behind all content and drift slowly, so the dark page reads as atmosphere
  rather than flat #0a0a10.

  Painting: this is a fixed child at z-index -1, so it paints above the body's
  own background but beneath every content box. Plain sections are transparent
  and let it through; solid panels (.section-alt, cards) cover it locally, which
  is what gives the page its sense of depth. The hero has its own photo and sits
  on top of this entirely.

  It is decorative and inert: aria-hidden, pointer-events:none, and the drift is
  removed under prefers-reduced-motion.
-->
<div class="aurora" aria-hidden="true">
	<span class="bloom bloom-1"></span>
	<span class="bloom bloom-2"></span>
	<span class="bloom bloom-3"></span>
</div>

<style>
	.aurora {
		position: fixed;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		pointer-events: none;
		/* Fade the whole field toward the bottom so the footer stays grounded. */
		mask-image: linear-gradient(to bottom, #000 0%, #000 70%, transparent 100%);
	}

	.bloom {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: var(--bloom-opacity, 0.5);
		will-change: transform;
	}

	.bloom-1 {
		width: 55vw;
		height: 55vw;
		top: -10vw;
		right: -8vw;
		background: radial-gradient(circle, var(--brand-violet), transparent 68%);
		animation: drift-1 34s var(--ease-in-out) infinite alternate;
	}

	.bloom-2 {
		width: 48vw;
		height: 48vw;
		top: 38%;
		left: -14vw;
		background: radial-gradient(circle, var(--brand-cyan), transparent 68%);
		animation: drift-2 42s var(--ease-in-out) infinite alternate;
	}

	.bloom-3 {
		width: 42vw;
		height: 42vw;
		bottom: 6%;
		right: 2%;
		background: radial-gradient(circle, var(--brand-crimson), transparent 70%);
		animation: drift-3 38s var(--ease-in-out) infinite alternate;
	}

	/* Dark theme: blooms carry the mood. Light theme: barely-there tint so the
	   page stays crisp and white rather than washed with colour. */
	:global(:root[data-theme='dark']) .bloom {
		--bloom-opacity: 0.5;
	}

	:global(:root[data-theme='light']) .bloom {
		--bloom-opacity: 0.14;
		filter: blur(90px);
	}

	@keyframes drift-1 {
		to {
			transform: translate3d(-6vw, 5vh, 0) scale(1.12);
		}
	}

	@keyframes drift-2 {
		to {
			transform: translate3d(7vw, -4vh, 0) scale(1.08);
		}
	}

	@keyframes drift-3 {
		to {
			transform: translate3d(-4vw, -6vh, 0) scale(1.15);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.bloom {
			animation: none;
		}
	}
</style>
