<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RadioGroup from "$lib/components/radio-group.svelte";
	import { dVentes } from "$lib/declaration-utils";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();

		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		if (dVentes(donnees, data.espece.id).elevage.active()) goto("./1");
		else goto("../../recapitulatif");
	};

	const handleRadioChange = () => {
		const v = dVentes(donnees, data.espece.id);
		if (radioValue) {
			v.elevage.enable();
		} else {
			v.elevage.disable();
		}
	};
	let radioValue: boolean | undefined = $state(
		dVentes(donnees, data.espece.id).elevage.active() ? true : false,
	);
</script>

<div>
	<p class="fr-text--xl">
		Avez-vous réalisé des ventes à l’élevage (hors naissain) ?
	</p>
	<p>
		Il s’agit des ventes de {data.espece.label} destinées au grossissement ou à l’affinage
		par d’autres professionnels.
	</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet inputs()}
				<RadioGroup
					name="radio"
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
					name="radio"
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

		<NavigationLinks
			prevHref="../../recapitulatif"
			nextIsButton
			cantAnswerBtn
		/>
	</form>
</div>
