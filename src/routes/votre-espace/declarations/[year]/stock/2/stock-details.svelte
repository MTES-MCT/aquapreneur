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

	const formatQty = (
		value: number | string | null | undefined,
		unit = "kg",
	): string => {
		return value != null ?
				`${Intl.NumberFormat("fr-FR").format(
					typeof value === "string" ? Number.parseFloat(value) : value,
				)} ${unit}`
			:	"n/a";
	};

	const formatValue = (value: number | string | null): string => {
		return value != null ?
				Intl.NumberFormat("fr-FR", {
					style: "currency",
					currency: "EUR",
				}).format(typeof value === "string" ? Number.parseFloat(value) : value)
			:	"n/a";
	};

	const s = $derived(bilan?.donnees.stock ?? {});

	const template = $derived([
		{
			nom: "Huîtres",
			stades: [
				{
					nom: "Stock d’huîtres de taille marchande destinées à la consommation",
					description:
						"Il s’agit de vos huîtres de taille marchande disponibles à la vente pour la consommation.",
					qty: s.StckVolHConso,
					val: s.StckValHConso,
				},
				{
					nom: "Stock d’huîtres de taille marchande pour l’élevage",
					description:
						"Il s’agit de vos huîtres de taille marchande disponibles à la vente pour l’élevage auprès d’autres exploitants",
					qty: s.StckVolHElv,
					val: s.StckValHElv,
				},
				{
					nom: "Ventes d’huîtres de demi-élevage",
					description:
						"Il s’agit de vos huîtres de 18 mois ou de demi-élevage disponible à l’élevage.",
					qty: s.StckVolHDElv,
					val: s.StckValHDElv,
				},
				{
					nom: "Stock de naissains",
					description:
						"Il s’agit de vos écloseries ou nurseries disponibles pour le grossissement auprès d'autres conchyliculteurs ou pour l'exportation.",
					qty: s.StckVolHNaisMi,
					val: s.StckValHNaisMi,
					unit: "milliers",
				},
			],
		},
	]);
</script>

{#if !bilan}
	<div class="fr-alert fr-alert--warning">
		<h3 class="fr-alert__title">Données manquantes</h3>
		<p>
			Nous n’avons pas trouvé de données sur le stock de l’établissement
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
								<dt>Volume en stock</dt>
								<dd>
									{formatQty(stade.qty, stade.unit)}
								</dd>
								<dt>Valorisation du stock</dt>
								<dd>
									{formatValue(stade.val)}
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
	dl {
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding: 0;
	}

	dt {
		font-weight: bold;
		margin-right: 2rem;
	}

	dd {
		padding: 0;
		margin-bottom: 1rem;
	}
</style>
