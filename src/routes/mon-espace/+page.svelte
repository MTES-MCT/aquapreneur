<script lang="ts">
  import ContractPict from '@gouvfr/dsfr/dist/artwork/pictograms/document/contract.svg';
  import PlaceholderPict16x9 from '@gouvfr/dsfr/example/img/placeholder.16x9.png';
</script>

<h1>Mon espace</h1>

<div class="fr-grid-row fr-grid-row--top">
  <div class="fr-col">
    <h2 class="fr-h5">Mes déclarations récentes</h2>
  </div>

  <div class="fr-col">
    <div class="fr-toggle fr-toggle--label-left">
      <input
        type="checkbox"
        class="fr-toggle__input"
        aria-describedby="toggle-4693-messages"
        id="toggle-4693"
      />
      <label class="fr-toggle__label" for="toggle-4693"
        >Afficher uniquement les déclarations incomplètes</label
      >
      <div class="fr-messages-group" id="toggle-4693-messages" aria-live="polite"></div>
    </div>
  </div>
</div>

<div class="fr-grid-row fr-grid-row--gutters">
  <div class="fr-col">
    <div class="fr-tile fr-tile--horizontal fr-enlarge-link" id="tile-6661">
      <div class="fr-tile__body">
        <div class="fr-tile__content">
          <h3 class="fr-tile__title">
            <a href="mon-espace/declarations/2024">Déclaration 2024</a>
          </h3>
          <p class="fr-tile__detail">Commencer</p>

          <div class="fr-tile__start">
            <p class="fr-badge fr-badge--sm fr-badge--new fr-badge--no-icon">À compléter</p>
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

  <div class="fr-col">
    <div class="fr-tile fr-tile--horizontal fr-enlarge-link" id="tile-6661">
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
  <div class="fr-col">
    <div class="fr-tile fr-tile--horizontal fr-enlarge-link" id="tile-6661">
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
</div>

<div class="fr-grid-row fr-mt-4v">
  <div class="fr-col">
    <a href="mon-espace/declarations" class="fr-link fr-icon-arrow-right-line fr-link--icon-right"
      >Voir toutes mes déclarations passées</a
    >
  </div>
</div>

<div class="fr-grid-row fr-mt-16v">
  <div class="fr-col">
    <h2 class="fr-h5">Ma production aquacole</h2>
  </div>
</div>

<div class="fr-grid-row fr-grid-row--middle fr-grid-row--gutters">
  <div class="fr-col">
    <figure class="fr-content-media" role="group">
      <div class="fr-content-media__img">
        <img class="fr-responsive-img fr-ratio-16x9" src={PlaceholderPict16x9} alt="" />
      </div>
    </figure>
  </div>
  <div class="fr-col">
    <figure class="fr-content-media" role="group">
      <div class="fr-content-media__img">
        <img class="fr-responsive-img fr-ratio-16x9" src={PlaceholderPict16x9} alt="" />
      </div>
    </figure>
  </div>
  <div class="fr-col">
    <figure class="fr-content-media" role="group">
      <div class="fr-content-media__img">
        <img class="fr-responsive-img fr-ratio-16x9" src={PlaceholderPict16x9} alt="" />
      </div>
    </figure>
  </div>
</div>

<div class="fr-grid-row fr-mt-16v">
  <div class="fr-col">
    <h2 class="fr-h5">Mes concessions</h2>
  </div>
</div>
<div class="fr-grid-row fr-grid-row--middle fr-grid-row--gutters">
  <div class="fr-col">
    <figure class="fr-content-media" role="group">
      <div class="fr-content-media__img">
        <img class="fr-responsive-img fr-ratio-16x9" src={PlaceholderPict16x9} alt="" />
      </div>
    </figure>
  </div>
  <div class="fr-col">
    <figure class="fr-content-media" role="group">
      <div class="fr-content-media__img">
        <img class="fr-responsive-img fr-ratio-16x9" src={PlaceholderPict16x9} alt="" />
      </div>
    </figure>
  </div>
  <div class="fr-col">
    <figure class="fr-content-media" role="group">
      <div class="fr-content-media__img">
        <img class="fr-responsive-img fr-ratio-16x9" src={PlaceholderPict16x9} alt="" />
      </div>
    </figure>
  </div>
</div>
<div class="fr-grid-row fr-mt-16v">
  <div class="fr-col">
    <h2 class="fr-h5">Mon équipe</h2>
  </div>
</div>
<div class="fr-grid-row fr-grid-row--middle fr-grid-row--gutters">
  <div class="fr-col">
    <figure class="fr-content-media" role="group">
      <div class="fr-content-media__img">
        <img class="fr-responsive-img fr-ratio-16x9" src={PlaceholderPict16x9} alt="" />
      </div>
    </figure>
  </div>
  <div class="fr-col">
    <figure class="fr-content-media" role="group">
      <div class="fr-content-media__img">
        <img class="fr-responsive-img fr-ratio-16x9" src={PlaceholderPict16x9} alt="" />
      </div>
    </figure>
  </div>
  <div class="fr-col">
    <figure class="fr-content-media" role="group">
      <div class="fr-content-media__img">
        <img class="fr-responsive-img fr-ratio-16x9" src={PlaceholderPict16x9} alt="" />
      </div>
    </figure>
  </div>
</div>
