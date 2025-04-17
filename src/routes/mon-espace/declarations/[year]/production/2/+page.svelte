<script lang="ts">
  import { enhance } from '$app/forms';

  import NavigationLinks from '$lib/components/navigation-links.svelte';

  const { data } = $props();
</script>

<h1 class="fr-h2">Passons en revue vos ventes en {data.year}</h1>

<p>
  Veuillez vérifier les données relatives à vos ventes pour chaque espèce et chaque stade d’élevage.
</p>
<form method="POST" use:enhance>
  {#if !data.bilan}
    <div class="fr-alert fr-alert--warning">
      <h3 class="fr-alert__title">Données manquantes</h3>
      <p>
        Nous n’avons pas trouvé de données sur la production de l’établissement<br />{data
          .etablissement.uniteLegale.denominationUniteLegale}.
      </p>
    </div>
  {:else}
    <h2 class="fr-h6">Huîtres</h2>
    <div class="fr-accordions-group">
      <section class="fr-accordion">
        <h3 class="fr-accordion__title">
          <button
            type="button"
            class="fr-accordion__btn"
            aria-expanded="false"
            aria-controls="accordion-114">Ventes d’huîtres de taille marchande</button
          >
        </h3>
        <div class="fr-collapse" id="accordion-114">
          <p class="fr-text--sm">
            Il s’agit de la production d’huîtres de taille marchande que vous avez vendue à la
            consommation ou pour l’élevage auprès d'autres conchyliculteurs.
          </p>
          <dl class="wrapper">
            <dt>Mode d’élevage</dt>
            <dd>Non renseigné</dd>
            <dt>Valeur HT vendue</dt>
            <dd>
              {data.bilan.CAHCoFrGros !== null
                ? Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
                    Number.parseFloat(data.bilan.CAHCoFrGros)
                  )
                : ''}
            </dd>
          </dl>
          <div>
            <dt>Destination des ventes</dt>
            <dd>
              <ul style="list-style-type: none; margin: 0; padding: 0">
                <li class="fr-li fr-icon-arrow-right-line">
                  À la consommation
                  <div>
                    <div class="fr-table fr-table--bordered" id="table-bordered-component">
                      <div class="fr-table__wrapper">
                        <div class="fr-table__container">
                          <div class="fr-table__content">
                            <table id="table-bordered">
                              <thead>
                                <tr>
                                  <th scope="col"> Destination </th>
                                  <th scope="col"> Part des ventes </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr id="table-bordered-row-key-1" data-row-key="1">
                                  <td> Grossistes </td>
                                  <td> 0 % </td>
                                </tr>
                                <tr id="table-bordered-row-key-2" data-row-key="2">
                                  <td> Export au sein de l’EU </td>
                                  <td> 0 % </td>
                                </tr>
                                <tr id="table-bordered-row-key-3" data-row-key="3">
                                  <td> Export hors EU </td>
                                  <td> 0 % </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="fr-li fr-icon-arrow-right-line">
                  Pour l’élevage
                  <div>
                    <div class="fr-table fr-table--bordered" id="table-bordered-component">
                      <div class="fr-table__wrapper">
                        <div class="fr-table__container">
                          <div class="fr-table__content">
                            <table id="table-bordered">
                              <thead>
                                <tr>
                                  <th scope="col"> Destination </th>
                                  <th scope="col"> Part des ventes </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr id="table-bordered-row-key-1" data-row-key="1">
                                  <td> En France </td>
                                  <td> 0 % </td>
                                </tr>
                                <tr id="table-bordered-row-key-2" data-row-key="2">
                                  <td> À l’étranger </td>
                                  <td> 0 % </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </div>
      </section>
      <section class="fr-accordion">
        <h3 class="fr-accordion__title">
          <button
            class="fr-accordion__btn"
            type="button"
            aria-expanded="false"
            aria-controls="accordion-115">Ventes de naissains</button
          >
        </h3>
        <div class="fr-collapse" id="accordion-115"></div>
      </section>
    </div>

    <h2 class="fr-h6 fr-mt-8v">Moules</h2>
    <div class="fr-accordions-group">
      <section class="fr-accordion">
        <h3 class="fr-accordion__title">
          <button
            class="fr-accordion__btn"
            type="button"
            aria-expanded="false"
            aria-controls="accordion-116">Ventes de moules de taille marchande</button
          >
        </h3>
        <div class="fr-collapse" id="accordion-116"></div>
      </section>
      <section class="fr-accordion">
        <h3 class="fr-accordion__title">
          <button
            class="fr-accordion__btn"
            type="button"
            aria-expanded="false"
            aria-controls="accordion-119">Ventes de naissains</button
          >
        </h3>
        <div class="fr-collapse" id="accordion-119"></div>
      </section>
    </div>

    <h2 class="fr-h6 fr-mt-8v">Gambas</h2>
    <div class="fr-accordions-group">
      <section class="fr-accordion">
        <h3 class="fr-accordion__title">
          <button
            class="fr-accordion__btn"
            type="button"
            aria-expanded="false"
            aria-controls="accordion-117">Ventes d’huîtres de taille marchande</button
          >
        </h3>
        <div class="fr-collapse" id="accordion-117"></div>
      </section>
      <section class="fr-accordion">
        <h3 class="fr-accordion__title">
          <button
            class="fr-accordion__btn"
            type="button"
            aria-expanded="false"
            aria-controls="accordion-118">Ventes de naissains</button
          >
        </h3>
        <div class="fr-collapse" id="accordion-118"></div>
      </section>
    </div>
  {/if}

  <NavigationLinks prevHref="1" nextIsButton />
</form>

<style>
  dl {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0;
  }

  dt {
    font-weight: bold;
    margin: 0;
  }

  dd {
    padding: 0;
  }
</style>
