<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { ChangeEventHandler, FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RadioGroup from "$lib/components/radio-group.svelte";
	import { ESPECES, type ESPECES_ID } from "$lib/constants";
	import { aVenduNaissains, ventesParEspece } from "$lib/declaration-utils";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const especesActives = $derived(
		ESPECES.filter((e) => ventesParEspece(donnees, e.id).active()),
	);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("./recapitulatif");
	};

	const handleCheck = (checked: boolean, id: ESPECES_ID) => {
		const v = ventesParEspece(donnees, id);
		if (checked) {
			v.naissain.enable();
		} else {
			v.naissain.disable();
		}
	};

	const handleRadioChange: ChangeEventHandler<HTMLInputElement> = () => {
		especesActives.forEach((e) => {
			const v = ventesParEspece(donnees, e.id);
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

		{#if radioValue && especesActives.length > 1}
			<p class="fr-text--xl">Veuillez préciser les espèces concernées :</p>

			<Fieldset>
				{#snippet legend()}
					Vous pouvez sélectionner une ou plusieurs réponses.
				{/snippet}

				{#snippet inputs()}
					{#each especesActives as espece (espece.id)}
						<CheckboxGroup
							name={espece.id}
							id={espece.id}
							checked={ventesParEspece(donnees, espece.id).active()}
							onCheck={(event) =>
								handleCheck(event.currentTarget.checked, espece.id)}
						>
							{#snippet label()}{espece.label}{/snippet}
						</CheckboxGroup>
					{/each}
				{/snippet}
			</Fieldset>
		{/if}
		<NavigationLinks prevHref="./2" nextIsButton />
	</form>
</div>
