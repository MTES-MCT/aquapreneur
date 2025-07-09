<script lang="ts">
	import { page } from "$app/state";

	import MenuDeclaration from "$lib/components/menu-declaration.svelte";
	import { setDeclarationContext } from "$lib/declaration-context";

	let { data, children } = $props();
	const donneesDeclaration = $state(data.donneesDeclaration);

	setDeclarationContext(donneesDeclaration);
</script>

<div class="fr-container">
	<div class="fr-grid-row">
		<div class="fr-col-md-4 fr-col-lg-3 fr-col-12">
			<MenuDeclaration
				step={page.data.step}
				baseUrl="/producteur/declarations/{data.annee}"
			></MenuDeclaration>
		</div>

		<div
			id="contenu"
			class="fr-col-12 fr-col-md-8 fr-col-lg-7 fr-mx-auto fr-pt-md-12v fr-pt-8v fr-pb-12v"
			style="min-height: 100vh; "
		>
			{@render children()}
		</div>
	</div>
</div>
