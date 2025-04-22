<script lang="ts">
  import OvoidPict from '@gouvfr/dsfr/dist/artwork/background/ovoid.svg';
  import TechErrorPict from '@gouvfr/dsfr/dist/artwork/pictograms/system/technical-error.svg';
</script>

<div class="fr-container">
  <div class="fr-grid-row fr-grid-row--middle fr-grid-row--gutters fr-grid-row--center fr-py-12v">
    <div class="fr-py-0 fr-col-12 fr-col-md-6" id="contenu">
      <h1>Compte non validé</h1>
      <p class="fr-text--lead fr-mb-5w">
        Votre compte utilisateur n’est pas autorisé à accéder aux données d’Aquapreneur.
      </p>
      <p class="fr-text--sm fr-mb-3w">
        Si vous faites partie de l’expérimentation, contactez-nous pour que nous fassions le
        nécessaire.
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
        <use class="fr-artwork-motif" href="{OvoidPict}#artwork-motif"></use>
        <use class="fr-artwork-background" href="{OvoidPict}#artwork-background"></use>
        <g transform="translate(40, 60)">
          <use class="fr-artwork-decorative" href="{TechErrorPict}#artwork-decorative"></use>
          <use class="fr-artwork-minor" href="{TechErrorPict}#artwork-minor"></use>
          <use class="fr-artwork-major" href="{TechErrorPict}#artwork-major"></use>
        </g>
      </svg>
    </div>
  </div>
</div>
