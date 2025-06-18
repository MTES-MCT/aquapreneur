<script lang="ts">
	import type { bilansSelectSchema } from "$db/schema/api";

	let {
		bilan,
		etablissement,
	}: {
		bilan: bilansSelectSchema | null;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any -- en attente du typage des données SIRENE
		etablissement: any;
	} = $props();

	const formatValue = (value: number | string | null): string => {
		return value != null ?
				Intl.NumberFormat("fr-FR", {
					style: "currency",
					currency: "EUR",
				}).format(typeof value === "string" ? Number.parseFloat(value) : value)
			:	"n/a";
	};

	const sum = (
		values: (string | number | null | undefined)[],
	): number | null => {
		const filteredValues = values.filter((val) => val != null);
		return filteredValues.length ?
				filteredValues.reduce((total: number, current: string | number) => {
					return (
						total +
						(typeof current === "string" ? Number.parseFloat(current) : current)
					);
				}, 0)
			:	null;
	};

	const p = $derived(bilan?.donnees.production ?? {});

	const template = $derived(
		[
			{
				nom: "Huîtres",
				stades: [
					{
						nom: "Ventes d’huîtres de taille marchande destinées à la consommation",
						description:
							"Il s’agit de la production d’huîtres de taille marchande que vous avez vendue pour la consommation.",
						destinations: [
							{
								nom: "En gros",
								qty: p.VolVtHCoFrPro,
								val: p.CAHCoFrPro,
							},
							{
								nom: "Détail",
								qty: p.VolVtHCoFrDet,
								val: p.CAHCoFrDet,
							},
							{
								nom: "Grossistes",
								qty: p.VolVtHCoFrGros,
								val: p.CAHCoFrGros,
							},
							{
								nom: "Poissonneries",
								qty: p.VolVtHCoFrPCE,
								val: p.CAHCoFrPCE,
							},
							{
								nom: "Poissonneries en gr. et moy. surfaces",
								qty: p.VolVtHCoFrPGMS,
								val: p.CAHCoFrPGMS,
							},
							{
								nom: "Dégustation",
								qty: p.VolVtHCoFrDeg,
								val: p.CAHCoFrDeg,
							},
							{
								nom: "Export au sein de l’UE",
								qty: sum([p.VolVtHCoUEPro, p.VolVtHCoUEGros]),
								val: sum([p.CAHCoUEPro, p.CAHCoUEGros]),
							},
							{
								nom: "Export hors UE",
								qty: sum([p.VolVtHCoAuPro, p.VolVtHCoAuGros]),
								val: sum([p.CAHCoAuPro, p.CAHCoAuGros]),
							},
						],
					},
					{
						nom: "Ventes d’huîtres de taille marchande pour l’élevage",
						description:
							"Il s’agit de la production d’huîtres de taille marchande que vous avez vendue pour l’élevage auprès d’autres exploitants.",
						destinations: [
							{
								nom: "France",
								qty: p.VolVtHElvFr,
								val: p.CAHElvFr,
							},
							{
								nom: "Export au sein de l’UE",
								qty: p.VolVtHElvUE,
								val: p.CAHElvUE,
							},
							{
								nom: "Export hors UE",
								qty: p.VolVtHElvAu,
								val: p.CAHElvAu,
							},
						],
					},
					{
						nom: "Ventes d’huîtres de demi-élevage",
						description:
							"Il s'agit de la production d’huîtres de 18 mois et de demi-élevage (2 ans) que vous avez vendue auprès d’autres exploitants.",
						destinations: [
							{
								nom: "France",
								qty: p.VolVtHDElvFr,
								val: p.CAHDElvFr,
							},
							{
								nom: "Export au sein de l’UE",
								qty: p.VolVtHDElvUE,
								val: p.CAHDElvUE,
							},
							{
								nom: "Export hors UE",
								qty: p.VolVtHDElvAu,
								val: p.CAHDElvAU,
							},
						],
					},
					{
						nom: "Ventes de naissains",
						description:
							"Il s’agit de la production de vos écloseries ou nurseries que vous avez vendue pour le grossissement auprès d'autres exploitants ou pour l'exportation.",
						destinations: [
							{
								nom: "France",
								qty: p.VolVtHNaissFr,
								val: p.CAHNaissFr,
							},
							{
								nom: "Export au sein de l’UE",
								qty: p.VolVtHNaissUE,
								val: p.CAHNaissUE,
							},
							{
								nom: "Export hors UE",
								qty: p.VolVtHNaissAu,
								val: p.CAHNaissAu,
							},
						],
					},
				],
			},
		].map((type) => ({
			...type,
			stades: type.stades.map((stade) => ({
				...stade,
				qty: sum(
					stade.destinations
						.map((destination) => destination.qty)
						.filter((qty) => qty != null),
				),
				val: sum(
					stade.destinations
						.map((destination) => destination.val)
						.filter((val) => val != null),
				),
			})),
		})),
	);
</script>

{#if !bilan}
	<div class="fr-alert fr-alert--warning">
		<h3 class="fr-alert__title">Données manquantes</h3>
		<p>
			Nous n’avons pas trouvé de données sur la production de l’établissement
			<br />
			{etablissement.uniteLegale.denominationUniteLegale}.
		</p>
	</div>
{:else}
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
																	{#if destination.val}
																		<tr>
																			<td>{destination.nom}</td>
																			<td class="fr-cell--right">
																				{formatValue(destination.val)}
																			</td>
																		</tr>
																	{/if}
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
{/if}

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
