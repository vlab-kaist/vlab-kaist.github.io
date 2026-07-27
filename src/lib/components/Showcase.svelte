<script lang="ts">
	import { onMount } from 'svelte';
	import Picture from './Picture.svelte';
	import type { ImageName } from '$data/images';
	import type { Dict } from '$i18n';

	interface Props {
		dict: Dict;
	}

	let { dict }: Props = $props();

	// Image order is fixed here (not translatable); captions pair by index.
	// The two strawberry-party shots (picnic, strawberry) are kept apart so the
	// crossfade never dissolves one near-identical frame into another.
	const IMAGES: ImageName[] = [
		'life-practice',
		'life-festival',
		'life-picnic',
		'life-dinner',
		'life-strawberry'
	];
	const slides = $derived(IMAGES.map((image, i) => ({ image, ...dict.life.captions[i] })));

	const SLIDE_MS = 5200;

	let index = $state(0);
	let enhanced = $state(false); // becomes true once JS mounts: grid → crossfade
	let paused = $state(false);
	let inView = $state(true);

	// Auto-advance is driven by the progress bar's animationend (see CSS), so the
	// bar and the slide can never drift apart. This handler only fires for the
	// active bar, and only when its fill animation actually runs — which it does
	// not under reduced motion, so reduced-motion visitors simply never auto-play.
	function onFillEnd() {
		if (!paused && inView) index = (index + 1) % slides.length;
	}

	function go(i: number) {
		index = i;
	}

	const active = $derived(!paused && inView);

	onMount(() => {
		// Under reduced motion, stay in the grid: every photo visible at once, no
		// crossfade, no auto-advance, nothing to click. That is the most
		// accessible form of this section, so it is the one such visitors get.
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		enhanced = true;

		// Pause when the showcase scrolls off-screen — no point animating, and it
		// saves battery on mobile.
		const io = new IntersectionObserver(([entry]) => (inView = entry.isIntersecting), {
			threshold: 0.25
		});
		const el = document.getElementById('showcase-root');
		if (el) io.observe(el);

		const onVisibility = () => (paused = document.hidden);
		document.addEventListener('visibilitychange', onVisibility);

		return () => {
			io.disconnect();
			document.removeEventListener('visibilitychange', onVisibility);
		};
	});
</script>

<div
	id="showcase-root"
	class="showcase"
	class:enhanced
	class:paused={!active}
	style="--slide: {SLIDE_MS}ms"
	onpointerenter={() => (paused = true)}
	onpointerleave={() => (paused = false)}
	role="group"
	aria-roledescription="carousel"
	aria-label={dict.life.heading}
>
	<div class="stage">
		{#each slides as slide, i (slide.image)}
			<figure class="slide" class:active={i === index} aria-hidden={enhanced && i !== index}>
				<Picture
					name={slide.image}
					alt={slide.alt}
					sizes="(max-width: 900px) 92vw, 1100px"
					priority={i === 0}
				/>
				<div class="slide-scrim"></div>
				<figcaption>
					<span class="cap-kicker" aria-hidden="true"></span>
					<span class="cap-title">{slide.title}</span>
					<span class="cap-sub">{slide.subtitle}</span>
				</figcaption>
			</figure>
		{/each}
	</div>

	{#if enhanced}
		<div class="progress" role="tablist" aria-label={dict.life.heading}>
			{#each slides as slide, i (slide.image)}
				<button
					class="seg"
					class:active={i === index}
					role="tab"
					aria-selected={i === index}
					aria-label={slide.title}
					onclick={() => go(i)}
				>
					<span class="track"><span class="fill" onanimationend={onFillEnd}></span></span>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	/* --slide (the fill + auto-advance duration) is set inline from SLIDE_MS so
	   the timing lives in one place. */

	/* ---- No-JS / pre-hydration: an honest responsive grid of every photo. ---- */
	.stage {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: var(--space-3);
	}

	.slide {
		position: relative;
		margin: 0;
		aspect-ratio: 3 / 2;
		border-radius: var(--radius-lg);
		overflow: hidden;
		border: 1px solid var(--border);
	}

	.slide :global(picture),
	.slide :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.slide-scrim {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgb(8 8 14 / 0.85) 0%,
			rgb(8 8 14 / 0.15) 45%,
			transparent 70%
		);
	}

	figcaption {
		position: absolute;
		left: var(--space-5);
		right: var(--space-5);
		bottom: var(--space-4);
		display: flex;
		flex-direction: column;
		gap: 2px;
		color: #fff;
	}

	.cap-kicker {
		width: 32px;
		height: 3px;
		margin-bottom: var(--space-2);
		border-radius: var(--radius-full);
		background: var(--brand-gradient);
	}

	.cap-title {
		font-size: var(--text-xl);
		font-weight: 700;
		letter-spacing: var(--tracking-display);
	}

	.cap-sub {
		font-size: var(--text-sm);
		color: rgb(255 255 255 / 0.8);
	}

	/* ---- Enhanced: one big stage, slides cross-fade with a slow ken-burns. ---- */
	.showcase.enhanced .stage {
		display: block;
		position: relative;
		aspect-ratio: 16 / 10;
		border-radius: var(--radius-xl);
		overflow: hidden;
		border: 1px solid var(--border);
		box-shadow: var(--shadow-lg);
	}

	.showcase.enhanced .slide {
		position: absolute;
		inset: 0;
		aspect-ratio: auto;
		border: 0;
		border-radius: 0;
		opacity: 0;
		transition: opacity 1s var(--ease-in-out);
	}

	.showcase.enhanced .slide.active {
		opacity: 1;
	}

	.showcase.enhanced .slide-scrim {
		background: linear-gradient(
			to top,
			rgb(8 8 14 / 0.8) 0%,
			rgb(8 8 14 / 0.25) 40%,
			transparent 65%
		);
	}

	.showcase.enhanced figcaption {
		left: clamp(1.25rem, 4vw, 3rem);
		bottom: clamp(1.25rem, 4vw, 2.5rem);
		right: auto;
		max-width: 80%;
		/* Caption rises + fades in only while its slide is the active one. */
		opacity: 0;
		transform: translateY(12px);
		transition:
			opacity 0.7s var(--ease-out) 0.25s,
			transform 0.7s var(--ease-out) 0.25s;
	}

	.showcase.enhanced .slide.active figcaption {
		opacity: 1;
		transform: none;
	}

	.showcase.enhanced .cap-title {
		font-size: var(--text-2xl);
	}

	.showcase.enhanced .cap-sub {
		font-size: var(--text-base);
	}

	/* ---- Progress bars (stories-style) ---- */
	.progress {
		display: flex;
		gap: var(--space-2);
		margin-top: var(--space-4);
	}

	.seg {
		flex: 1;
		padding: var(--space-2) 0;
		border: 0;
		background: none;
		cursor: pointer;
	}

	.track {
		display: block;
		height: 3px;
		border-radius: var(--radius-full);
		background: var(--border-strong);
		overflow: hidden;
	}

	.fill {
		display: block;
		height: 100%;
		border-radius: inherit;
		background: var(--brand-gradient);
		transform: scaleX(0);
		transform-origin: left;
	}

	.seg:hover .track {
		background: var(--text-faint);
	}

	/* Only the active bar fills, and only when motion is allowed — that fill
	   completing is what advances the carousel. Under reduced motion this
	   animation is absent, so nothing auto-advances; the active bar just shows
	   full and the dots stay clickable. */
	@media (prefers-reduced-motion: no-preference) {
		.showcase.enhanced .seg.active .fill {
			animation: seg-fill var(--slide) linear;
		}

		.showcase.enhanced.paused .seg.active .fill {
			animation-play-state: paused;
		}

		.showcase.enhanced .slide.active :global(img) {
			animation: ken-burns calc(var(--slide) + 1200ms) var(--ease-out) both;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.showcase.enhanced .seg.active .fill {
			transform: scaleX(1);
		}
	}

	@keyframes seg-fill {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}

	@keyframes ken-burns {
		from {
			transform: scale(1.005);
		}
		to {
			transform: scale(1.07);
		}
	}

	@media (max-width: 560px) {
		.showcase.enhanced .stage {
			aspect-ratio: 4 / 5;
		}
	}
</style>
