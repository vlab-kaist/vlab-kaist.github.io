<script lang="ts" context="module">
    let cnt = 1;
</script>

<script lang="ts">
    import {browser} from '$app/environment';
    import {sineInOut} from "svelte/easing";
    import {transparentHeader} from "../store/header";
    import {tweened} from "svelte/motion";

    export let src: string;

    let scrollY, container, dark = 0, transform = 0, clientHeight, clientWidth, curr = cnt++;

    function norm(s, f, p, os = 0, of = 1) {
        if (p < os) return s;
        if (p > of) return f;
        return s + (f - s) * sineInOut((p - os) / (of - os));
    }

    let t = tweened(0, {duration: 1000, easing: sineInOut});

    $: if (browser) {
        let _ = scrollY;
        $t = container?.getBoundingClientRect()?.top;
        transform = norm(0, 1, -$t * 1.5, 0, clientHeight + 640);
        if (transform < 0.8) dark = norm(1, 0, $t * 1.5, 0, clientHeight);
        else dark = norm(1, 0, transform, 0.8);
    }

    $: {
        console.log(dark);
        transparentHeader.set(curr, dark > 0.6);
    }
</script>

<svelte:window bind:scrollY/>
<div class="background" style="opacity: {dark};" bind:clientHeight bind:clientWidth></div>
<div class="container" bind:this={container}>
    <div class="image"
         style="background-image: url({src});width:{norm(clientWidth, clientWidth>=1200?1024:clientWidth-80, transform)}px;left: {norm(0, (clientWidth - (clientWidth>=1200?1024:clientWidth-80)) / 2, transform)}px;top: {transform * 100}px;height: calc(50% - {transform * 200}px;border-radius: {transform * 12}px;">
        <div style="position: relative;width: 100%;height: 100%;">
            <div style="position: absolute;bottom: 10px;left: 10px;opacity: {transform};left:{norm((clientWidth - (clientWidth>=1200?1024:clientWidth-80)) / 2, 20, transform)}px;">
                <slot/>
            </div>
        </div>
    </div>
</div>
<div class="scrollHandler" style="height:{clientHeight * 2}px;"></div>

<style lang="scss">
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: -1;
  }

  .container {
    position: absolute;
    left: 0;
    width: 100%;
    height: 200%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .image {
    position: sticky;
    top: 0;
    width: 100%;
    height: 50%;
    background-size: cover;
    background-position: 50% 50%;
    overflow: hidden;
    box-shadow: 5px 5px 13px #00000009, -5px -5px 13px #00000009;

    & :global(*) {
      color: white;
    }
  }
</style>
