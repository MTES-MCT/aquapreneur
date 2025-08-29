<script lang="ts">
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import Pictogram from "$lib/components/pictogram.svelte";

	let { data } = $props();
</script>

<div
	class="fr-mx-auto fr-mt-6w fr-grid-row--center center"
	style="text-align: center"
>
	<Pictogram pict="institutions/money" width={124} height={124}></Pictogram>

	<h1 class="fr-h2 fr-mt-3w">Ventes</h1>

	<p>
		Données relatives aux ventes réalisées au cours de l’année {data.annee}
	</p>

	<NavigationLinks
		nextHref="ventes/selection-especes"
		nextLabel="Commencer"
		center
	/>
</div>
