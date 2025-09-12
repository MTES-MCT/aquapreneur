<script lang="ts">
	import NavigationLinks from "$lib/components/navigation-links.svelte";

	const { data } = $props();
</script>

<div>
	<p>
		Dans cette partie, les questions portent uniquement sur le volume d’{data
			.espece.label} vendue à la consommation. Les pourcentages demandés se réfèrent
		à ce volume.
	</p>

	<NavigationLinks prevHref="../../recapitulatif" nextHref="./1" />
</div>
