<script lang="ts">
	import type { DeclarationSchema } from "$lib/schemas/declaration-schema";

	import type { DeclarationStep } from "./types";

	const {
		step,
		baseUrl,
		donnees,
	}: { step: DeclarationStep; baseUrl: string; donnees: DeclarationSchema } =
		$props();
</script>

{#snippet categoryTitle(text: string, isDone: boolean)}
	<div style="display: flex; justify-content: space-between; width: 100%">
		<div>{text}</div>
		{#if isDone}
			<div class="fr-icon-success-line"></div>
		{/if}
	</div>
{/snippet}

<nav
	class="fr-sidemenu fr-sidemenu--sticky-full-height"
	aria-labelledby="fr-sidemenu-title"
>
	<div class="fr-sidemenu__inner fr-pt-md-12v fr-pt-2v fr-pr-0">
		<button
			class="fr-sidemenu__btn"
			hidden
			aria-controls="fr-sidemenu-wrapper"
			aria-expanded="false"
		>
			Dans cette rubrique
		</button>
		<div class="fr-collapse" id="fr-sidemenu-wrapper">
			<div class="fr-sidemenu__title fr-h4" id="fr-sidemenu-title">
				Votre déclaration annuelle
			</div>
			<ul class="fr-sidemenu__list">
				<li class="fr-sidemenu__item fr-sidemenu__item--active">
					<a
						class="fr-sidemenu__link"
						href="{baseUrl}/entreprise"
						aria-current={step === "entreprise" ? "page" : undefined}
					>
						{@render categoryTitle(
							"Votre entreprise",
							donnees.etapes?.entrepriseValidee,
						)}
					</a>
				</li>
				<li class="fr-sidemenu__item">
					<a
						class="fr-sidemenu__link"
						href="{baseUrl}/concessions"
						aria-current={step === "concessions" ? "page" : undefined}
					>
						{@render categoryTitle(
							"Vos concessions",
							donnees.etapes?.concessionValidee,
						)}
					</a>
				</li>
				<li class="fr-sidemenu__item">
					<a
						class="fr-sidemenu__link"
						href="{baseUrl}/production"
						aria-current={step === "production" ? "page" : undefined}
					>
						{@render categoryTitle(
							"Production aquacole vendue",
							donnees.etapes?.productionValidee,
						)}
					</a>
				</li>
				<li class="fr-sidemenu__item">
					<a
						class="fr-sidemenu__link"
						href="{baseUrl}/stock"
						aria-current={step === "stock" ? "page" : undefined}
					>
						{@render categoryTitle("Stock", donnees.etapes?.stockValidee)}
					</a>
				</li>
				<li class="fr-sidemenu__item">
					<a
						class="fr-sidemenu__link"
						href="{baseUrl}/declaration"
						aria-current={step === "declaration" ? "page" : undefined}
					>
						{@render categoryTitle(
							"Déclaration obligatoire",
							donnees.etapes?.declarationValidee,
						)}
					</a>
				</li>
				<li class="fr-sidemenu__item">
					<a
						class="fr-sidemenu__link"
						href="{baseUrl}/envoi"
						aria-current={step === "envoi" ? "page" : undefined}
					>
						{@render categoryTitle("Envoi", donnees.etapes?.envoiValidee)}
					</a>
				</li>
			</ul>
		</div>
	</div>
</nav>
