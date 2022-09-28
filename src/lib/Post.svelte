<script lang="ts">
    import Container from "$lib/Container.svelte";

    export let title;
</script>

<main>
    <Container full>
        <h1>{title}</h1>
        <slot/>
    </Container>
</main>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<style lang="scss">
  main {
    padding-top: 60px;
    z-index: 1;

    :global(*) {
      line-height: 1.5;
    }
  }
</style>
