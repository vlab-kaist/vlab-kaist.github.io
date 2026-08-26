<script lang="ts">
	import { theme } from '$lib/theme.svelte';
	import type { Dict } from '$i18n';

	interface Props {
		dict: Dict;
	}

	let { dict }: Props = $props();
</script>

<!--
  Both icons and both labels are always in the DOM, and CSS picks which one is
  shown from `:root[data-theme]`. That is deliberate: the theme is resolved by
  an inline script before first paint, but this component renders during SSR
  when the theme is not knowable, so anything driven by `theme.current` would
  render "light" into the HTML and then flip once hydration lands — a visible
  icon swap on every dark-mode page load, and a screen reader reading the wrong
  label until the bundle arrives. `display: none` keeps the inactive label out
  of the accessibility tree too, so only one of them is ever announced.

  `theme.current` is used only in the click handler, which by definition cannot
  run before hydration.
-->
<button class="theme-toggle" type="button" onclick={() => theme.toggle()}>
	<span class="visually-hidden on-light">{dict.nav.themeToDark}</span>
	<span class="visually-hidden on-dark">{dict.nav.themeToLight}</span>

	<svg class="on-light" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
		<!-- Moon: shown on paper, because clicking takes you to ink. -->
		<path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5a8.5 8.5 0 1 0 10.8 10.8Z" />
	</svg>
	<svg class="on-dark" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor">
		<!-- Sun -->
		<circle cx="12" cy="12" r="4.2" />
		<path
			d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"
		/>
	</svg>
</button>

<style>
	.theme-toggle {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border: 0;
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--text-muted);
		cursor: pointer;
		transition:
			color var(--dur-fast) var(--ease-out),
			background-color var(--dur-fast) var(--ease-out),
			transform var(--dur-fast) var(--ease-out);
	}

	.theme-toggle:hover {
		color: var(--text);
		background: color-mix(in srgb, var(--border) 45%, transparent);
	}

	.theme-toggle:active {
		transform: scale(0.92);
		transition-duration: 70ms;
	}

	.theme-toggle svg {
		width: 17px;
		height: 17px;
		stroke-width: 1.7;
		stroke-linecap: round;
		stroke-linejoin: round;
		/* Both icons occupy the same cell, so swapping one for the other cannot
		   move the button by a pixel. */
		grid-area: 1 / 1;
		transition: transform var(--dur-base) var(--ease-out);
	}

	/* The icon turns toward the state you are about to get. Rotating the whole
	   button would drag its hover background around with it; rotating the glyph
	   inside a still square is the part that reads. */
	.theme-toggle:hover svg {
		transform: rotate(-18deg);
	}

	:global(:root[data-theme='dark']) .on-light,
	:global(:root:not([data-theme='dark'])) .on-dark {
		display: none;
	}
</style>
