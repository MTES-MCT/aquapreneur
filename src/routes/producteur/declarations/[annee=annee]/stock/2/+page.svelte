<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { submitDeclarationUpdate } from "$lib/utils";

	import StockDetails from "./stock-details.svelte";

	const { data } = $props();

	let donnees = $state(JSON.parse(JSON.stringify(data.declaration.donnees)));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		donnees.etapes.stockValidee = true;
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("../declaration/");
	};
</script>

<h1 class="fr-h2">
	Passons en revue votre stock en {data.declaration.annee}
</h1>

<p>
	Veuillez vérifier les données relatives à vos stocks pour chaque espèce et
	chaque stade d’élevage.
</p>
<form method="POST" onsubmit={handleSubmit}>
	<StockDetails {donnees}></StockDetails>

	<NavigationLinks prevHref="1" nextIsButton />
</form>
