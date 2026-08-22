<script lang="ts">
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';
	import Sponsors from '$components/Sponsors.svelte';

	let { data, children } = $props();
</script>

<!-- `<html lang>` is set in hooks.server.ts — see the note there for why it
     cannot be done from a component. -->

<Header dict={data.dict} locale={data.locale} />

<main id="main">
	{@render children()}
</main>

<Sponsors dict={data.dict} />
<Footer dict={data.dict} year={data.year} />

<style>
	main {
		min-height: 60vh;
	}
</style>
