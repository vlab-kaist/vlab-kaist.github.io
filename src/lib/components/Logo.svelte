<script lang="ts">
	interface Props {
		size?: number;
		/** Hide from assistive tech when adjacent text already says "VLAB". */
		decorative?: boolean;
	}

	let { size = 32, decorative = false }: Props = $props();

	// Gradient and mask ids must be unique per instance, or a second <Logo> on
	// the page re-points the first one's fills at its own defs.
	const uid = $props.id();
</script>

<!--
  The VLAB "V": three overlapping colour blobs seen through a V-shaped window.

  The original artwork achieved this with an opaque white rectangle that had the
  V knocked out of it by `fill-rule: evenodd`, which meant the mark only ever
  worked on a white page — on anything else you got a white slab. Here the same
  shape is a mask instead, so the V is genuinely transparent outside its own
  outline and the mark drops onto any background, light or dark.
-->
<svg
	viewBox="1740 730 940 900"
	width={size}
	height={size * (900 / 940)}
	xmlns="http://www.w3.org/2000/svg"
	role={decorative ? 'presentation' : 'img'}
	aria-label={decorative ? undefined : 'VLAB'}
	aria-hidden={decorative ? 'true' : undefined}
>
	<defs>
		<mask id="v-{uid}">
			<!-- black hides, white reveals: only the V lets the blobs through -->
			<rect x="1740" y="730" width="940" height="900" fill="#000" />
			<!-- fill-rule="evenodd" is load-bearing: the V is drawn as
			     self-intersecting subpaths, and under the default nonzero rule it
			     fills in as a solid triangle instead of a letter. -->
			<path
				fill="#fff"
				fill-rule="evenodd"
				d="M2547.29 866.055l41.17 71.316h1.05l41.37-71.316zm-778.17 0L2200 1608.95l339.19-584.81h-678.38l-50.32-86.769h677.78l-11.3-19.575h0l-29.87-51.741h0 0z"
			/>
		</mask>

		<radialGradient id="a-{uid}" cx="0.5" cy="0.5" r="0.5">
			<stop offset="0" stop-color="var(--brand-crimson, #e0246f)" stop-opacity="0.95" />
			<stop offset="0.55" stop-color="var(--brand-crimson, #e0246f)" stop-opacity="0.55" />
			<stop offset="1" stop-color="var(--brand-crimson, #e0246f)" stop-opacity="0" />
		</radialGradient>
		<radialGradient id="b-{uid}" cx="0.5" cy="0.5" r="0.5">
			<stop offset="0" stop-color="var(--brand-cyan, #0ca4dd)" stop-opacity="0.95" />
			<stop offset="0.55" stop-color="var(--brand-cyan, #0ca4dd)" stop-opacity="0.55" />
			<stop offset="1" stop-color="var(--brand-cyan, #0ca4dd)" stop-opacity="0" />
		</radialGradient>
		<radialGradient id="c-{uid}" cx="0.5" cy="0.5" r="0.5">
			<stop offset="0" stop-color="var(--brand-violet, #a445f2)" stop-opacity="0.95" />
			<stop offset="0.55" stop-color="var(--brand-violet, #a445f2)" stop-opacity="0.55" />
			<stop offset="1" stop-color="var(--brand-violet, #a445f2)" stop-opacity="0" />
		</radialGradient>
	</defs>

	<!-- Blob centres carried over from the original artwork. -->
	<g mask="url(#v-{uid})">
		<rect
			x="1740"
			y="730"
			width="940"
			height="900"
			fill="var(--brand-violet, #a445f2)"
			opacity="0.22"
		/>
		<circle cx="1812.5" cy="921.5" r="759.5" fill="url(#a-{uid})" />
		<circle cx="2536.5" cy="1083.5" r="759.5" fill="url(#b-{uid})" />
		<circle cx="2117.5" cy="1417.5" r="759.5" fill="url(#c-{uid})" />
	</g>

	<!-- The two detached marks that finish the V. currentColor lets them invert
	     with the theme instead of needing a `dark` prop. -->
	<path d="M2478.42 746.775l68.87 119.279H2447.1l-43.82-75.895 75.14-43.384z" fill="currentColor" />
	<path d="M2539 1024l50.5-87 50.5 87z" fill="currentColor" />
</svg>
