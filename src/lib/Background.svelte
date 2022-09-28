<script lang="ts">
    import {onDestroy, onMount} from "svelte";

    let innerWidth, innerHeight, canvas, ctx, img, scrollY, intv, circle = [];

    $: {
        if (canvas) {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i of circle) {
            i.o += i.d;
            if (i.o > 1) {
                i.o = 1;
                i.d = -i.d;
            }
            if (i.o < 0) {
                i.o = 0;
                i.d = -i.d;
            }
            i.x += i.speedx;
            i.y += i.speedy;
            if (i.x + i.r < 0) i.x = innerWidth + i.r;
            if (i.y + i.r < 0) i.y = document.scrollingElement.scrollHeight + i.r;
            if (i.x - i.r > innerWidth) i.x = -i.r;
            if (i.y - i.r > document.scrollingElement.scrollHeight) i.y = -i.r;

            const radgrad = ctx.createRadialGradient(i.x, i.y - scrollY * i.parallax, 0, i.x, i.y - scrollY * i.parallax, i.r);
            radgrad.addColorStop(0, `rgba(${i.fill}, ${0.1 * i.o * 1})`);
            radgrad.addColorStop(0.8, `rgba(${i.fill}, ${0.03 * i.o * 1})`);
            radgrad.addColorStop(1, `rgba(${i.fill}, 0)`);
            ctx.beginPath();
            ctx.arc(i.x, i.y - scrollY * i.parallax, i.r, 0, 2 * Math.PI);
            ctx.fillStyle = radgrad;
            ctx.fill();
        }
        if (intv) requestAnimationFrame(draw);
    }


    onMount(async () => {
        let t = 0;
        ctx = canvas.getContext("2d");
        for (let i = 0; i < Math.sqrt(document.scrollingElement.scrollHeight * innerWidth) / 8; i++) {
            const r = Math.random() * 50 + 200,
                x = Math.random() * (innerWidth - r + 400) - 200,
                y = Math.random() * (document.scrollingElement.scrollHeight + 400) - 200
            circle.push({
                x, y, r,
                o: Math.random(),
                d: Math.random() * 0.001 - 0.002,
                speedx: Math.random() * 2 - 1,
                speedy: Math.random() * 2 - 1,
                fill: ['72, 117, 237', '72, 117, 237', '66, 66, 66', '235, 119, 190', '235, 46, 46'][Math.floor(Math.random() * 5)],
                parallax: Math.random() * 0.2 + 0.7
            });
        }
        intv = setInterval(() => {
            for (let i of circle) {
                i.speedx += Math.random() * 0.1 - 0.05;
                i.speedy += Math.random() * 0.1 - 0.05;
                i.speedx = Math.min(i.speedx, 1);
                i.speedy = Math.min(i.speedy, 1);
                i.speedx = Math.max(i.speedx, -1);
                i.speedy = Math.max(i.speedy, -1);
            }
        }, 200)
        draw();
    });

    onDestroy(() => {
        clearInterval(intv);
        intv = null;
    });
</script>


<style>
    canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
</style>


<svelte:window bind:innerWidth bind:innerHeight bind:scrollY/>
<canvas bind:this={canvas}></canvas>
