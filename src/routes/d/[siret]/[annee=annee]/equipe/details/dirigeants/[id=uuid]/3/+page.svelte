<script lang="ts">
	import merge from "lodash/merge";
	import { defaults } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import { z } from "zod";

	import Fieldset from "$lib/components/fieldset.svelte";
	import FormDebug from "$lib/components/form-debug.svelte";
	import InputGroup from "$lib/components/input-group.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RadioGroup from "$lib/components/radio-group2.svelte";
	import {
		DIPLOMES,
		DIPLOMES_IDS,
		REGIMES_SOCIAUX,
		REGIMES_SOCIAUX_IDS,
	} from "$lib/constants";
	import { prepareForm } from "$lib/form-utils";
	import { ERR_MUST_CHOOSE_ANSWER, Percent } from "$lib/types";

	const { data } = $props();

	const schema = z.object({
		statut: z
			.literal(["salarie", "nonSalarie"], ERR_MUST_CHOOSE_ANSWER)
			.default(data.dirigeant.statut ?? ("" as "salarie")),
		tempsTravail: Percent.default(
			data.dirigeant.tempsTravail ?? (null as unknown as number),
		),
		diplome: z
			.enum(DIPLOMES_IDS, ERR_MUST_CHOOSE_ANSWER)
			.default(data.dirigeant.diplome ?? ("" as "aucun")),
		regimeSocial: z
			.enum(REGIMES_SOCIAUX_IDS, ERR_MUST_CHOOSE_ANSWER)
			.default(data.dirigeant.regimeSocial ?? ("" as "general")),
	});

	const { form, errors, enhance } = prepareForm(
		schema,
		data.declaration,
		() => "../../../recapitulatif",
		(form) => {
			merge(
				data.declaration.donnees.equipe.dirigeants.find(
					(d) => d.id === data.dirigeant.id,
				),
				{
					...form.data,
				},
			);
			return data.declaration;
		},
		defaults(zod4(schema)),
	);
</script>

<div>
	<p class="fr-text--xl">Son statut et ses qualifications</p>
	<form method="POST" use:enhance>
		<Fieldset hasError={!!$errors?.statut}>
			{#snippet legend()}Statut{/snippet}
			{#snippet inputs(fieldsetId)}
				<RadioGroup inline>
					{#snippet input(id)}
						<input
							{id}
							type="radio"
							aria-describedby="radio-{id}-messages"
							value="salarie"
							bind:group={$form.statut}
							autocomplete="off"
						/>
					{/snippet}
					{#snippet label()}Salarié{/snippet}
				</RadioGroup>

				<RadioGroup inline>
					{#snippet input(id)}
						<input
							{id}
							type="radio"
							aria-describedby="radio-{id}-messages"
							value="nonSalarie"
							bind:group={$form.statut}
							autocomplete="off"
						/>
					{/snippet}
					{#snippet label()}Non salarié{/snippet}
				</RadioGroup>

				{#if $errors?.statut}
					<div
						class="fr-messages-group"
						id="{fieldsetId}-messages"
						aria-live="polite"
					>
						<p class="fr-message fr-message--error" id="{fieldsetId}-errors">
							{$errors.statut}
						</p>
					</div>
				{/if}
			{/snippet}
		</Fieldset>

		<Fieldset>
			{#snippet inputs()}
				<InputGroup
					type="number"
					bind:value={$form.tempsTravail}
					errors={$errors?.tempsTravail}
				>
					{#snippet label()}Temps de travail (%){/snippet}
				</InputGroup>

				<div class="fr-fieldset__element">
					<div
						class={[
							"fr-select-group",
							$errors?.diplome && "fr-select-group--error",
						]}
					>
						<label class="fr-label" for="diplome">
							Diplôme le plus élevé obtenu
						</label>
						<select
							class="fr-select"
							aria-describedby="diplome-messages"
							id="diplome"
							name="diplome"
							bind:value={$form.diplome}
						>
							<option value="" selected disabled>
								Sélectionnez une option
							</option>
							{#each DIPLOMES as d (d.id)}
								<option value={d.id}>{d.label}</option>
							{/each}
						</select>
						{#if $errors?.diplome}
							<div
								class="fr-messages-group"
								id="diplome-messages"
								aria-live="polite"
							>
								<p
									class="fr-message fr-message--error"
									id="diplome-messages-error"
								>
									{$errors.diplome}
								</p>
							</div>
						{/if}
					</div>
				</div>

				<div class="fr-fieldset__element">
					<div
						class={[
							"fr-select-group",
							$errors?.regimeSocial && "fr-select-group--error",
						]}
					>
						<label class="fr-label" for="regime">Régime social</label>
						<select
							class="fr-select"
							aria-describedby="regime-messages"
							id="regime"
							name="regime"
							bind:value={$form.regimeSocial}
						>
							<option value="" selected disabled>
								Sélectionnez une option
							</option>
							{#each REGIMES_SOCIAUX as r (r.id)}
								<option value={r.id}>{r.label}</option>
							{/each}
						</select>
						{#if $errors?.regimeSocial}
							<div
								class="fr-messages-group"
								id="regime-messages"
								aria-live="polite"
							>
								<p
									class="fr-message fr-message--error"
									id="regime-messages-error"
								>
									{$errors.regimeSocial}
								</p>
							</div>
						{/if}
					</div>
				</div>
			{/snippet}
		</Fieldset>

		<NavigationLinks prevHref="./2" nextIsButton cantAnswerBtn />
	</form>
</div>

<FormDebug {form} {errors} data={data.dirigeant}></FormDebug>
