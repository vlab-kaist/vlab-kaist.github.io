<script lang="ts">
	import { page } from '$app/state';
	import Logo from '$components/Logo.svelte';
	import { ko } from '$i18n/ko';
	import { en } from '$i18n/en';

	// An unmatched URL has no [[lang]] param to read, so show both languages
	// rather than guessing wrong at the one moment the visitor is already lost.
	const dicts = [ko, en];
</script>

<svelte:head>
	<title>{page.status} — VLAB</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="wrap">
	<a class="mark" href="/" aria-label="VLAB">
		<Logo size={56} decorative />
	</a>

	<p class="status">{page.status}</p>

	{#each dicts as dict, i (i)}
		<section lang={i === 0 ? 'ko' : 'en'}>
			<h1>{dict.notFound.title}</h1>
			<p>{dict.notFound.body}</p>
			<a href={i === 0 ? '/' : '/en/'}>{dict.notFound.cta} <span aria-hidden="true">→</span></a>
		</section>
	{/each}
</div>

<style>
	.wrap {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-5);
		padding: var(--gutter);
		text-align: center;
	}

	.mark {
		color: var(--text);
	}

	.status {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		letter-spacing: var(--tracking-wide);
		color: var(--text-faint);
	}

	section {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		max-width: 40ch;
	}

	section + section {
		padding-top: var(--space-5);
		border-top: 1px solid var(--border);
	}

	h1 {
		font-size: var(--text-2xl);
	}

	section p {
		color: var(--text-muted);
	}

	section a {
		margin-top: var(--space-2);
		font-weight: 600;
		color: var(--brand);
	}

	section a:hover {
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
