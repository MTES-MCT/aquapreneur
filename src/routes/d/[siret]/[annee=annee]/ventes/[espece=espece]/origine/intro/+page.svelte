<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";
	import { onMount } from "svelte";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { dVentes } from "$lib/declaration-utils";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	// TODO on force pour l’instant l’activation de la consommation si on rentre
	// dans cette partie. Il faudra sans doute une modification du parcours pour
	// améliorer ça

	onMount(async () => {
		let donnees = cloneDeep(data.declaration.donnees);
		dVentes(donnees, data.espece.id).consommation.enable();
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
	});
</script>

<div>
	<p>
		Dans cette partie, les questions portent uniquement sur le volume d’{data
			.espece.label} vendue à la consommation. Les pourcentages demandés se réfèrent
		à ce volume.
	</p>

	<NavigationLinks prevHref="../../recapitulatif" nextHref="./1" />
</div>
