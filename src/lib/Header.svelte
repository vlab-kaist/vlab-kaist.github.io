<script lang="ts">
    import Logo from "$lib/Logo.svelte";
</script>

<header>
    <main>
        <Logo size="70"/>
    </main>
</header>

<style lang="scss">
  header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 70px;
    z-index: 100;
    background: #fafafe22;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;

    main {
      height: 100%;
      width: calc(100% - 30px);
      //max-width: 1080px;
    }
  }
</style>
