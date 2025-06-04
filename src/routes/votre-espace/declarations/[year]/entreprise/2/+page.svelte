<script lang="ts">
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { enhanceNoInvalidate } from "$lib/utils";

	import EtablissementDataTable from "./etablissement-data-table.svelte";

	const { data } = $props();
</script>

<h1 class="fr-h2">Votre entreprise</h1>

<p>Veuillez confirmer les informations suivantes liées à votre entreprise.</p>

<form method="POST" use:enhanceNoInvalidate>
	<EtablissementDataTable
		etablissement={data.etablissement}
		activitePrincipale={data.activitePrincipale}
		withEdit
	></EtablissementDataTable>
	<NavigationLinks prevHref="1" nextIsButton />
</form>
