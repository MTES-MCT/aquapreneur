<script lang="ts">
  import { onMount } from 'svelte';

  import NavigationLinks from '$lib/components/navigation-links.svelte';

  const { data } = $props();

  // TODO typing
  const groupedConcessions = new Map();

  data.concessions.forEach((c) => {
    const quartier = c.quartierParcelle ?? '';
    const lieu = c.lieu.replace(/^ – /, '').replace(/ – $/, '') ?? '';

    if (!groupedConcessions.has(quartier)) {
      groupedConcessions.set(quartier, new Map([[lieu, [c]]]));
    } else {
      const quartierConcessions = groupedConcessions.get(quartier);
      if (quartierConcessions.has(lieu)) {
        quartierConcessions.get(lieu).push(c);
      } else {
        quartierConcessions.set(lieu, [c]);
      }
    }
  });

  // Le rendu des accordéons est extrêmement long. On charge donc la page en les
  // masquant, et on les réactive après un délai, pour ne pas rester bloqués sur
  // la page précédente le temps que Svelte finisse le rendu.
  let delayed = $state(true);
  onMount(() => {
    setTimeout(() => (delayed = false), 1000);
  });
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

{#each groupedConcessions as cg (cg[0])}
  <h2 class="fr-h6">
    <span aria-hidden="true" class="fr-mr-3v fr-icon-community-line"></span>
    {cg[0]}
  </h2>
  <div class="fr-accordions-group fr-mb-10v">
    {#each cg[1] as concesParLieu (concesParLieu[0])}
      <h3 class="fr-text--md fr-text--bold fr-mt-6v">
        {concesParLieu[0]}
      </h3>
      {#each concesParLieu[1] as conces (conces.numeroParcelle)}
        <section class="fr-accordion">
          <h4 class="fr-accordion__title">
            <button
              class="fr-accordion__btn"
              aria-expanded="false"
              aria-controls="accordion-{conces.numeroParcelle}">{conces.numeroParcelle}</button
            >
          </h4>
          <div class:delayed class="fr-collapse" id="accordion-{conces.numeroParcelle}">
            <dl class="wrapper">
              <dt>Quartier</dt>
              <dd>{conces.quartierParcelle}</dd>
              <dt>Commune</dt>
              <dd>{conces.libLocalite}</dd>
              <dt>Code INSEE</dt>
              <dd>{conces.codeLocaliteInsee}</dd>
              <dt>Lieu-dit</dt>
              <dd>{conces.nomLieuDit}</dd>
              <dt>Situation</dt>
              <dd>{conces.nomSituation}</dd>
              <dt>Type</dt>
              <dd>{conces.typeParcelle}</dd>
              <dt>Surface</dt>
              <dd>{conces.surfaceParcelle} {conces.uniteMesure}</dd>
              <dt>État</dt>
              <dd>{conces.etatParcelle}</dd>
              <dt>Famille d’exploitation</dt>
              <dd>{conces.familleExploitation}</dd>
              <dt>Nature d’exploitation</dt>
              <dd>{conces.exploitation}</dd>
              <dt>Famille espèce</dt>
              <dd>{conces.familleEspece}</dd>
              <dt>Espèce principale</dt>
              <dd>{conces.espece}</dd>
              <dt>Nature juridique</dt>
              <dd>{conces.natureJuridique}</dd>
              <dt>N° d’arrêté</dt>
              <dd>{conces.numArrete}</dd>
              <dt>Date d’arrêté</dt>
              <dd>
                {#if conces.dateArrete}
                  {new Intl.DateTimeFormat('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }).format(new Date(conces.dateArrete))}
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
    {/each}
  </div>
{:else}
  <div class="fr-alert fr-alert--warning">
    <h3 class="fr-alert__title">Données manquantes</h3>
    <p>
      Nous n’avons pas trouvé de données sur les concessions de l’établissement<br />{data
        .etablissement.uniteLegale.denominationUniteLegale}.
    </p>
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

  .delayed {
    display: none;
  }
</style>
