<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { ChangeEventHandler, FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RadioGroup from "$lib/components/radio-group.svelte";
	import { ESPECES } from "$lib/constants";
	import { aVenduNaissains, dVentes } from "$lib/declaration-utils";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const especesActives = $derived(
		ESPECES.filter((e) => dVentes(donnees, e.id).active()),
	);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("./recapitulatif");
	};

	// TODO si on modifie les espèces après-coup, les nouvelles espèces ne seront
	// pas activées ici
	const handleRadioChange: ChangeEventHandler<HTMLInputElement> = () => {
		especesActives.forEach((e) => {
			const v = dVentes(donnees, e.id);
			if (radioValue === true) {
				v.naissain.enable();
			} else {
				v.naissain.disable();
			}
		});
	};

	let radioValue: boolean | undefined = $state(aVenduNaissains(donnees));
</script>

<div>
	<h1 class="fr-h2">Ventes</h1>

	<p class="fr-text--xl">Avez-vous vendu du naissain ?</p>

	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet inputs()}
				<RadioGroup
					name="radio-inline"
					id="radio-oui"
					inline
					onChange={handleRadioChange}
					value={true}
					required
					bind:group={radioValue}
				>
					{#snippet label()}Oui{/snippet}
				</RadioGroup>

				<RadioGroup
					name="radio-inline"
					id="radio-non"
					inline
					onChange={handleRadioChange}
					value={false}
					required
					bind:group={radioValue}
				>
					{#snippet label()}Non{/snippet}
				</RadioGroup>
			{/snippet}
		</Fieldset>

		<NavigationLinks prevHref="./2" nextIsButton />
	</form>
</div>
