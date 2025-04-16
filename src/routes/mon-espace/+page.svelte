<script lang="ts">
  import ContractPict from '@gouvfr/dsfr/dist/artwork/pictograms/document/contract.svg';
  import PlaceholderPict16x9 from '@gouvfr/dsfr/example/img/placeholder.16x9.png';

  import { enhance } from '$app/forms';

  import { getDeclarationContext, resetDeclarationContext } from '$lib/declaration-context';

  const { data } = $props();

  let selectedSiret = $state(data.siret);
  let creating = $state(false);

  const context = getDeclarationContext();

  let onlyIncomplete = $state(false);

  $effect(() => console.log('incomplete', onlyIncomplete));
</script>

<div class="fr-grid-row fr-grid-row--center">
  <div class="fr-col-12 fr-col-md-10 fr-pt-12v" id="contenu">
    <h1>Votre espace</h1>

    {#if data.utilisateur?.estAdmin}
      <div class="fr-callout">
        <h3 class="fr-callout__title">Choix de l’exploitant</h3>
        <form
          method="POST"
          use:enhance={() => {
            creating = true;
            return async ({ update }) => {
              resetDeclarationContext(context);
              await update({ reset: false });
              selectedSiret = data.siret;
              creating = false;
            };
          }}
        >
          <fieldset class="fr-fieldset">
            <div class="fr-fieldset__element">
              <div class="fr-select-group">
                <label class="fr-label" for="select-siret">
                  Choix de l’exploitant (seulement pour les administrateurs)
                </label>
                <select
                  class="fr-select"
                  id="select-siret"
                  name="select"
                  autocomplete="off"
                  bind:value={selectedSiret}
                >
                  <option value="" selected disabled>Sélectionner une option</option>
                  {#each data.exploitants! as exploitant (exploitant.siret)}
                    <option value={exploitant.siret}>{exploitant.nom} ({exploitant.siret})</option>
                  {/each}
                </select>
              </div>
            </div>
            <div class="fr-fieldset__element">
              <button class="fr-btn" disabled={creating || data.siret === selectedSiret}
                >Choisir</button
              >
            </div>
          </fieldset>
        </form>
      </div>
    {/if}

    <p class="fr-text--lead">
      Entreprise : {data.etablissement?.uniteLegale.denominationUniteLegale}
    </p>
  </div>
</div>

<div class="fr-grid-row fr-grid-row--center fr-grid-row--top fr-mt-8v">
  <div class="fr-col-12 fr-col-md-5">
    <h2 class="fr-h5">Vos déclarations récentes</h2>
  </div>

  <div class="fr-col-12 fr-col-md-5">
    <div class="fr-toggle fr-toggle--label-left fr-mb-8v fr-mb-md-0">
      <input
        type="checkbox"
        class="fr-toggle__input"
        aria-describedby="toggle-declarations-recentes-messages"
        id="toggle-declarations-recentes"
        bind:checked={onlyIncomplete}
      />
      <label class="fr-toggle__label" for="toggle-declarations-recentes">
        Afficher uniquement les déclarations incomplètes
      </label>
      <div
        class="fr-messages-group"
        id="toggle-declarations-recentes-messages"
        aria-live="polite"
      ></div>
    </div>
  </div>
</div>

<div class="fr-grid-row fr-grid-row--center fr-grid-row--gutters">
  <div class="fr-col-12 fr-col-md-4">
    <div class="fr-tile fr-tile--horizontal fr-enlarge-link">
      <div class="fr-tile__body">
        <div class="fr-tile__content">
          <h3 class="fr-tile__title">
            {#if data.siret && !creating && data.siret === selectedSiret}
              <a href="mon-espace/declarations/2024">Déclaration 2024</a>
            {:else}
              <a aria-disabled="true" role="link">Déclaration 2024</a>
            {/if}
          </h3>
          <p class="fr-tile__detail">{context.valide ? 'Afficher' : 'Commencer'}</p>

          <div class="fr-tile__start">
            {#if context.valide}
              <p class="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Terminée</p>
            {:else}
              <p class="fr-badge fr-badge--sm fr-badge--new fr-badge--no-icon">À compléter</p>
            {/if}
          </div>
        </div>
      </div>
      <div class="fr-tile__header">
        <div class="fr-tile__pictogram">
          <svg aria-hidden="true" class="fr-artwork" viewBox="0 0 80 80" width="80px" height="80px">
            <use class="fr-artwork-decorative" href="{ContractPict}#artwork-decorative"></use>
            <use class="fr-artwork-minor" href="{ContractPict}#artwork-minor"></use>
            <use class="fr-artwork-major" href="{ContractPict}#artwork-major"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>

  {#if !onlyIncomplete}
    <div class="fr-col-6 fr-col-md-3">
      <div class="fr-tile fr-tile--horizontal fr-enlarge-link">
        <div class="fr-tile__body">
          <div class="fr-tile__content">
            <h3 class="fr-tile__title">
              <a aria-disabled="true" role="link">Déclaration 2023</a>
            </h3>
            <p class="fr-tile__detail">Détail</p>
            <div class="fr-tile__start">
              <p class="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Terminée</p>
            </div>
          </div>
        </div>
        <div class="fr-tile__header"></div>
      </div>
    </div>
    <div class="fr-col-6 fr-col-md-3">
      <div class="fr-tile fr-tile--horizontal fr-enlarge-link">
        <div class="fr-tile__body">
          <div class="fr-tile__content">
            <h3 class="fr-tile__title">
              <a aria-disabled="true" role="link">Déclaration 2022</a>
            </h3>
            <p class="fr-tile__detail">Détail</p>
            <div class="fr-tile__start">
              <p class="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon">Terminée</p>
            </div>
          </div>
        </div>
        <div class="fr-tile__header"></div>
      </div>
    </div>
  {:else}<div class="fr-col-6"></div>{/if}
</div>

<div class="fr-grid-row fr-grid-row--center fr-mt-4v">
  <div class="fr-col-12 fr-col-md-10">
    <a aria-disabled="true" role="link" class="fr-link fr-icon-arrow-right-line fr-link--icon-right"
      >Voir toutes mes déclarations passées</a
    >
  </div>
</div>

<div class="fr-grid-row fr-grid-row--center fr-grid-row--gutters fr-mt-16v">
  <div class="fr-col-12 fr-col-md-5">
    <h2 class="fr-h5">Votre production vendue</h2>
    <p>
      Ce graphique retrace l’évolution de votre production au cours des cinq dernières années, en
      tonnes ou en euros.
    </p>
    <figure class="fr-content-media" role="group">
      <div class="fr-content-media__img">
        <img class="fr-responsive-img fr-ratio-16x9" src={PlaceholderPict16x9} alt="" />
      </div>
    </figure>
  </div>
  <div class="fr-col-12 fr-col-md-5">
    <h2 class="fr-h5">Votre stock</h2>
    <p>
      Ce graphique retrace l’évolution du volume de votre stock au cours des cinq dernières années,
      en tonnes ou en euros.
    </p>
    <figure class="fr-content-media" role="group">
      <div class="fr-content-media__img">
        <img class="fr-responsive-img fr-ratio-16x9" src={PlaceholderPict16x9} alt="" />
      </div>
    </figure>
  </div>
</div>

<div class="fr-grid-row fr-grid-row--center fr-mt-16v">
  <div class="fr-col-12 fr-col-md-10">
    <h2 class="fr-h5">Vos concessions</h2>
  </div>
</div>
<div class="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-grid-row--gutters">
  <div class="fr-col-12 fr-col-md-10">
    <figure class="fr-content-media" role="group">
      <div class="fr-content-media__img">
        <img class="fr-responsive-img fr-ratio-16x9" src={PlaceholderPict16x9} alt="" />
      </div>
    </figure>
  </div>
</div>

<div class="fr-grid-row">
  <div class="fr-pb-12v"></div>
</div>
