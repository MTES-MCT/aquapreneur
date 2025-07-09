<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { getDeclarationContext } from "$lib/declaration-context";
	import { submitDeclarationContext } from "$lib/utils";

	import StockDetails from "./stock-details.svelte";

	const { data } = $props();

	const dc = getDeclarationContext();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		dc.etapes.stockValidee = true;

		submitDeclarationContext(
			event,
			data.idDeclarationCourante,
			dc,
			"../declaration",
		);
	};
</script>

<h1 class="fr-h2">Passons en revue votre stock en {data.annee}</h1>

<p>
	Veuillez vérifier les données relatives à vos stocks pour chaque espèce et
	chaque stade d’élevage.
</p>
<form method="POST" onsubmit={handleSubmit}>
	<StockDetails></StockDetails>

	<NavigationLinks prevHref="1" nextIsButton />
</form>
