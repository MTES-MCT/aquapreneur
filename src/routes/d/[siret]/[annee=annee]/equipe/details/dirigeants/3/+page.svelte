<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RadioGroup from "$lib/components/radio-group.svelte";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		// TODO: validation
		goto("../../recapitulatif");
	};

	let radioValue: boolean | undefined = $state(false);

	const diplomes = [
		"Sans diplôme qualifiant",
		"CAP / BEP",
		"Bac",
		"Bac +2",
		"Licence et plus",
	];
	const regimes = ["Général", "Enim", "MSA"];
</script>

<div>
	<p class="fr-text--xl">Son statut et ses qualifications</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet legend()}Statut{/snippet}
			{#snippet inputs()}
				<RadioGroup
					name="radio-inline"
					id="radio-oui"
					inline
					value={true}
					required
					bind:group={radioValue}
				>
					{#snippet label()}Salarié{/snippet}
				</RadioGroup>

				<RadioGroup
					name="radio-inline"
					id="radio-non"
					inline
					value={false}
					required
					bind:group={radioValue}
				>
					{#snippet label()}Non salarié{/snippet}
				</RadioGroup>
			{/snippet}
		</Fieldset>
		<Fieldset>
			{#snippet inputs()}
				<InputGroup name="part-bio" type="number" fieldsetId="nom">
					{#snippet label()}Temps de travail (%){/snippet}
				</InputGroup>

				<div class="fr-fieldset__element">
					<div class="fr-select-group">
						<label class="fr-label" for="select-1">
							Diplôme le plus élevé obtenu
						</label>
						<select
							class="fr-select"
							aria-describedby="select-1-messages"
							id="select-1"
							name="select-1"
						>
							<option value="" selected disabled>
								Sélectionnez une option
							</option>
							{#each diplomes as d (d)}
								<option value="d">{d}</option>
							{/each}
						</select>
						<div
							class="fr-messages-group"
							id="select-1-messages"
							aria-live="polite"
						></div>
					</div>
				</div>
				<div class="fr-fieldset__element">
					<div class="fr-select-group">
						<label class="fr-label" for="select-1">Régime social</label>
						<select
							class="fr-select"
							aria-describedby="select-1-messages"
							id="select-1"
							name="select-1"
						>
							<option value="" selected disabled>
								Sélectionnez une option
							</option>
							{#each regimes as r (r)}
								<option value="r">{r}</option>
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

		<NavigationLinks prevHref="./2" nextIsButton cantAnswerBtn />
	</form>
</div>
