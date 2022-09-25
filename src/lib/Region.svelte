<script lang="ts">
    import Ripple from "$lib/Ripple.svelte";

    export let img = '';
</script>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fafafe;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 5px 5px 13px #00000009, -5px -5px 13px #00000009;
    border-radius: 10px;
    overflow: hidden;

    div {
      padding: 16px 16px 10px 16px;
      transition: all 0.3s;
      position: relative;

      & > :global(p) {
        margin: 10px 0;
        font-weight: 700;
      }

      & > * {
        margin: 5px;
      }
    }
  }
</style>

<main>
    <div>
        <slot/>
    </div>
    {#if img}
        <div style="width: calc(100% - 20px);background: url({img});background-size: cover;height:300px;background-position: 50% 50%;"/>
    {/if}
</main>
