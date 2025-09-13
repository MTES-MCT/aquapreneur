<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import Fieldset from "$lib/components/fieldset.svelte";
	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { STADES_ELEVAGE } from "$lib/constants";
	import { submitDeclarationUpdate } from "$lib/utils";

	const { data } = $props();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		data.declaration.donnees = await submitDeclarationUpdate(data.declaration);
		// TODO: marquer comme validé
		goto("../../recapitulatif");
	};
</script>

<div>
	<p class="fr-text--xl">
		Quels étaient vos volumes en stock au cours de l’année passée ?
	</p>
	<form method="POST" onsubmit={handleSubmit}>
		<Fieldset>
			{#snippet legend()}
				Indiquez la quantité pour chaque stade d’élevage.
			{/snippet}
			{#snippet inputs()}
				<div class="fr-table fr-table--lg">
					<div class="fr-table__wrapper">
						<div class="fr-table__container">
							<div class="fr-table__content">
								<table class="fr-cell--multiline">
									<thead>
										<tr>
											<th>Destination</th>
											<th>Stock au 30 juin 2024</th>
											<th>Stock au 1er juin 2025</th>
										</tr>
									</thead>
									<tbody>
										{#each STADES_ELEVAGE as stade (stade.id)}
											<tr>
												<td>{stade.label}</td>
												<td>
													<input
														class="fr-input"
														type="text"
														placeholder="kg"
														autocomplete="off"
													/>
												</td>
												<td>
													<input
														class="fr-input"
														type="text"
														placeholder="kg"
														autocomplete="off"
													/>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			{/snippet}
		</Fieldset>
		<NavigationLinks prevHref="./1" nextIsButton cantAnswerBtn />
	</form>
</div>
