<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";
	import defaultsDeep from "lodash/defaultsDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RadioGroup from "$lib/components/radio-group.svelte";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		if (aPermanents) {
			defaultsDeep(donnees, {
				equipe: {
					permanents: {
						femmes: { salarie: {}, nonSalarie: {} },
						hommes: { salarie: {}, nonSalarie: {} },
					},
				},
			});
		} else {
			delete donnees.equipe.permanents;
		}

		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		if (data.declaration.donnees.equipe.permanents) {
			goto("./permanents/1");
		} else {
			goto("../recapitulatif");
		}
	};

	let aPermanents: boolean | undefined = $state(!!donnees.equipe.permanents);
</script>

<div>
	<p class="fr-text--xl">
		L’entreprise dispose-t-elle d’une main d’oeuvre permanente ?
	</p>

	<p>
		Tout personnel présent au 31 décembre 2023, quel que soit le temps de
		travail. Attention : exclure CDD, intérimaires et stagiaires, et dirigeants
		et associés.
	</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet inputs()}
				<RadioGroup
					name="radio-inline"
					id="radio-oui"
					inline
					value={true}
					required
					bind:group={aPermanents}
				>
					{#snippet label()}Oui{/snippet}
				</RadioGroup>

				<RadioGroup
					name="radio-inline"
					id="radio-non"
					inline
					value={false}
					required
					bind:group={aPermanents}
				>
					{#snippet label()}Non{/snippet}
				</RadioGroup>
			{/snippet}
		</Fieldset>

		<NavigationLinks nextIsButton cantAnswerBtn />
	</form>
</div>
