<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import TextareaGroup from "$lib/components/textarea–group.svelte";
	import { ALEAS, type ALEAS_ID } from "$lib/constants";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const handleCheck = (checked: boolean, id: ALEAS_ID) => {
		const c = donnees.retourAnnee;
		const aleas = c.aleas == null ? [] : c.aleas.filter((a) => a !== id);
		if (checked) {
			aleas.push(id);
		}
		c.aleas = aleas;
		if (c.aleas.length === 0) {
			c.aleasDetails = null;
		}
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("./2");
	};
</script>

<div class="fr-stepper">
	<h1 class="fr-stepper__title">
		La production a-t-elle été perturbée par des imprévus ?
		<span class="fr-stepper__state">Question 1 sur 3</span>
	</h1>
	<div
		class="fr-stepper__steps"
		data-fr-current-step="1"
		data-fr-steps="3"
	></div>
	<p class="fr-stepper__details">
		<span class="fr-text--bold">Étape suivante :</span>
		Avez-vous rencontré d’autres défis ou difficultés cette année ?
	</p>
</div>

<form method="POST" onsubmit={handleSubmit}>
	<Fieldset>
		{#snippet legend()}
			Vous pouvez sélectionner une ou plusieurs réponses.
		{/snippet}

		{#snippet inputs()}
			{#each ALEAS as alea (alea.id)}
				{@const aleaId = alea.id}
				<CheckboxGroup
					name={aleaId}
					id={aleaId}
					checked={donnees.retourAnnee.aleas?.includes(aleaId)}
					onCheck={(event) => handleCheck(event.currentTarget.checked, aleaId)}
				>
					{#snippet label()}{alea.label}{/snippet}
				</CheckboxGroup>
			{/each}

			<div class="fr-mb-4w"></div>
			{#if donnees.retourAnnee.aleas.length}
				<TextareaGroup
					name="details"
					rows={3}
					bind:value={donnees.retourAnnee.aleasDetails}
				>
					{#snippet label()}Détails supplémentaires (facultatif) :{/snippet}
				</TextareaGroup>
			{/if}
		{/snippet}
	</Fieldset>

	<NavigationLinks nextIsButton />
</form>
