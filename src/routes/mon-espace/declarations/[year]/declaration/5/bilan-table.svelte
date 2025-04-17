<script lang="ts">
  import { formatDate } from '$lib/utils';

  let { bilan } = $props();
</script>

<div class="fr-table fr-table--sm">
  <div class="fr-table__wrapper">
    <div class="fr-table__container">
      <div class="fr-table__content">
        <table class="fr-cell--multiline">
          <tbody>
            <tr>
              <th scope="row">Date de début d’exercice</th>
              <td>{formatDate(bilan.debutExercice)}</td>
            </tr>
            <tr>
              <th scope="row">Date de fin d’exercice</th>
              <td>{formatDate(bilan.finExercice)}</td>
            </tr>
            <tr>
              <th scope="row">Date de soumission</th>
              <td>{formatDate(bilan.dateBilan)}</td>
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
