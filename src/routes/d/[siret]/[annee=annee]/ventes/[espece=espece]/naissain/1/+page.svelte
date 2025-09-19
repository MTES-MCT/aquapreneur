<script lang="ts">
	import cloneDeep from "lodash/cloneDeep";

	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import CheckboxGroup from "$lib/components/checkbox-group.svelte";
	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { dVentes } from "$lib/declaration-utils";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	let donnees = $state(cloneDeep(data.declaration.donnees));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(data.declaration);
		goto("./2");
	};

	const handleCheck = (checked: boolean, id: "captage" | "ecloserie") => {
		const v = dVentes(donnees, data.espece.id).naissain;
		if (id === "captage") {
			if (checked) {
				v.captage.enable();
			} else {
				v.captage.disable();
			}
		} else if (id === "ecloserie") {
			if (checked) {
				v.ecloserieDiploide.enable();
				v.ecloserieTriploide.enable();
			} else {
				v.ecloserieDiploide.disable();
				v.ecloserieTriploide.disable();
			}
		}
	};
</script>

<div>
	<p class="fr-text--xl">Comment produisez-vous le naissain ?</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet legend()}
				Vous pouvez sélectionner une ou plusieurs réponses.
			{/snippet}

			{#snippet inputs()}
				<CheckboxGroup
					name="captage"
					id="captage"
					checked={dVentes(donnees, data.espece.id).naissain.captage.active()}
					onCheck={(event) =>
						handleCheck(event.currentTarget.checked, "captage")}
				>
					{#snippet label()}Par captage en milieu naturel{/snippet}
				</CheckboxGroup>
				<CheckboxGroup
					name="ecloserie"
					id="ecloserie"
					checked={dVentes(
						donnees,
						data.espece.id,
					).naissain.ecloserieDiploide.active() ||
						dVentes(
							donnees,
							data.espece.id,
						).naissain.ecloserieTriploide.active()}
					onCheck={(event) =>
						handleCheck(event.currentTarget.checked, "ecloserie")}
				>
					{#snippet label()}En écloserie ou nurserie{/snippet}
				</CheckboxGroup>
			{/snippet}
		</Fieldset>

		<NavigationLinks
			prevHref="./intro"
			nextIsButton
			cantAnswerBtn={data.persona === "comptable"}
		/>
	</form>
</div>
