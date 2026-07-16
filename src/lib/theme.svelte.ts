import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'vlab-theme';

function initial(): Theme {
	if (!browser) return 'dark';
	// app.html has already resolved and applied this before first paint;
	// read it back rather than recomputing and risking a mismatch.
	return (document.documentElement.dataset.theme as Theme) ?? 'dark';
}

class ThemeStore {
	current = $state<Theme>(initial());

	toggle() {
		this.set(this.current === 'dark' ? 'light' : 'dark');
	}

	set(theme: Theme) {
		this.current = theme;
		if (!browser) return;
		document.documentElement.dataset.theme = theme;
		try {
			localStorage.setItem(STORAGE_KEY, theme);
		} catch {
			// Storage can be blocked (private mode, embedded webview). The theme
			// still applies for this page view; it just will not persist.
		}
	}
}

export const theme = new ThemeStore();
