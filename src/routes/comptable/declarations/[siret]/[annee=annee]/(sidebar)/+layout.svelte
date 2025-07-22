<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import { type SlideParams, slide } from "svelte/transition";

	import { page } from "$app/state";

	import SideMenu from "./side-menu.svelte";

	let { data, children } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	function maybeSlide(
		node: Element,
		options: SlideParams & { shouldTransition: boolean },
	) {
		if (options.shouldTransition) {
			return slide(node, options);
		}
		return {};
	}
</script>

{#key page.url.pathname}
	<div
		class="fr-container"
		transition:maybeSlide={{
			axis: "y",
			shouldTransition: page.data.shouldTransition,
		}}
	>
		<div class="fr-grid-row">
			<div class="fr-col-md-4 fr-col-lg-3 fr-col-12">
				<SideMenu
					step={page.data.step}
					baseUrl="/comptable/declarations/{data.etablissement
						.siret}/{data.annee}"
					nomEtablissement={data.etablissement.denomination}
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
{/key}
