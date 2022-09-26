<script lang="ts">
    import Container from "$lib/Container.svelte";

    export let title;
</script>

<Container full>
    <h1>{title}</h1>
    <slot/>
</Container>

<svelte:head>
    <title>{title}</title>
</svelte:head>
