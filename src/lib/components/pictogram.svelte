<script lang="ts">
	import { dsfrLink } from "$lib/utils";

	const {
		pict,
		width = 80,
		height = 80,
	}: {
		pict: string;
		width?: number;
		height?: number;
	} = $props();
</script>

<svg
	aria-hidden="true"
	class="fr-artwork"
	viewBox="0 0 80 80"
	width="{width}px"
	height="{height}px"
>
	<use
		class="fr-artwork-decorative"
		href="{dsfrLink(pict)}#artwork-decorative"
	></use>
	<use class="fr-artwork-minor" href="{dsfrLink(pict)}#artwork-minor"></use>
	<use class="fr-artwork-major" href="{dsfrLink(pict)}#artwork-major"></use>
</svg>
