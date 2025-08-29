<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RadioGroup from "$lib/components/radio-group.svelte";
	import { COUNTRIES } from "$lib/constants";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	const donnees = $state(cloneDeep(data.declaration.donnees));

	const dirigeant = $derived(
		// TODO hors manipulation de l’URL, le dirigeant devrait exister
		// mais il faut gérer ce cas correctement
		donnees.equipe.dirigeants.find((d) => d.id === data.dirigeantId)!,
	);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		if (dirigeant.anneeNaissance == null) dirigeant.anneeNaissance = undefined;
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("./3");
	};
</script>

<div>
	<p class="fr-text--xl">Son identité</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet inputs()}
				<InputGroup
					name="nom"
					type="text"
					fieldsetId="nom"
					bind:value={dirigeant.prenomNom}
				>
					{#snippet label()}Nom et prénom{/snippet}
				</InputGroup>

				<InputGroup
					name="naissance"
					type="number"
					min={1900}
					max={data.annee}
					fieldsetId="naissance"
					bind:value={dirigeant.anneeNaissance}
				>
					{#snippet label()}Année de naissance{/snippet}
				</InputGroup>

				<div class="fr-fieldset__element">
					<div class="fr-select-group">
						<label class="fr-label" for="select-1">Nationalité</label>
						<select
							class="fr-select"
							aria-describedby="select-1-messages"
							id="select-1"
							name="select-1"
							bind:value={dirigeant.nationalite}
						>
							<option value={undefined} selected disabled>
								Sélectionnez une option
							</option>
							{#each COUNTRIES as c (c.iso_alpha2)}
								<option value={c.iso_alpha2}>{c.label}</option>
							{/each}
						</select>
						<div
							class="fr-messages-group"
							id="select-1-messages"
							aria-live="polite"
						></div>
					</div>
				</div>
			{/snippet}
		</Fieldset>

		<Fieldset>
			{#snippet legend()}Sexe{/snippet}
			{#snippet inputs()}
				<RadioGroup
					name="radio-inline"
					id="radio-f"
					inline
					value="F"
					bind:group={dirigeant.sexe}
				>
					{#snippet label()}Féminin{/snippet}
				</RadioGroup>

				<RadioGroup
					name="radio-inline"
					id="radio-m"
					inline
					value="M"
					bind:group={dirigeant.sexe}
				>
					{#snippet label()}Masculin{/snippet}
				</RadioGroup>
			{/snippet}
		</Fieldset>
		<NavigationLinks prevHref="./1" nextIsButton cantAnswerBtn />
	</form>
</div>
