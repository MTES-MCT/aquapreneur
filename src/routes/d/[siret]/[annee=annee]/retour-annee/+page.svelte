<script lang="ts">
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import Pictogram from "$lib/components/pictogram.svelte";

	let { data } = $props();

	const getNextPage = () => {
		if (
			data.persona === "producteur" &&
			data.progressionRetourAnnee.globale ===
				"préremplissage comptable à valider"
		) {
			return "retour-annee/recapitulatif";
		}
		return "retour-annee/1";
	};
</script>

<div
	class="fr-mx-auto fr-mt-6w fr-grid-row--center center"
	style="text-align: center"
>
	<Pictogram pict="leisure/community" width={124} height={124}></Pictogram>

	<h1 class="fr-h2 fr-mt-3w">Retours sur l’année</h1>

	<p>
		Ressenti et observations sur l’activité de l’année {data.annee}
	</p>

	<NavigationLinks nextHref={getNextPage()} nextLabel="Commencer" center />
</div>
