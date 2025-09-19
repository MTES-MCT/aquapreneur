<script lang="ts">
	import { typeStatut } from "$lib/utils";

	const { data } = $props();
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
									{#each data.declarations as declaration (declaration.id)}
										<tr>
											<td>
												{declaration.denomination}
												<span class="fr-text--xs fr-text--light">
													({declaration.siret})
												</span>
											</td>
											<td>{declaration.annee}</td>
											<td>
												{#if declaration.donnees.progression.globale === "validé comptable" || typeStatut(declaration.donnees.progression.globale) === "producteur"}
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
														href="./d/{declaration.siret}/{declaration.annee}/intro?persona=comptable"
														class="fr-link fr-link--sm"
													>
														parcours comptable
													</a>
												{/if}

												<br />
												{#if declaration.donnees.progression.globale === "validé producteur"}
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
														href="./d/{declaration.siret}/{declaration.annee}/intro?persona=producteur"
														class=" fr-link fr-link--sm"
													>
														parcours producteur
													</a>
												{/if}
											</td>
											<td>
												{declaration.donnees.progression.globale}
											</td>

											<td>
												<form
													method="POST"
													action="/d/{declaration.siret}/{declaration.annee}"
												>
													<button
														class="fr-btn fr-btn--sm fr-btn--tertiary-no-outline"
													>
														Réinitialiser
													</button>
													•
													<a
														class="fr-link fr-link--sm"
														target="_blank"
														download={`aquapreneur-decl-${declaration.siret}-${declaration.annee}.json`}
														href="./d/{declaration.siret}/{declaration.annee}/download"
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
