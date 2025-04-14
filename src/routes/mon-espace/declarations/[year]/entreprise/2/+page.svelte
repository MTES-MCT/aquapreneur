<script lang="ts">
  import NavigationLinks from '$lib/components/navigation-links.svelte';

  const { data } = $props();

  const etabl = $derived(data.etablissement);

  function cleanSpaces(str: string) {
    return str.replaceAll('  ', ' ').trim();
  }

  function val(obj: Record<string, string>, field: string): string {
    return (obj[field] as string | null) || '';
  }

  function getSireneCity(addr: Record<string, string>) {
    return cleanSpaces(
      `${val(addr, 'libelleCedexEtablissement') || val(addr, 'libelleCommuneEtablissement')} ${val(addr, 'distributionSpecialeEtablissement')}`
    );
  }

  function getSireneStreetAddress(addr: Record<string, string>) {
    return cleanSpaces(
      `${val(addr, 'numeroVoieEtablissement')} ${val(addr, 'indiceRepetitionEtablissement')} ${val(addr, 'typeVoieEtablissement')} ${val(addr, 'libelleVoieEtablissement')}`
    );
  }
</script>

{#snippet editBtn()}
  <button
    class="fr-btn fr-icon-pencil-fill fr-btn--tertiary-no-outline fr-btn--sm"
    title="Éditer"
    disabled>Éditer</button
  >
{/snippet}

<h1 class="fr-h2">Veuillez passer en revue vos données d’entreprise</h1>

<div class="fr-table fr-table--sm">
  <div class="fr-table__wrapper">
    <div class="fr-table__container">
      <div class="fr-table__content">
        <table class="fr-cell--multiline">
          <tbody>
            <tr>
              <th scope="row" class="fr-col-xs">Dénomination</th>
              <td>{etabl.uniteLegale.denominationUniteLegale}</td>
              <td class="fr-cell--right">
                {@render editBtn()}
              </td>
            </tr>
            <tr>
              <th scope="row">Numéro SIREN</th>
              <td>{etabl.siren}</td>
              <td class="fr-cell--right">
                {@render editBtn()}
              </td>
            </tr>
            <tr>
              <th scope="row">Activité principale</th>
              <td>
                {data.activitePrincipale}
                ({etabl.uniteLegale.activitePrincipaleUniteLegale})
              </td>
              <td class="fr-cell--right">
                {@render editBtn()}
              </td>
            </tr>
            <tr>
              <th scope="row">Adresse postale</th>
              <td
                >{getSireneStreetAddress(etabl.adresseEtablissement)},
                {etabl.adresseEtablissement.codePostalEtablissement}
                {getSireneCity(etabl.adresseEtablissement)}
              </td>
              <td class="fr-cell--right">
                {@render editBtn()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<NavigationLinks prevHref="1" nextHref="3" nextLabel="Confirmer" />
