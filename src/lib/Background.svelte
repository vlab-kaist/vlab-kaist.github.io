<script lang="ts">
    let innerWidth, innerHeight, canvas, ctx, img, scrollY, filt = 0, c2;

</script>


<style>
    canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>


<canvas bind:this={canvas}></canvas>
