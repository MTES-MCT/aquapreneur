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
		goto("./3");
	};
	let radioValue: boolean | undefined = $state(true);
</script>

<div>
	<p class="fr-text--xl">Son identité</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet inputs()}
				<InputGroup name="part-bio" type="text" fieldsetId="nom">
					{#snippet label()}Nom et prénom{/snippet}
				</InputGroup>
				<InputGroup name="part-bio" type="text" fieldsetId="naissance">
					{#snippet label()}Année de naissance{/snippet}
				</InputGroup>
				<InputGroup name="part-bio" type="text" fieldsetId="nationatite">
					{#snippet label()}Nationalité{/snippet}
				</InputGroup>
			{/snippet}
		</Fieldset>

		<Fieldset>
			{#snippet legend()}Sexe{/snippet}
			{#snippet inputs()}
				<RadioGroup
					name="radio-inline"
					id="radio-oui"
					inline
					value={true}
					required
					bind:group={radioValue}
				>
					{#snippet label()}Féminin{/snippet}
				</RadioGroup>

				<RadioGroup
					name="radio-inline"
					id="radio-non"
					inline
					value={false}
					required
					bind:group={radioValue}
				>
					{#snippet label()}Masculin{/snippet}
				</RadioGroup>
			{/snippet}
		</Fieldset>
		<NavigationLinks prevHref="./1" nextIsButton cantAnswerBtn />
	</form>
</div>
