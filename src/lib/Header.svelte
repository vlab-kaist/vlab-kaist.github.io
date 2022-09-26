<script lang="ts">
    import Logo from "$lib/Logo.svelte";
    import {transparentHeader} from "../store/header";

    function scrollIntoView({target}) {
        const el = document.querySelector(target.getAttribute('href'));
        window.scrollTo({
            top: el?.offsetTop + 50,
            behavior: 'smooth'
        });
    }
</script>

<header class:transparentHeader={$transparentHeader}>
    <main>
        <a href="#main" on:click|preventDefault={scrollIntoView}>
            <Logo size="70" dark={$transparentHeader}/>
        </a>
        <a href="#quiz" on:click|preventDefault={scrollIntoView}>과학퀴즈팀</a>
        <a href="#ai" on:click|preventDefault={scrollIntoView}>AI팀</a>
        <a href="#history" on:click|preventDefault={scrollIntoView}>연혁</a>
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
    transition: all 0.3s ease-in-out;

    & * {
      color: black;
      transition: color 0.3s ease-in-out;
      text-decoration: none;
    }

    &.transparentHeader {
      background: transparent;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;

      & * {
        color: #fff;
      }
    }

    main {
      height: 100%;
      width: calc(100% - 30px);
      //max-width: 1080px;

      display: flex;
      justify-content: left;
      align-items: center;

      & > :global(*) {
        margin-right: 20px;
      }
    }
  }
</style>
