<script lang="ts">
	import SuperDebug from "sveltekit-superforms";

	import { env } from "$env/dynamic/public";

	import type { DonneesDeclaration } from "$lib/schemas/donnees-declaration-schema";
	import type { Persona } from "$lib/types";
	import { partFilled } from "$lib/utils";

	import type { DeclarationStep } from "./type";

	const {
		step,
		baseUrl,
		donnees,
		nomEtablissement,
		persona,
	}: {
		step: DeclarationStep;
		baseUrl: string;
		donnees: DonneesDeclaration;
		nomEtablissement: string;
		persona: Persona;
	} = $props();

	const parts = [
		{
			label: "Équipe et direction",
			partId: "equipe",
			link: "equipe/",
		},
		{
			label: "Production",
			partId: "production",
			link: "production/",
		},
		{
			label: "Ventes",
			partId: "ventes",
			link: "ventes/",
		},
		{
			label: "Retour sur l’année",
			partId: "retourAnnee",
			link: "retour-annee/",
		},
		{
			label: "Envoi",
			partId: "envoi",
			link: "envoi/",
		},
	] as const;
</script>

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
				{#each parts as part (part.partId)}
					{@const validated = partFilled(donnees, part.partId, persona)}
					<li class="fr-sidemenu__item">
						{#if validated || step === part.partId}
							<a
								class="fr-sidemenu__link"
								href="{baseUrl}/{part.link}"
								aria-current={step === part.partId ? "page" : undefined}
							>
								<div
									style="display: flex; justify-content: space-between; width: 100%"
								>
									<div>{part.label}</div>
									{#if validated}
										<div class="fr-icon-success-line"></div>
									{/if}
								</div>
							</a>
						{:else}
							<a
								style="color: var(--text-disabled-grey)"
								role="link"
								aria-disabled="true"
								class="fr-sidemenu__link"
							>
								<div
									style="display: flex; justify-content: space-between; width: 100%"
								>
									<div>{part.label}</div>
								</div>
							</a>
						{/if}
					</li>
				{/each}
			</ul>
		</div>

		{#if env.PUBLIC_DEBUG_FORM}
			<div class="fr-mr-2w">
				<SuperDebug data={donnees.progression} status={false} label="États" />
			</div>
		{/if}
	</div>
</nav>
