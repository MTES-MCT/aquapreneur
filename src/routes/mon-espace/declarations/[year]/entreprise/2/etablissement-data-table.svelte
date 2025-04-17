<script lang="ts">
  const { etablissement, activitePrincipale, withEdit = false } = $props();

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
  {#if withEdit}
    <button
      class="fr-btn fr-icon-edit-line fr-btn--tertiary-no-outline fr-btn--sm"
      title="Éditer"
      disabled>Éditer</button
    >
  {/if}
{/snippet}

<div class="fr-table fr-table--sm">
  <div class="fr-table__wrapper">
    <div class="fr-table__container">
      <div class="fr-table__content">
        <table class="fr-cell--multiline">
          <tbody>
            <tr>
              <th scope="row">Dénomination</th>
              <td>{etablissement.uniteLegale.denominationUniteLegale}</td>
              <td class="fr-cell--right">
                {@render editBtn()}
              </td>
            </tr>
            <tr>
              <th scope="row">Numéro SIREN</th>
              <td>{etablissement.siren}</td>
              <td class="fr-cell--right">
                {@render editBtn()}
              </td>
            </tr>
            <tr>
              <th scope="row">Activité principale</th>
              <td>
                {activitePrincipale}
                ({etablissement.uniteLegale.activitePrincipaleUniteLegale})
              </td>
              <td class="fr-cell--right">
                {@render editBtn()}
              </td>
            </tr>
            <tr>
              <th scope="row">Adresse postale</th>
              <td
                >{getSireneStreetAddress(etablissement.adresseEtablissement)},
                {etablissement.adresseEtablissement.codePostalEtablissement}
                {getSireneCity(etablissement.adresseEtablissement)}
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

<style>
  th {
    width: 15ch;
  }

  @media (min-width: 36em) {
    th {
      width: 25ch;
    }
  }
</style>
