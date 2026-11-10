<script lang="ts">
	import PhotoSlot from '$components/PhotoSlot.svelte';
	import Seo from '$components/Seo.svelte';
	import { RECRUITING } from '$lib/config';

	let { data } = $props();
	const d = $derived(data.dict);

	// Recruiting runs on a Google Form, so the button leaves the site. The mail
	// address stays in the channel list below rather than on the button: someone
	// with a question and someone ready to apply want different things, and the
	// form is the one with a deadline attached.
</script>

<Seo
	dict={d}
	locale={data.locale}
	path="/join/"
	title="{d.join.heading} · Vlab"
	description={d.join.body}
/>

<!-- The one page that keeps the old two-column treatment rather than the
     standard PageHead: it is an ask, not a section of reference material, and
     the trophy photo is doing as much of the persuading as the text. -->
<div class="container page join">
	<div class="join-copy reveal">
		<p class="eyebrow">{d.nav.join}</p>
		<h1>{d.join.heading}</h1>
		<p class="join-lead">{d.join.lead}</p>
		<p class="join-text">{d.join.body}</p>

		<!-- External, and it says so: the arrow and the line underneath both
		     exist because a button that silently throws you onto a Google Form
		     is a worse experience than one that warns you first. `noopener` is
		     not optional on a target=_blank link. -->
		{#if RECRUITING}
			<a class="btn btn-primary" href={d.join.ctaHref} target="_blank" rel="noopener noreferrer">
				{d.join.cta}
				<span class="ext" aria-hidden="true">↗</span>
			</a>
			<p class="cta-note">{d.join.ctaNote}</p>
		{:else}
			<!-- Out of season: the button stays where people expect it, says why
			     it does nothing, and does nothing. A real disabled <button>, so
			     it is announced as unavailable rather than as a dead link. -->
			<button class="btn btn-closed" type="button" disabled>{d.join.closed}</button>
			<p class="cta-note">{d.join.closedNote}</p>
		{/if}

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
							<!-- Handles and addresses, not prose: auto-translate mangles
							     them into things that do not resolve. -->
							<span translate="no">{channel.value}</span>
						</a>
					</dd>
				</div>
			{/each}
		</dl>
	</div>

	<div class="join-media reveal">
		<!-- The 2026 award photo — the same shot as the home hero, which is
		     the team with the trophy after the final. -->
		<PhotoSlot
			name="team-2026"
			alt={d.join.imageAlt}
			label={d.join.photoSlot}
			sizes="(max-width: 900px) 92vw, 440px"
			ratio={1.35}
		/>
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
		font-size: var(--text-xl);
		font-weight: 500;
		color: var(--text);
		margin-top: var(--space-3);
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
		font-size: var(--text-xs);
		color: var(--text-faint);
		margin-bottom: var(--space-1);
	}

	.channels dd {
		margin: 0;
		font-size: 0.92rem;
		font-weight: 500;
	}

	.ext {
		display: inline-block;
		margin-left: 0.4em;
		font-size: 0.9em;
		/* Optical: the glyph sits high in its box and drags the label up with it. */
		transform: translateY(1px);
		transition: transform var(--dur-base) var(--ease-out);
	}

	/* Up and to the right, matching where the glyph points — "this leaves the
	   site" said with motion instead of another line of text. */
	.btn-primary:hover .ext,
	.btn-primary:focus-visible .ext {
		transform: translate(2px, -1px);
	}

	.cta-note {
		margin-top: var(--space-3);
		font-size: var(--text-xs);
		color: var(--text-faint);
	}

	.channels a:hover {
		color: var(--brand);
	}

	.join-media {
		flex: 1;
		min-width: min(280px, 100%);
		max-width: 440px;
		/* Inherited by the empty PhotoSlot frame. */
		border-radius: var(--radius-lg);
	}

	/* Not a faded primary: that would still lift and shine on hover, i.e. look
	   pressable. Dashed and muted reads as "not now" at a glance. */
	.btn-closed,
	.btn-closed:hover,
	.btn-closed:active {
		border: 1px dashed var(--border-strong);
		background: transparent;
		color: var(--text-muted);
		cursor: not-allowed;
		transform: none;
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
