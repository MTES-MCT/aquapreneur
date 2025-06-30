<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { getDeclarationContext } from "$lib/declaration-context";
	import { submitDeclarationContext } from "$lib/utils";

	import ProductionDetails from "./production-details.svelte";

	const { data } = $props();

	const dc = getDeclarationContext();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		dc.etapes.productionValidee = true;
		submitDeclarationContext(event, data.idDeclarationCourante, dc, "../stock");
	};
</script>

<h1 class="fr-h2">Passons en revue vos ventes en {data.year}</h1>

<p>
	Veuillez vérifier les données relatives à vos ventes pour chaque espèce et
	chaque stade d’élevage.
</p>
<form method="POST" onsubmit={handleSubmit}>
	<ProductionDetails></ProductionDetails>

	<NavigationLinks prevHref="1" nextIsButton />
</form>
