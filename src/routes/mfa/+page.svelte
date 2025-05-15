<script>
  import { dsfrLink } from '$lib/utils';
</script>

<div class="fr-container">
  <div class="fr-grid-row fr-grid-row--middle fr-grid-row--gutters fr-grid-row--center fr-py-12v">
    <div class="fr-py-0 fr-col-12 fr-col-md-6" id="contenu">
      <h1>Authentification multifacteurs requise</h1>
      <p class="fr-text--lead fr-mb-5w">
        L’accès au fonctions d’administration n’est possible que pour les comptes ayant activé
        l’authentification multifacteurs.
      </p>
      <p class="fr-text--sm fr-mb-3w">
        Vous pouvez l’activer sur

        <a
          target="_blank"
          rel="noopener external"
          title="info.gouv.fr - nouvelle fenêtre"
          class="fr-link"
          href="https://identite.proconnect.gouv.fr/connection-and-account"
          >identite.proconnect.gouv.fr</a
        >
      </p>
      <ul class="fr-btns-group fr-btns-group--inline-md">
        <li>
          <a class="fr-btn" href="/"> Page d'accueil </a>
        </li>
        <li>
          <a class="fr-btn fr-btn--secondary" href="mailto:aquapreneur@beta.gouv.fr">
            Contactez-nous
          </a>
        </li>
      </ul>
    </div>

    <div
      class="fr-col-12 fr-col-md-3 fr-col-offset-md-1 fr-px-6w fr-px-md-0 fr-py-0 fr-hidden fr-unhidden-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="fr-responsive-img fr-artwork"
        aria-hidden="true"
        width="160"
        height="200"
        viewBox="0 0 160 200"
      >
        <use class="fr-artwork-motif" href="{dsfrLink('ovoid', 'background')}#artwork-motif"></use>
        <use
          class="fr-artwork-background"
          href="{dsfrLink('ovoid', 'background')}#artwork-background"
        ></use>
        <g transform="translate(40, 60)">
          <use
            class="fr-artwork-decorative"
            href="{dsfrLink('system/technical-error')}#artwork-decorative"
          ></use>
          <use class="fr-artwork-minor" href="{dsfrLink('system/technical-error')}#artwork-minor"
          ></use>
          <use class="fr-artwork-major" href="{dsfrLink('system/technical-error')}#artwork-major"
          ></use>
        </g>
      </svg>
    </div>
  </div>
</div>
