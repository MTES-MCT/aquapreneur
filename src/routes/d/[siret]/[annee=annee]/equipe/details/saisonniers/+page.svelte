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
		if (aSaisonniers) {
			defaultsDeep(donnees, {
				equipe: {
					saisonniers: {
						femmes: { cdd: {}, interim: {} },
						hommes: { cdd: {}, interim: {} },
					},
				},
			});
		} else {
			delete donnees.equipe.saisonniers;
		}

		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		if (data.declaration.donnees.equipe.saisonniers) {
			goto("./saisonniers/1");
		} else {
			goto("../recapitulatif");
		}
	};

	let aSaisonniers: boolean | undefined = $state(!!donnees.equipe.saisonniers);
</script>

<div>
	<p class="fr-text--xl">
		L’entreprise a-t-elle disposé d’une main d’oeuvre saisonnière ?
	</p>

	<p>
		Tout personnel ayant travaillé pour l’entreprise sur une période limitée,
		par exemple à Noël. Sont concernés les CDD, intérimaires, stagiaires,
		personnel de groupements d’employeurs…
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
					bind:group={aSaisonniers}
				>
					{#snippet label()}Oui{/snippet}
				</RadioGroup>

				<RadioGroup
					name="radio-inline"
					id="radio-non"
					inline
					value={false}
					required
					bind:group={aSaisonniers}
				>
					{#snippet label()}Non{/snippet}
				</RadioGroup>
			{/snippet}
		</Fieldset>

		<NavigationLinks nextIsButton cantAnswerBtn />
	</form>
</div>
