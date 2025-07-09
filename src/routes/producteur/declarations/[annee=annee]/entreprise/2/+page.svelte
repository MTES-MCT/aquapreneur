<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { submitDeclarationUpdate } from "$lib/utils";

	import EtablissementDataTable from "./etablissement-data-table.svelte";

	const { data } = $props();

	let donnees = $state(JSON.parse(JSON.stringify(data.declaration.donnees)));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("3");
	};
</script>

<h1 class="fr-h2">Votre entreprise</h1>

<p>Veuillez confirmer les informations suivantes liées à votre entreprise.</p>

<form method="POST" onsubmit={handleSubmit}>
	<EtablissementDataTable {donnees} withEdit></EtablissementDataTable>
	<NavigationLinks prevHref="1" nextIsButton />
</form>
