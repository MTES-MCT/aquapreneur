<script lang="ts">
	import { goto } from "$app/navigation";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { getDeclarationContext } from "$lib/declaration-context";
	import { enhanceNoInvalidate } from "$lib/utils";

	import ContactTable from "./contact-table.svelte";

	const { form } = $props();

	$effect(() => {
		if (form?.success) {
			const context = getDeclarationContext();
			context.entrepriseComplete = true;
			goto("../concessions");
		}
	});
</script>

<h1 class="fr-h2">Comment vous contacter</h1>
<p>
	Merci de vérifier si vos coordonnées de contact sont exactes, et si besoin les
	corriger ou les compléter.
</p>
<form method="POST" use:enhanceNoInvalidate>
	<ContactTable editable></ContactTable>
	<NavigationLinks prevHref="2" nextIsButton />
</form>
