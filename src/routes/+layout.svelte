<script lang="ts">
    import Header from "$lib/Header.svelte";
    import Footer from "$lib/Footer.svelte";
    import Background from "$lib/Background.svelte";
    import {navigating} from '$app/stores';

    let key = 0;

    $: {
        let _ = navigating;
        key++;
    }
</script>

<Header/>
{#key key}
    <Background/>
{/key}
<main>
    <slot/>
    <Footer/>
</main>

<svelte:head>
    <title>VLAB</title>
</svelte:head>

<style lang="scss">
  :global {
    @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

    body, html, body > div {
      margin: 0;
      padding: 0;
      font-family: 'Spoqa Han Sans Neo', 'sans-serif';
      height: 100%;
    }

    body {
      background: #fafafe;
    }

    $primary: #6b67c7;
    $secondary: #00ff00;
    $surface: #eceef3;
    $on-primary: #ffffff;
    $on-surface: #000000;

    :root {
      --mt-primary: #{$primary};
      --mt-secondary: #{$secondary};
      --mt-surface: #{$surface};
      --mt-on-primary: #{$on-primary};
      --mt-on-surface: #{$on-surface};


      --mc-ripple-color: #000000;
      --mc-ripple-duration: 0.3s;
    }

    * {
      color: #1b1b2a;
    }

    h1 {
      font-size: 48px;
      margin: 5px 0;
    }

    h2 {
      font-size: 32px;
      margin: 5px 0;
    }

    h3 {
      font-size: 28px;
      font-weight: 400;
      margin: 5px 0;
    }

    h4 {
      margin: 5px 0;
      font-weight: 300;
    }

    .gradient {
      background: -webkit-linear-gradient(30deg, #C41162 0%, #0CA4DD 20%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  main {
    width: 100%;
    height: 100%;
  }
</style>
