<script lang="ts">
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import Pictogram from "$lib/components/pictogram.svelte";

	let { data } = $props();

	const getNextPage = () => {
		return "production/selection-especes";
	};
</script>

<div
	class="fr-mx-auto fr-mt-6w fr-grid-row--center center"
	style="text-align: center"
>
	<Pictogram pict="institutions/justice" width={124} height={124}></Pictogram>

	<h1 class="fr-h2 fr-mt-3w">Production</h1>

	<p>
		Informations relatives aux volumes produits pour chaque espèce en {data.annee}
	</p>

	<NavigationLinks nextHref={getNextPage()} nextLabel="Commencer" />
</div>
