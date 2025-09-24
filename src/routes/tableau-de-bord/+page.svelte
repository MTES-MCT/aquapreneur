<script lang="ts">
	import { ANNEES_DECLARATIVES } from "$lib/constants";

	const { data } = $props();

	const CURRENT_YEAR = ANNEES_DECLARATIVES[0];
</script>

<div class="fr-container">
	<div class="fr-grid-row fr-grid-row--gutters">
		<div class="fr-col-12 fr-col-md-10 fr-pt-12v" id="contenu">
			<h1>Bienvenue, {data.utilisateur.prenom} {data.utilisateur.nom}</h1>
			<p>Accédez à l’ensemble des déclarations de vos adhérents.</p>
		</div>
	</div>

	<div class="fr-grid-row fr-grid-row--gutters">
		<div class="fr-col-12">
			<div class="fr-table">
				<div class="fr-table__wrapper">
					<div class="fr-table__container">
						<div class="fr-table__content">
							<table>
								<thead>
									<tr>
										<th scope="col">Adhérent</th>
										<th scope="col">Période</th>
										<th scope="col">Parcours</th>
										<th scope="col">Statut</th>
										<th scope="col">Actions</th>
									</tr>
								</thead>
								<tbody>
									{#each data.etablissements as etablissement (etablissement.siret)}
										{@const declarationComptable = data.declarations.find(
											(d) =>
												d.siret == etablissement.siret &&
												d.annee === CURRENT_YEAR &&
												d.type === "comptable",
										)}
										{@const declarationProducteur = data.declarations.find(
											(d) =>
												d.siret == etablissement.siret &&
												d.annee === CURRENT_YEAR &&
												d.type === "producteur",
										)}
										<tr>
											<td>
												{etablissement.denomination}
												<span class="fr-text--xs fr-text--light">
													({etablissement.siret})
												</span>
											</td>
											<td>{CURRENT_YEAR}</td>
											<td>
												{#if declarationComptable?.donnees.progression.globale === "validé comptable" || declarationProducteur?.donnees.progression.globale}
													<a
														class="fr-link fr-link--sm"
														style="color: var(--text-disabled-grey)"
														role="link"
														aria-disabled="true"
													>
														parcours comptable
													</a>
												{:else}
													<a
														href="./d/{etablissement.siret}/{CURRENT_YEAR}/intro?persona=comptable"
														class="fr-link fr-link--sm"
													>
														parcours comptable
													</a>
												{/if}

												<br />
												{#if declarationProducteur?.donnees.progression.globale === "validé producteur"}
													<a
														class=" fr-link fr-link--sm"
														style="color: var(--text-disabled-grey)"
														role="link"
														aria-disabled="true"
													>
														parcours producteur
													</a>
												{:else}
													<a
														href="./d/{etablissement.siret}/{CURRENT_YEAR}/intro?persona=producteur"
														class=" fr-link fr-link--sm"
													>
														parcours producteur
													</a>
												{/if}
											</td>
											<td>
												{declarationProducteur?.donnees.progression.globale ||
													declarationComptable?.donnees.progression.globale}
											</td>

											<td>
												<form
													method="POST"
													action="/d/{etablissement.siret}/{CURRENT_YEAR}"
												>
													<button
														onclick={(event) => {
															const result = confirm(
																"Attention : la réinitialisation entraîne la suppression définitive de toutes les données saisies. Souhaitez-vous confirmer cette opération ?",
															);

															if (!result) event.preventDefault();
														}}
														class="fr-btn fr-btn--sm fr-btn--tertiary-no-outline"
													>
														Réinitialiser
													</button>
													•
													<a
														class="fr-link fr-link--sm"
														target="_blank"
														download={`aquapreneur-decl-${etablissement.siret}-${CURRENT_YEAR}.json`}
														href="./d/{etablissement.siret}/{CURRENT_YEAR}/download"
													>
														Télécharger
													</a>
												</form>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
