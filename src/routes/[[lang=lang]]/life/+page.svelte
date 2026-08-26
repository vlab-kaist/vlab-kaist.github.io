<script lang="ts">
	import Seo from '$components/Seo.svelte';
	import PageHead from '$components/PageHead.svelte';
	import LifeGrid from '$components/LifeGrid.svelte';

	let { data } = $props();
	const d = $derived(data.dict);
</script>

<Seo
	dict={d}
	locale={data.locale}
	path="/life/"
	title="{d.life.heading} — Vlab"
	description={d.life.lead}
/>

<div class="container page">
	<PageHead eyebrow={d.nav.life} title={d.life.heading} lead={d.life.lead} />
	<LifeGrid dict={d} />
</div>
