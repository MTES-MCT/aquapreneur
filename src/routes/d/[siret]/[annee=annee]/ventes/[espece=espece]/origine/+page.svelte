<script lang="ts">
	import NavigationLinks from "$lib/components/navigation-links.svelte";

	const { data } = $props();
</script>

<p class="fr-text--lead">
	Dans cette partie, les questions portent uniquement sur le volume d’{data
		.espece.label} vendue à la consommation. Les pourcentages demandés se réfèrent
	à ce volume.
</p>

<NavigationLinks nextHref="./origine/1" />
