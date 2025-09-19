<script lang="ts">
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import Pictogram from "$lib/components/pictogram.svelte";

	let { data } = $props();
</script>

<div
	class="fr-mx-auto fr-mt-6w fr-grid-row--center center"
	style="text-align: center"
>
	<Pictogram pict="digital/avatar" width={124} height={124}></Pictogram>

	<h1 class="fr-h2 fr-mt-3w">Équipe et direction</h1>

	<p>
		Informations concernant votre équipe et la direction de l’entreprise en {data.annee}
	</p>

	<NavigationLinks
		nextHref="equipe/recapitulatif"
		nextLabel="Commencer"
		center
	/>
</div>
