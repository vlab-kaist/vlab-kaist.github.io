import type { Action } from 'svelte/action';

interface RevealOptions {
	/** Stagger, in ms, before this element animates once it enters view. */
	delay?: number;
	/** Fraction of the element that must be visible before it triggers. */
	threshold?: number;
}

/**
 * Reveals an element as it scrolls into view (fade + lift).
 *
 * The hidden starting state is declared in the markup as `data-reveal`, and CSS
 * only applies it under `html.reveal-ready` — a class app.html adds before first
 * paint, and ONLY when motion is allowed. So:
 *   - no JS / crawler  → class never added → content always visible
 *   - reduced motion   → class never added → content always visible
 *   - otherwise        → hidden from first paint (no flash), this action reveals
 *
 * Because the hidden state ships in the HTML, there is no post-hydration flash
 * of content appearing then hiding.
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
	const { delay = 0, threshold = 0.15 } = options ?? {};

	// If the pre-paint script decided not to arm reveals, do nothing — the
	// element is already visible and must stay that way.
	if (!document.documentElement.classList.contains('reveal-ready')) {
		node.dataset.revealed = 'true';
		return;
	}

	if (delay) node.style.setProperty('--reveal-delay', `${delay}ms`);

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.dataset.revealed = 'true';
					observer.unobserve(node);
				}
			}
		},
		{ threshold, rootMargin: '0px 0px -8% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
