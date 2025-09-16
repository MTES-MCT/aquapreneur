<script lang="ts">
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import Pictogram from "$lib/components/pictogram.svelte";

	const { data } = $props();
</script>

<Pictogram pict="document/contract" width={124} height={124}></Pictogram>

<h2 class="fr-h2 fr-mt-6v">
	{#if data.parcoursMode === "comptable"}
		Cette déclaration annuelle de production aquacole concerne votre adhérent :
	{:else}
		Cette déclaration annuelle de production aquacole concerne votre
		entreprise :
	{/if}
</h2>

<p class="fr-h2">
	{data.etablissement.denomination}
</p>

<NavigationLinks nextHref="../equipe" nextLabel="Commencer" />
