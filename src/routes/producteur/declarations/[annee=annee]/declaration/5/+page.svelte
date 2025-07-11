<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { submitDeclarationUpdate } from "$lib/utils";

	import BilanTable from "./bilan-table.svelte";

	let { data } = $props();

	let donnees = $state(JSON.parse(JSON.stringify(data.declaration.donnees)));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		donnees.etapes.declarationValidee = true;
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("../envoi/");
	};
</script>

<h1 class="fr-h2">Merci de confirmer les dates de votre exercice comptable</h1>

<p>
	Veuillez confirmer les informations suivantes liées à votre exercice
	comptable.
</p>

<form method="POST" onsubmit={handleSubmit}>
	<BilanTable {donnees}></BilanTable>

	<NavigationLinks prevHref="4" nextIsButton />
</form>
