<script lang="ts">
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';
	import Sponsors from '$components/Sponsors.svelte';
	import Liquid from '$components/Liquid.svelte';
	import LogoDepth from '$components/LogoDepth.svelte';
	import { theme } from '$lib/theme.svelte';

	let { data, children } = $props();

	// Reads back the theme the pre-paint script in app.html already applied, and
	// starts following the OS preference for as long as the visitor has not
	// overridden it. Runs once, after hydration.
	$effect(() => theme.sync());
</script>

<!-- `<html lang>` is set in hooks.server.ts — see the note there for why it
     cannot be done from a component. -->

<!-- Two background layers, deliberately unequal: the liquid is colour only
     and sits far back, the mark is the object. If both compete the page reads
     as busy, so the liquid runs at half strength on this branch. -->
<Liquid />
<LogoDepth />

<Header dict={data.dict} locale={data.locale} />

<main id="main">
	{@render children()}
</main>

<Sponsors dict={data.dict} />
<Footer dict={data.dict} locale={data.locale} year={data.year} />

<style>
	main {
		min-height: 60vh;
	}
</style>
