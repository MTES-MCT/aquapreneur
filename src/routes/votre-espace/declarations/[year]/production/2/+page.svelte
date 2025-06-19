<script lang="ts">
	import { goto } from "$app/navigation";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { getDeclarationContext } from "$lib/declaration-context";
	import { enhanceNoInvalidate } from "$lib/utils";

	import ProductionDetails from "./production-details.svelte";

	const { data, form } = $props();
	$effect(() => {
		if (form?.success) {
			const context = getDeclarationContext();
			context.productionComplete = true;
			goto("../stock");
		}
	});
</script>

<h1 class="fr-h2">Passons en revue vos ventes en {data.year}</h1>

<p>
	Veuillez vérifier les données relatives à vos ventes pour chaque espèce et
	chaque stade d’élevage.
</p>
<form method="POST" use:enhanceNoInvalidate>
	<ProductionDetails
		declaration={data.declaration}
		etablissement={data.etablissement}
	></ProductionDetails>

	<NavigationLinks prevHref="1" nextIsButton />
</form>
