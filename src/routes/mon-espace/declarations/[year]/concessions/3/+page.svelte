<script lang="ts">
  // Pas assez répandu en avril 2025 pour utiliser la version native,
  //  à réévaluer plus tard
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy#browser_compatibility
  import 'core-js/actual/object/group-by';

  import NavigationLinks from '$lib/components/navigation-links.svelte';

  const { data } = $props();
  const concessionsGroups = Object.entries(Object.groupBy(data.concessions, (c) => c.lieu));
</script>

<h1 class="fr-h2">Passons en revue vos concessions</h1>

<p>
  Vous pouvez maintenant vérifier les données liées à vos concessions. Si des informations sont
  incorrectes ou manquantes, merci de les noter pour pouvoir les signaler à la fin du formulaire.
</p>

<fieldset class="fr-segmented fr-segmented--no-legend fr-mb-12v">
  <legend class="fr-segmented__legend"> Choix de la visualisation </legend>
  <div class="fr-segmented__elements">
    <div class="fr-segmented__element">
      <input value="1" type="radio" id="segmented-3227-2" name="segmented-3227" disabled />
      <label class="fr-icon-list-unordered fr-label" for="segmented-3227-2"> Carte </label>
    </div>
    <div class="fr-segmented__element">
      <input value="2" checked type="radio" id="segmented-3227-1" name="segmented-3227" />
      <label class="fr-icon-road-map-line fr-label" for="segmented-3227-1"> Liste </label>
    </div>
  </div>
</fieldset>

{#each concessionsGroups as cg (cg[0])}
  <h6>{cg[0]}</h6>
  <div class="fr-accordions-group fr-mb-8v">
    {#if cg.length === 2 && cg[1]?.length}
      {#each cg[1]?.sort( (a, b) => ((a.numeroParcelle ?? '') > (b.numeroParcelle ?? '') ? 1 : -1) ) as cons (cons.numeroParcelle)}
        <section class="fr-accordion">
          <h3 class="fr-accordion__title">
            <button
              class="fr-accordion__btn"
              aria-expanded="false"
              aria-controls="accordion-{cons.numeroParcelle}">{cons.numeroParcelle}</button
            >
          </h3>
          <div class="fr-collapse" id="accordion-{cons.numeroParcelle}">
            <dl class="wrapper">
              <dt>Quartier</dt>
              <dd>{cons.quartierParcelle}</dd>
              <dt>Commune</dt>
              <dd>{cons.libLocalite}</dd>
              <dt>Code INSEE</dt>
              <dd>{cons.codeLocaliteInsee}</dd>
              <dt>Lieu-dit</dt>
              <dd>{cons.nomLieuDit}</dd>
              <dt>Situation</dt>
              <dd>{cons.nomSituation}</dd>
              <dt>Type</dt>
              <dd>{cons.typeParcelle}</dd>
              <dt>Surface</dt>
              <dd>{cons.surfaceParcelle} {cons.uniteMesure}</dd>
              <dt>État</dt>
              <dd>{cons.etatParcelle}</dd>
              <dt>Famille d’exploitation</dt>
              <dd>{cons.familleExploitation}</dd>
              <dt>Nature d’exploitation</dt>
              <dd>{cons.exploitation}</dd>
              <dt>Famille espèce</dt>
              <dd>{cons.familleEspece}</dd>
              <dt>Espèce principale</dt>
              <dd>{cons.espece}</dd>
              <dt>Nature juridique</dt>
              <dd>{cons.natureJuridique}</dd>
              <dt>N° d’arrêté</dt>
              <dd>{cons.numArrete}</dd>
              <dt>Date d’arrêté</dt>
              <dd>
                {#if cons.dateArrete}
                  {new Intl.DateTimeFormat('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }).format(new Date(cons.dateArrete))}
                {/if}
              </dd>
              <dt>Capacité de production</dt>
              <dd>Inconnu</dd>
              <dt>Intention de production</dt>
              <dd>Inconnu</dd>
            </dl>
          </div>
        </section>
      {/each}
    {/if}
  </div>
{/each}

<NavigationLinks prevHref="2" nextHref="../production" />

<style>
  dl {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  dt {
    font-weight: bold;
  }

  dd {
    padding: 0;
  }
</style>
