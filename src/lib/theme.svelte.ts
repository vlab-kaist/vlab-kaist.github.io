import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

/** Shared with the pre-paint script in app.html. Change both or neither. */
export const STORAGE_KEY = 'vlab-theme';

/**
 * Light/dark with an explicit user override on top of the OS preference.
 *
 * The value is applied to `<html data-theme>` before first paint by the inline
 * script in app.html, so this class never *decides* the theme on load — it
 * reads back what that script already resolved. Recomputing it here would put
 * two sources of truth a few milliseconds apart, which is exactly how a page
 * ends up flashing the wrong theme on reload.
 */
class ThemeStore {
	current = $state<Theme>('light');
	/** True while the visitor has made no explicit choice and is following the OS. */
	followsSystem = $state(true);

	/** Called once from the layout, after hydration. */
	sync() {
		if (!browser) return;
		this.current = (document.documentElement.dataset.theme as Theme) ?? 'light';
		try {
			this.followsSystem = localStorage.getItem(STORAGE_KEY) === null;
		} catch {
			this.followsSystem = true;
		}

		// Keep following the OS until the visitor overrides it — someone whose
		// laptop flips to dark at sunset expects the page to come with it.
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		media.addEventListener('change', (e) => {
			if (this.followsSystem) this.apply(e.matches ? 'dark' : 'light');
		});
	}

	toggle() {
		this.set(this.current === 'dark' ? 'light' : 'dark');
	}

	set(theme: Theme) {
		this.followsSystem = false;
		this.apply(theme);
		try {
			localStorage.setItem(STORAGE_KEY, theme);
		} catch {
			// Storage blocked (private mode, embedded webview). The theme still
			// applies to this page view, it just will not survive a reload.
		}
	}

	private apply(theme: Theme) {
		this.current = theme;
		if (!browser) return;
		document.documentElement.dataset.theme = theme;

		// The address-bar colour is a static <meta> pair keyed off the OS
		// preference, which is wrong the moment someone overrides it here.
		const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
		if (meta) meta.content = theme === 'dark' ? '#101017' : '#fbfbf8';
	}
}

export const theme = new ThemeStore();
