<script lang="ts">
	import { type SlideParams, slide } from "svelte/transition";

	import { browser } from "$app/environment";
	import { invalidateAll } from "$app/navigation";
	import { navigating, page } from "$app/state";

	import SideMenu from "./side-menu.svelte";

	let { data, children } = $props();

	if (browser && page.url.searchParams.get("persona")) {
		invalidateAll();
	}

	function maybeSlide(
		node: Element,
		options: SlideParams & { shouldTransition: boolean },
	) {
		const previousDepth = navigating.from?.route?.id?.split("/").length ?? 0;
		const currentDepth = navigating.to?.route?.id?.split("/").length ?? 0;

		// TODO: transition dans l’autre sens
		if (options.shouldTransition && currentDepth > previousDepth) {
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
			{#if !page.data.wide}
				<div class="fr-col-md-4 fr-col-lg-3 fr-col-12">
					<SideMenu
						step={page.data.step}
						baseUrl="/d/{data.etablissement.siret}/{data.annee}"
						nomEtablissement={data.etablissement.denomination}
						donnees={data.declaration.donnees}
						persona={data.persona}
					></SideMenu>
				</div>
			{/if}
			<div
				id="contenu"
				class={page.data.wide ?
					"wide fr-col-12"
				:	"narrow fr-col-12 fr-col-md-8 fr-col-lg-7 fr-mx-auto fr-pt-md-12v fr-pt-8v fr-pb-12v"}
				class:narrow={!page.data.wide}
				class:wide={page.data.wide}
			>
				{@render children()}
			</div>
		</div>
	</div>
{/key}

<style lang="postcss">
	.wide {
	}

	.narrow {
		min-height: 100vh;
	}
</style>
