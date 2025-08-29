<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import RadioGroup from "$lib/components/radio-group.svelte";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	const donnees = $state(cloneDeep(data.declaration.donnees));

	const dirigeant = $derived(
		donnees.equipe.dirigeants.find((d) => d.id === data.dirigeantId) ?? {
			id: data.dirigeantId,
		},
	);

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		if (
			donnees.equipe.dirigeants.find((d) => d.id === data.dirigeantId) == null
		) {
			donnees.equipe.dirigeants.push(dirigeant);
		}
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("./2");
	};
</script>

<div>
	<p class="fr-text--xl">
		Cette personne dirigeante ou associée a-t-elle rejoint l’entreprise en
		{data.annee} ?
	</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet inputs()}
				<RadioGroup
					name="radio-inline"
					id="radio-oui"
					inline
					value={true}
					bind:group={dirigeant.nouveauDirigeant}
				>
					{#snippet label()}Oui{/snippet}
				</RadioGroup>

				<RadioGroup
					name="radio-inline"
					id="radio-non"
					inline
					value={false}
					bind:group={dirigeant.nouveauDirigeant}
				>
					{#snippet label()}Non{/snippet}
				</RadioGroup>
			{/snippet}
		</Fieldset>

		<NavigationLinks nextIsButton cantAnswerBtn />
	</form>
</div>
