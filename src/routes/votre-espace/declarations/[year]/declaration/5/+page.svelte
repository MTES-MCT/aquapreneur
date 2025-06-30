<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { getDeclarationContext } from "$lib/declaration-context";
	import { submitDeclarationContext } from "$lib/utils";

	import BilanTable from "./bilan-table.svelte";

	let { data } = $props();
	const dc = getDeclarationContext();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		dc.etapes.declarationValidee = true;
		submitDeclarationContext(event, data.idDeclarationCourante, dc, "../envoi");
	};
</script>

<h1 class="fr-h2">Merci de confirmer les dates de votre exercice comptable</h1>

<p>
	Veuillez confirmer les informations suivantes liées à votre exercice
	comptable.
</p>

<form method="POST" onsubmit={handleSubmit}>
	<BilanTable></BilanTable>

	<NavigationLinks prevHref="4" nextIsButton />
</form>
