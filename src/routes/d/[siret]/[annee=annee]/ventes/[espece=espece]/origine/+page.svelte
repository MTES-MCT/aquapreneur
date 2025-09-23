<script lang="ts">
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { nomEspece } from "$lib/utils";

	const { data } = $props();
</script>

<p class="fr-text--lead">
	Dans cette partie, les questions portent uniquement sur le volume {nomEspece(
		data.espece,
		{
			avecArticleUndefini: true,
			plural: true,
		},
	)}
	<strong>vendues à la consommation.</strong>
	Les pourcentages demandés se réfèrent à ce volume.
</p>

<NavigationLinks nextHref="./origine/1" />
