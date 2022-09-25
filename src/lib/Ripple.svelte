<script context="module">
    let touchSupport = false;
</script>

<script lang="ts">
    import {onDestroy, onMount} from "svelte";

    export let primary = true,
        duration = 300,
        color = primary ? 'var(--mt-on-primary)' : 'var(--mt-on-surface)',
        opacity = primary ? 0.3 : 0.15,
        zIndex = 1,
        center = false,
        bound = 1;

    let container;
    let position = {x: 0, y: 0, r: 0}, show = false, animate = false, timeout = null, rippleBeginTime = Date.now();

    function rippleShowEvent(event: MouseEvent | TouchEvent) {
        if (event.type.startsWith('touch')) touchSupport = true;
        if (touchSupport && event.type.startsWith('mouse')) return;
        if (show) return;
        animate = false;
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }

        const rippleContainer = (event.currentTarget as HTMLElement)?.getBoundingClientRect();
        const r = center ? Math.max(rippleContainer.width, rippleContainer.height) * bound : Math.sqrt(rippleContainer.width ** 2 + rippleContainer.height ** 2) * 2 * bound;
        const pageX = (event as MouseEvent).pageX || (event as TouchEvent).touches[0].pageX;
        const pageY = (event as MouseEvent).pageY || (event as TouchEvent).touches[0].pageY;
        const x = center ? rippleContainer.width / 2 - r / 2 : pageX - rippleContainer.x - r / 2 - window.scrollX;
        const y = center ? rippleContainer.height / 2 - r / 2 : pageY - rippleContainer.y - r / 2 - window.scrollY;
        const newRipple = {x, y, r};

        rippleBeginTime = Date.now();
        position = newRipple;
        setTimeout(() => {
            animate = true;
            setTimeout(() => show = true, 0)
        }, 0);
    }

    function rippleHideEvent(event: MouseEvent | TouchEvent) {
        if (event.type.startsWith('touch')) touchSupport = true;
        if (touchSupport && event.type.startsWith('mouse')) return;
        timeout = setTimeout(() => show = false, 10 + Math.max(0, duration - (Date.now() - rippleBeginTime)));
    }

    onMount(() => {
        container?.addEventListener('mousedown', rippleShowEvent);
        container?.addEventListener('mouseup', rippleHideEvent);
        container?.addEventListener('touchstart', rippleShowEvent);
        container?.addEventListener('touchmove', rippleHideEvent);
        container?.addEventListener('touchend', rippleHideEvent);
        container?.addEventListener('touchcancel', rippleHideEvent);
    })

    onDestroy(() => {
        container?.removeEventListener('mousedown', rippleShowEvent);
        container?.removeEventListener('mouseup', rippleHideEvent);
        container?.removeEventListener('touchstart', rippleShowEvent);
        container?.removeEventListener('touchmove', rippleHideEvent);
        container?.removeEventListener('touchend', rippleHideEvent);
        container?.removeEventListener('touchcancel', rippleHideEvent);
    })
</script>

<style lang="scss">
  .ripple {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0 !important;

    span {
      border-radius: 100%;
      position: absolute;
      opacity: 0;
      background-color: var(--ripple-color);
      pointer-events: none;
      margin: 0 !important;

      &.animate {
        animation-name: ripple;
        animation-duration: var(--ripple-duration);
      }

      &.show {
        opacity: var(--ripple-opacity);
      }

      transition: opacity 0.3s ease-out;
    }

    @keyframes ripple {
      from {
        transform: scale(0);
      }

      to {
        transform: scale(1);
      }
    }
  }
</style>

<div class="ripple" bind:this={container}
     style="--ripple-color:{color};--ripple-duration:{duration/1000}s;--ripple-opacity:{opacity};">
    <span style="left:{position.x}px;top:{position.y}px;width:{position.r}px;height:{position.r}px;zIndex:{zIndex};"
          class:animate class:show/>
</div>