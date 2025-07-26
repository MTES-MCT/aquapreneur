<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { submitDeclarationUpdate, toNumber } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("./3");
	};

	// TODO La catégorie `bio` a été validée dans ./intro ; on considère
	// pour l’instant qu’elle est bien définie, mais c’est fragile.
	let d = $derived(donnees.ventes[data.espece.id]!.consommation!.bio!);
</script>

<div>
	<p class="fr-text--xl">Quelle part de la production est certifiée Bio ?</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet inputs(id)}
				<InputGroup
					name="part-bio"
					type="text"
					fieldsetId={id}
					value={d.part}
					onChange={(v) => (d.part = toNumber(v.currentTarget.value))}
				>
					{#snippet label()}Part certifiée Agriculture biologique (AB) (%)
						<span class="fr-hint-text">
							Sur les quantités vendues à la consommation
						</span>
					{/snippet}
				</InputGroup>
			{/snippet}
		</Fieldset>
		<NavigationLinks prevHref="./1" nextIsButton cantAnswerBtn />
	</form>
</div>
