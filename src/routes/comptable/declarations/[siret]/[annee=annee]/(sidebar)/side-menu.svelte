<script lang="ts">
	import type { DeclarationSchema } from "$lib/schemas/declaration-schema";

	import type { DeclarationStep } from "../type";

	const {
		step,
		baseUrl,
		nomEtablissement,
		resetActionUrl,
	}: {
		step: DeclarationStep;
		baseUrl: string;
		donnees: DeclarationSchema;
		nomEtablissement: string;
		resetActionUrl: string;
	} = $props();
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
			<div class="fr-sidemenu__title" id="fr-sidemenu-title">
				<p class="fr-text--md fr-text--regular">Vous déclarez pour :</p>
				<h2 class="fr-text--lg">
					{nomEtablissement}
				</h2>
			</div>
			<ul class="fr-sidemenu__list">
				<li class="fr-sidemenu__item">
					<a
						class="fr-sidemenu__link"
						style="color: var(--text-disabled-grey)"
						aria-current={step === "salaries" ? "page" : undefined}
						role="link"
						aria-disabled="true"
					>
						{@render categoryTitle("Salariés", false)}
					</a>
				</li>
				<li class="fr-sidemenu__item">
					<a
						class="fr-sidemenu__link"
						href="{baseUrl}/ventes/"
						aria-current={step === "ventes" ? "page" : undefined}
					>
						{@render categoryTitle("Ventes", false)}
					</a>
				</li>
				<li class="fr-sidemenu__item">
					<a
						class="fr-sidemenu__link"
						style="color: var(--text-disabled-grey)"
						aria-current={step === "production" ? "page" : undefined}
						role="link"
						aria-disabled="true"
					>
						{@render categoryTitle("Production", false)}
					</a>
				</li>
				<li class="fr-sidemenu__item">
					<a
						class="fr-sidemenu__link"
						style="color: var(--text-disabled-grey)"
						aria-current={step === "retour_annee" ? "page" : undefined}
						role="link"
						aria-disabled="true"
					>
						{@render categoryTitle("Retour sur l’année", false)}
					</a>
				</li>
				<li class="fr-sidemenu__item">
					<a
						class="fr-sidemenu__link"
						style="color: var(--text-disabled-grey)"
						aria-current={step === "envoi" ? "page" : undefined}
						role="link"
						aria-disabled="true"
					>
						{@render categoryTitle("Envoi", false)}
					</a>
				</li>
			</ul>
		</div>
		<div class="fr-mt-10v">
			<form method="POST" action={resetActionUrl}>
				<button
					class="fr-btn fr-btn--sm fr-btn--tertiary-no-outline fr-btn--icon-left fr-icon-arrow-go-forward-fill"
				>
					Réinitialiser
				</button>
			</form>
		</div>
	</div>
</nav>
