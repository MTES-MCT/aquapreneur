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
	import { COUNTRIES } from "$lib/constants";
	import { prepareForm } from "$lib/form-utils";
	import {
		ERR_MUST_CHOOSE_ANSWER,
		ERR_REQUIRED,
		NonEmptyString,
		Year,
	} from "$lib/types";

	const { data } = $props();

	const schema = z.object({
		prenomNom: NonEmptyString.default(data.dirigeant.prenomNom ?? ""),
		anneeNaissance: Year.max(
			data.annee,
			"Veuillez renseigner une année antérieure à la date de la déclaration",
		).default(data.dirigeant.anneeNaissance ?? (null as unknown as number)),
		nationalite: z
			.string(ERR_REQUIRED)
			.length(2, ERR_MUST_CHOOSE_ANSWER)
			.default(data.dirigeant.nationalite ?? ""),
		sexe: z
			.literal(["M", "F"], ERR_MUST_CHOOSE_ANSWER)
			.default(data.dirigeant.sexe ?? (null as unknown as "M" | "F")),
	});

	const { form, errors, enhance } = prepareForm(
		schema,
		data.declaration,
		() => "./3",
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
	<p class="fr-text--xl">Son identité</p>
	<form method="POST" use:enhance>
		<Fieldset>
			{#snippet inputs()}
				<InputGroup
					type="text"
					bind:value={$form.prenomNom}
					errors={$errors?.prenomNom}
				>
					{#snippet label()}Nom et prénom{/snippet}
				</InputGroup>

				<InputGroup
					type="number"
					bind:value={$form.anneeNaissance}
					errors={$errors?.anneeNaissance}
				>
					{#snippet label()}Année de naissance{/snippet}
				</InputGroup>

				<div class="fr-fieldset__element">
					<div
						class={[
							"fr-select-group",
							$errors?.nationalite && "fr-select-group--error",
						]}
					>
						<label class="fr-label" for="select-1">Nationalité</label>
						<select
							class="fr-select"
							aria-describedby="select-1-messages"
							id="select-1"
							bind:value={$form.nationalite}
						>
							<option value="" selected disabled>
								Sélectionnez une option
							</option>
							{#each COUNTRIES as c (c.iso_alpha2)}
								<option value={c.iso_alpha2}>{c.label}</option>
							{/each}
						</select>
						{#if $errors?.nationalite}
							<div
								class="fr-messages-group"
								id="select-1-messages"
								aria-live="polite"
							>
								<p
									class="fr-message fr-message--error"
									id="select-1-message-error"
								>
									{$errors.nationalite}
								</p>
							</div>
						{/if}
					</div>
				</div>
			{/snippet}
		</Fieldset>

		<Fieldset hasError={!!$errors?.sexe}>
			{#snippet legend()}Sexe{/snippet}
			{#snippet inputs(fieldsetId)}
				<RadioGroup inline>
					{#snippet input(id)}
						<input
							{id}
							type="radio"
							aria-describedby="radio-{id}-messages"
							value="F"
							bind:group={$form.sexe}
							autocomplete="off"
						/>
					{/snippet}
					{#snippet label()}Féminin{/snippet}
				</RadioGroup>

				<RadioGroup inline>
					{#snippet input(id)}
						<input
							{id}
							type="radio"
							aria-describedby="radio-{id}-messages"
							value="M"
							bind:group={$form.sexe}
							autocomplete="off"
						/>
					{/snippet}
					{#snippet label()}Masculin{/snippet}
				</RadioGroup>

				{#if $errors?.sexe}
					<div
						class="fr-messages-group"
						id="{fieldsetId}-messages"
						aria-live="polite"
					>
						<p class="fr-message fr-message--error" id="{fieldsetId}-errors">
							{$errors.sexe}
						</p>
					</div>
				{/if}
			{/snippet}
		</Fieldset>
		<NavigationLinks prevHref="./1" nextIsButton cantAnswerBtn />
	</form>
</div>

<FormDebug {form} {errors} data={data.dirigeant}></FormDebug>
