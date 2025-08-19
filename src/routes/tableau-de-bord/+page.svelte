<script lang="ts">
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
										<th scope="col">N° SIRET</th>
										<th scope="col">Période</th>
										<th scope="col">Statut</th>
										<th scope="col">Échéance comptable</th>
										<th scope="col">Échéance adhérent</th>
									</tr>
								</thead>
								<tbody>
									{#each data.declarations as declaration (declaration.id)}
										<tr>
											<td>
												<a
													href="./d/{declaration.siret}/{declaration.annee}/"
													class="fr-icon-store-line fr-link--icon-left fr-link fr-link--sm"
													data-sveltekit-preload-data="off"
												>
													{declaration.denomination}
												</a>
											</td>
											<td>{declaration.siret}</td>
											<td>{declaration.annee}</td>
											<td></td>
											<td></td>
											<td></td>
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
