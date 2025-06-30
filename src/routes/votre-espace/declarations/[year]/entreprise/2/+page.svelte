<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { getDeclarationContext } from "$lib/declaration-context";
	import { submitDeclarationContext } from "$lib/utils";

	import EtablissementDataTable from "./etablissement-data-table.svelte";

	const { data } = $props();
	const dc = getDeclarationContext();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		submitDeclarationContext(event, data.idDeclarationCourante, dc, "3");
	};
</script>

<h1 class="fr-h2">Votre entreprise</h1>

<p>Veuillez confirmer les informations suivantes liées à votre entreprise.</p>

<form method="POST" onsubmit={handleSubmit}>
	<EtablissementDataTable withEdit></EtablissementDataTable>
	<NavigationLinks prevHref="1" nextIsButton />
</form>
