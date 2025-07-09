<script lang="ts">
	import type { DeclarationSchema } from "$lib/schemas/declaration-schema";

	const { donnees }: { donnees: DeclarationSchema } = $props();

	const formatValue = (value: number | string | null): string => {
		return value != null ?
				Intl.NumberFormat("fr-FR", {
					style: "currency",
					currency: "EUR",
				}).format(typeof value === "string" ? Number.parseFloat(value) : value)
			:	"n/a";
	};

	const template = $derived(
		[
			{
				nom: "Huîtres",
				stades: [
					{
						nom: "Ventes d’huîtres de taille marchande destinées à la consommation",
						description:
							"Il s’agit de la production d’huîtres de taille marchande que vous avez vendue pour la consommation.",
						total: donnees.especes.huitresCreuses.ventes.adultes.total,
						destinations: [
							{
								nom: "En gros",
								val: donnees.especes.huitresCreuses.ventes.adultes.total,
							},
							{
								nom: "Dégustation",
								val: donnees.especes.huitresCreuses.ventes.adultes.degustation,
							},
						],
					},
				],
			},
		].map((type) => ({
			...type,
			stades: type.stades.map((stade) => ({
				...stade,
				val: stade.total,
			})),
		})),
	);
</script>

{#each template as entry (entry.nom)}
	<h2 class="fr-h6">{entry.nom}</h2>
	<div class="fr-accordions-group">
		{#each entry.stades as stade (stade.nom)}
			{#if stade.val}
				<section class="fr-accordion">
					<h3 class="fr-accordion__title">
						<button
							type="button"
							class="fr-accordion__btn"
							aria-expanded="false"
							aria-controls="accordion-{entry.nom}-{stade.nom}"
						>
							{stade.nom}
						</button>
					</h3>
					<div class="fr-collapse" id="accordion-{entry.nom}-{stade.nom}">
						<p class="fr-text--sm">{stade.description}</p>
						<dl class="wrapper">
							<dt>Valeur HT vendue</dt>
							<dd>
								{formatValue(stade.val)}
							</dd>
						</dl>
						<dl class="wrapper large">
							<dt>Destination des ventes</dt>
							<dd>
								<div>
									<div
										class="fr-table fr-table--bordered"
										id="table-bordered-component"
									>
										<div class="fr-table__wrapper">
											<div class="fr-table__container">
												<div class="fr-table__content">
													<table id="table-bordered">
														<thead>
															<tr>
																<th scope="col">Destination</th>
																<th scope="col">Montant HT</th>
															</tr>
														</thead>
														<tbody>
															{#each stade.destinations as destination (destination.nom)}
																<!-- {#if destination.val} -->
																<tr>
																	<td>{destination.nom}</td>
																	<td class="fr-cell--right">
																		{formatValue(destination.val)}
																	</td>
																</tr>
																<!-- {/if} -->
															{/each}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</div>
							</dd>
						</dl>
					</div>
				</section>
			{/if}
		{/each}
	</div>
{/each}

<style>
	.fr-table--bordered {
		margin-top: 0.5rem;
	}

	td {
		white-space: normal;
		word-break: keep-all;
	}

	dl {
		display: block;
	}

	dt {
		font-weight: bold;
		margin-right: 2rem;
	}

	dd {
		padding: 0;
		margin-bottom: 1rem;
	}

	@media (min-width: 48em) {
		.fr-table--bordered {
			margin-top: 0;
		}

		dl,
		dl.large {
			display: grid;
			grid-template-columns: 1fr 2fr;
			padding: 0;
		}
	}
</style>
