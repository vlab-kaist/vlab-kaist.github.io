<script lang="ts">
    export let full = false, id = '';
</script>

<style lang="scss">
  main {
    width: calc(100% - 80px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;

    @media screen and (min-width: 1200px) {
      div {
        width: 1024px;
      }
    }

    @media screen and (max-width: 1199px) {
      div {
        width: 100%;
      }
    }

    &.full {
      min-height: calc(100% - 80px);
    }
  }
</style>

<main class:full {id}>
    <div>
        <slot/>
    </div>
</main>
