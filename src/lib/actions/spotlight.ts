import type { Action } from 'svelte/action';

/**
 * Tracks the pointer over an element and writes its position to `--spot-x` /
 * `--spot-y` (in %). A card can then paint a soft radial highlight that follows
 * the cursor — the "lit from where you point" feel of a modern product page.
 *
 * Purely decorative: it only sets custom properties, so a card with no matching
 * CSS is unaffected, and it does nothing on touch devices (no hover pointer).
 * The visual itself is hover-gated in CSS, so reduced-motion users who still
 * have a pointer get a static card with no moving light.
 */
export const spotlight: Action<HTMLElement> = (node) => {
	// Skip devices without a fine hover pointer — there is no cursor to follow.
	if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

	let frame = 0;

	function onMove(event: PointerEvent) {
		if (frame) return; // coalesce to one update per frame
		frame = requestAnimationFrame(() => {
			frame = 0;
			const rect = node.getBoundingClientRect();
			const x = ((event.clientX - rect.left) / rect.width) * 100;
			const y = ((event.clientY - rect.top) / rect.height) * 100;
			node.style.setProperty('--spot-x', `${x}%`);
			node.style.setProperty('--spot-y', `${y}%`);
		});
	}

	node.addEventListener('pointermove', onMove);

	return {
		destroy() {
			if (frame) cancelAnimationFrame(frame);
			node.removeEventListener('pointermove', onMove);
		}
	};
};
