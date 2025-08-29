<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RadioGroup from "$lib/components/radio-group.svelte";
	import { DIPLOMES, REGIMES_SOCIAUX } from "$lib/constants";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));
	let dirigeant = $derived(
		// TODO hors manipulation de l’URL, le dirigeant devrait exister
		// mais il faut gérer ce cas correctement
		donnees.equipe.dirigeants.find((d) => d.id === data.dirigeantId)!,
	);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		// TODO: validation
		goto("../../../recapitulatif");
	};
</script>

<div>
	<p class="fr-text--xl">Son statut et ses qualifications</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet legend()}Statut{/snippet}
			{#snippet inputs()}
				<RadioGroup
					name="radio-inline"
					id="radio-salarie"
					inline
					value="salarie"
					required
					bind:group={dirigeant.statut}
				>
					{#snippet label()}Salarié{/snippet}
				</RadioGroup>

				<RadioGroup
					name="radio-inline"
					id="radio-non-salarie"
					inline
					value="nonSalarie"
					required
					bind:group={dirigeant.statut}
				>
					{#snippet label()}Non salarié{/snippet}
				</RadioGroup>
			{/snippet}
		</Fieldset>
		<Fieldset>
			{#snippet inputs()}
				<InputGroup
					name="temps-travail"
					type="number"
					min={0}
					max={100}
					fieldsetId="temps-travail"
					bind:value={dirigeant.tempsTravail}
				>
					{#snippet label()}Temps de travail (%){/snippet}
				</InputGroup>

				<div class="fr-fieldset__element">
					<div class="fr-select-group">
						<label class="fr-label" for="diplome">
							Diplôme le plus élevé obtenu
						</label>
						<select
							class="fr-select"
							aria-describedby="diplome-messages"
							id="diplome"
							name="diplome"
							bind:value={dirigeant.diplome}
						>
							<option value={undefined} selected disabled>
								Sélectionnez une option
							</option>
							{#each DIPLOMES as d (d.id)}
								<option value={d.id}>{d.label}</option>
							{/each}
						</select>
						<div
							class="fr-messages-group"
							id="diplome-messages"
							aria-live="polite"
						></div>
					</div>
				</div>

				<div class="fr-fieldset__element">
					<div class="fr-select-group">
						<label class="fr-label" for="regime">Régime social</label>
						<select
							class="fr-select"
							aria-describedby="regime-messages"
							id="regime"
							name="regime"
							bind:value={dirigeant.regimeSocial}
						>
							<option value={undefined} selected disabled>
								Sélectionnez une option
							</option>
							{#each REGIMES_SOCIAUX as r (r.id)}
								<option value={r.id}>{r.label}</option>
							{/each}
						</select>
						<div
							class="fr-messages-group"
							id="regime-messages"
							aria-live="polite"
						></div>
					</div>
				</div>
			{/snippet}
		</Fieldset>

		<NavigationLinks prevHref="./2" nextIsButton cantAnswerBtn />
	</form>
</div>
