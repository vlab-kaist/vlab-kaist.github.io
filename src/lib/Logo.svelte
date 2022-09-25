<script lang="ts">
    import {onMount} from "svelte";

    export let animate = true, size = 500;

    let p = 0;

    onMount(() => {
        const interval = setInterval(() => {
            p += 1;
            if (p > 100) {
                p = 0;
            }
        }, 10);
        return () => clearInterval(interval);
    })
</script>

<svg viewBox="1465 820 1470 835" width={size} height={size} xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     xml:space="preserve" overflow="hidden">
    <defs>
        <clipPath id="clip0">
            <rect x="0" y="0" width="4400" height="4400"/>
        </clipPath>
        <clipPath id="clip1">
          <path fill="transparent" d="M2547.29 866.055 2588.46 937.371 2589.51 937.371 2630.88 866.055ZM1769.12 866.055 2200 1608.95 2539.19 1024.14 1860.81 1024.14 1810.49 937.371 2488.27 937.371 2476.97 917.796 2476.97 917.796 2447.1 866.055 2447.1 866.055 2447.1 866.055ZM-0.000472335 0.000438059 4400 0.000476915 4400 2475-0.000561859 2475Z"/>
        </clipPath>
        <mask id="mask0" x="0" y="0" width="4400" height="4400">
            <rect fill="white" x="0" y="0" width="4400" height="4400"/>
            <path fill="black" d="M2547.29 866.055 2588.46 937.371 2589.51 937.371 2630.88 866.055ZM1769.12 866.055 2200 1608.95 2539.19 1024.14 1860.81 1024.14 1810.49 937.371 2488.27 937.371 2476.97 917.796 2476.97 917.796 2447.1 866.055 2447.1 866.055 2447.1 866.055ZM-0.000472335 0.000438059 4400 0.000476915 4400 2475-0.000561859 2475Z"/>
        </mask>
        <radialGradient
                cx="2104505" cy="2104505" r="2976220" fx="2104506" fy="2104506" gradientUnits="userSpaceOnUse"
                spreadMethod="pad" id="fill1" gradientTransform="matrix(0.000360892 0 0 0.000360892 1053 162)"><stop offset="0" stop-color="#C41162" stop-opacity="0.4"/>
            <stop offset="0.15" stop-color="#C41162" stop-opacity="0.4"/>
            <stop offset="0.69" stop-color="#C41162" stop-opacity="0"/>
            <stop offset="1" stop-color="#C41162" stop-opacity="0"/></radialGradient>
        <radialGradient cx="2104506" cy="2104505"
                        r="2976220" fx="2104506"
                        fy="2104505"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="pad"
                        id="fill2"
                        gradientTransform="matrix(0.000360892 0 0 0.000360892 1777 324)"><stop offset="0" stop-color="#0CA4DD" stop-opacity="0.4"/>
            <stop offset="0.18" stop-color="#0CA4DD" stop-opacity="0.4"/>
            <stop offset="0.69" stop-color="#0CA4DD" stop-opacity="0"/>
            <stop offset="1" stop-color="#0CA4DD" stop-opacity="0"/></radialGradient>
        <radialGradient cx="2104505" cy="2104506"
                        r="2976220" fx="2104505"
                        fy="2104506"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="pad"
                        id="fill3"
                        gradientTransform="matrix(0.000360892 0 0 0.000360892 1358 658)"><stop offset="0" stop-color="#A445F2" stop-opacity="0.321569"/>
            <stop offset="0.18" stop-color="#A445F2" stop-opacity="0.321569"/>
            <stop offset="0.69" stop-color="#A445F2" stop-opacity="0"/>
            <stop offset="1" stop-color="#A445F2" stop-opacity="0"/></radialGradient></defs>
    <g clip-path="url(#clip0)" >
        <circle cx={1800} cy={1100} r={800} fill="url(#fill1)" fill-rule="evenodd" mask="url(#mask0)"/>
        <circle cx={2550} cy={1100} r={800} fill="url(#fill2)" fill-rule="evenodd" mask="url(#mask0)"/>
        <circle cx={2100} cy={1400} r={800} fill="url(#fill3)" fill-rule="evenodd" mask="url(#mask0)"/>
        <path d="M2478.42 746.775 2547.29 866.054 2447.1 866.054 2403.28 790.159 2478.42 746.775Z" fill="#000000"
              fill-rule="evenodd" fill-opacity="1"/>
        <path d="M2539 1024 2589.5 937 2640 1024Z" fill="#000000" fill-rule="evenodd" fill-opacity="1"/>
    </g>
</svg>
