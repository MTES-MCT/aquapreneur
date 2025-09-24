<script lang="ts">
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { MODES_ELEVAGE_IDS } from "$lib/constants";
	import { nomEspece } from "$lib/utils";

	const { data } = $props();

	const getNextPage = () => {
		const modesActifs = MODES_ELEVAGE_IDS.filter(
			(m) => data.donneesEspece?.modeElevage?.[m] != null,
		);
		if (modesActifs.length) return "./origine/1";
		return "./origine/2";
	};
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

<NavigationLinks nextHref={getNextPage()} />
