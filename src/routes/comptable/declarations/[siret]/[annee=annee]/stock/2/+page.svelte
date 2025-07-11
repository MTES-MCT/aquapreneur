<script lang="ts">
	import type { FormEventHandler } from "svelte/elements";

	import { goto } from "$app/navigation";

	import NavigationLinks from "$lib/components/navigation-links.svelte";
	import { submitDeclarationUpdate } from "$lib/utils";

	import StockDetails from "./stock-details.svelte";

	const { data } = $props();

	let donnees = $state(JSON.parse(JSON.stringify(data.declaration.donnees)));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		donnees.etapes.stockValidee = true;
		data.declaration.donnees = await submitDeclarationUpdate(
			data.declaration.id,
			donnees,
		);
		goto("../declaration/");

		donnees.etapes.stockValidee = true;
	};
</script>

<h1 class="fr-h2">Passons en revue votre stock en {data.declaration.annee}</h1>

<button
	aria-controls="modal-0"
	data-fr-opened="false"
	type="button"
	class="fr-btn"
>
	Ouvrir la modale
</button>

<dialog
	id="modal-0"
	class="fr-modal"
	aria-labelledby="modal-0-title"
	data-fr-concealing-backdrop="true"
>
	<div class="fr-container fr-container--fluid fr-container-md">
		<div class="fr-grid-row fr-grid-row--center">
			<div class="fr-col-12 fr-col-md-8 fr-col-lg-6">
				<div class="fr-modal__body">
					<div class="fr-modal__header">
						<button
							aria-controls="modal-0"
							title="Fermer"
							type="button"
							id="button-5"
							class="fr-btn--close fr-btn"
						>
							Fermer
						</button>
					</div>
					<div class="fr-modal__content">
						<h2 id="modal-0-title" class="fr-modal__title">
							<span
								class="fr-icon-info-line fr-icon--lg"
								aria-hidden="true"
							></span>
							Titre de la modale
						</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut
							labore et dolore magna aliqua. Vitae sapien pellentesque habitant
							morbi tristique senectus et. Diam maecenas sed enim ut. Accumsan
							lacus vel facilisis volutpat est. Ut aliquam purus sit amet
							luctus. Lorem ipsum dolor sit amet consectetur adipiscing elit ut.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut
							labore et dolore magna aliqua. Vitae sapien pellentesque habitant
							morbi tristique senectus et. Diam maecenas sed enim ut. Accumsan
							lacus vel facilisis volutpat est. Ut aliquam purus sit amet
							luctus. Lorem ipsum dolor sit amet consectetur adipiscing elit ut.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut
							labore et dolore magna aliqua. Vitae sapien pellentesque habitant
							morbi tristique senectus et. Diam maecenas sed enim ut. Accumsan
							lacus vel facilisis volutpat est. Ut aliquam purus sit amet
							luctus. Lorem ipsum dolor sit amet consectetur adipiscing elit ut.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut
							labore et dolore magna aliqua. Vitae sapien pellentesque habitant
							morbi tristique senectus et. Diam maecenas sed enim ut. Accumsan
							lacus vel facilisis volutpat est. Ut aliquam purus sit amet
							luctus. Lorem ipsum dolor sit amet consectetur adipiscing elit ut.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut
							labore et dolore magna aliqua. Vitae sapien pellentesque habitant
							morbi tristique senectus et. Diam maecenas sed enim ut. Accumsan
							lacus vel facilisis volutpat est. Ut aliquam purus sit amet
							luctus. Lorem ipsum dolor sit amet consectetur adipiscing elit ut.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing, incididunt, ut
							labore et dolore magna aliqua. Vitae sapien pellentesque habitant
							morbi tristique senectus et. Diam maecenas sed enim ut. Accumsan
							lacus vel facilisis volutpat est. Ut aliquam purus sit amet
							luctus. Lorem ipsum dolor sit amet consectetur adipiscing elit ut.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</dialog>

<p>
	Veuillez vérifier les données relatives à vos stocks pour chaque espèce et
	chaque stade d’élevage.
</p>
<form method="POST" onsubmit={handleSubmit}>
	<StockDetails {donnees}></StockDetails>

	<NavigationLinks prevHref="1" nextIsButton />
</form>
