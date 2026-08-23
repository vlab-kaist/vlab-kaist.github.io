<script lang="ts">
	import Picture from '$components/Picture.svelte';
	import Seo from '$components/Seo.svelte';

	let { data } = $props();
	const d = $derived(data.dict);

	// The join CTA is whichever channel is an address, so the button and the
	// listed contact can never drift apart.
	const emailHref = $derived(
		d.join.channels.find((c) => c.href.startsWith('mailto:'))?.href ?? '#'
	);
</script>

<Seo
	dict={d}
	locale={data.locale}
	path="/join/"
	title="{d.join.heading} — VLAB"
	description={d.join.body}
/>

<!-- The one page that keeps the old two-column treatment rather than the
     standard PageHead: it is an ask, not a section of reference material, and
     the trophy photo is doing as much of the persuading as the text. -->
<div class="container page join">
	<div class="join-copy reveal">
		<!-- Solid, not gradient: the gradient marks brand moments, and this is
		     an ask. -->
		<span class="rule rule-solid" aria-hidden="true"></span>
		<p class="eyebrow">{d.nav.join}</p>
		<h1>{d.join.heading}</h1>
		<p class="join-lead">{d.join.lead}</p>
		<p class="join-text">{d.join.body}</p>

		<!-- The club is not running an application form, so the mail address
		     is the call to action rather than a recruiting link. -->
		<a class="btn btn-primary" href={emailHref}>{d.join.cta}</a>

		<dl class="channels">
			{#each d.join.channels as channel (channel.label)}
				<div>
					<dt>{channel.label}</dt>
					<dd>
						<a
							href={channel.href}
							target={channel.href.startsWith('mailto:') ? undefined : '_blank'}
							rel={channel.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
						>
							{channel.value}
						</a>
					</dd>
				</div>
			{/each}
		</dl>
	</div>

	<div class="join-media reveal">
		<Picture name="win-2025" alt={d.join.imageAlt} sizes="(max-width: 900px) 92vw, 440px" />
	</div>
</div>

<style>
	.join {
		display: flex;
		gap: clamp(2rem, 5vw, 3.5rem);
		flex-wrap: wrap;
		align-items: center;
	}

	.join-copy {
		flex: 1.1;
		min-width: min(320px, 100%);
	}

	.join-copy .eyebrow {
		margin-bottom: var(--space-2);
	}

	.join-copy h1 {
		font-size: var(--text-3xl);
	}

	.join-lead {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--brand);
		margin-top: 0.875rem;
		margin-bottom: var(--space-4);
	}

	.join-text {
		color: var(--text-muted);
		max-width: 48ch;
		margin-bottom: var(--space-6);
	}

	.channels {
		display: flex;
		gap: var(--space-7);
		flex-wrap: wrap;
		margin-top: var(--space-6);
		padding-top: var(--space-5);
		border-top: 1px solid var(--border);
	}

	.channels dt {
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
		color: var(--text-faint);
		margin-bottom: var(--space-1);
	}

	.channels dd {
		margin: 0;
		font-size: 0.92rem;
		font-weight: 700;
	}

	.channels a:hover {
		color: var(--brand);
	}

	.join-media {
		flex: 1;
		min-width: min(280px, 100%);
		max-width: 440px;
	}

	.join-media :global(picture) {
		aspect-ratio: 1.35;
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		overflow: hidden;
	}

	@media (max-width: 400px) {
		.channels {
			gap: var(--space-5);
		}
	}
</style>
