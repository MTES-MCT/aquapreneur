<script lang="ts">
	import { goto } from "$app/navigation";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { getDeclarationContext } from "$lib/declaration-context";
	import { enhanceNoInvalidate } from "$lib/utils";

	import StockDetails from "./stock-details.svelte";

	const { data, form } = $props();

	$effect(() => {
		if (form?.success) {
			const context = getDeclarationContext();
			context.stockComplete = true;
			goto("../declaration");
		}
	});
</script>

<h1 class="fr-h2">Passons en revue votre stock en {data.year}</h1>

<p>
	Veuillez vérifier les données relatives à vos stocks pour chaque espèce et
	chaque stade d’élevage.
</p>
<form method="POST" use:enhanceNoInvalidate>
	<StockDetails bilan={data.bilan} etablissement={data.etablissement}
	></StockDetails>

	<NavigationLinks prevHref="1" nextIsButton />
</form>
