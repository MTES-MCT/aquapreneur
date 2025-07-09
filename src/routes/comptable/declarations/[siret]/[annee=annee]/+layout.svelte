<script lang="ts">
	import { page } from "$app/state";

	import SideMenu from "./side-menu.svelte";

	let { data, children } = $props();

	let donnees = $state(JSON.parse(JSON.stringify(data.declaration.donnees)));
</script>

<div class="fr-container">
	<div class="fr-grid-row">
		<div class="fr-col-md-4 fr-col-lg-3 fr-col-12">
			<SideMenu
				step={page.data.step}
				baseUrl="/comptable/declarations/{data.declaration.annee}"
				{donnees}
			></SideMenu>
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
