<script lang="ts">
  import { enhance } from '$app/forms';

  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import { formatDate } from '$lib/utils';

  let { data } = $props();
</script>

<h1 class="fr-h2">Merci de confirmer les dates de votre exercice comptable</h1>

<p>Veuillez confirmer les informations suivantes liées à votre exercice comptable.</p>

<form method="POST" use:enhance>
  <div class="fr-table fr-table--sm fr-mt-8v">
    <div class="fr-table__wrapper">
      <div class="fr-table__container">
        <div class="fr-table__content">
          <table class="fr-cell--multiline" id="bilan-tbl">
            <tbody>
              <tr>
                <th scope="row">Date de début d’exercice</th>
                <td>{formatDate(data.bilan.debutExercice)}</td>
              </tr>
              <tr>
                <th scope="row">Date de fin d’exercice</th>
                <td>{formatDate(data.bilan.finExercice)}</td>
              </tr>
              <tr>
                <th scope="row">Date de soumission</th>
                <td>{formatDate(data.bilan.dateBilan)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <NavigationLinks prevHref="4" nextIsButton />
</form>

<style>
  #bilan-tbl th {
    width: 15ch;
  }

  @media (min-width: 36em) {
    #bilan-tbl th {
      width: 26ch;
    }
  }
</style>
