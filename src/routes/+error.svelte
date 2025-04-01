<script lang="ts">
  import OvoidPict from '@gouvfr/dsfr/dist/artwork/background/ovoid.svg';
  import TechErrorPict from '@gouvfr/dsfr/dist/artwork/pictograms/system/technical-error.svg';

  import { page } from '$app/state';
</script>

<svelte:head>
  {#if page.error?.message === 'Not Found'}
    <title>Page non trouvée - Aquapreneur</title>
  {:else}
    <title>Erreur inattendue - Aquapreneur</title>
  {/if}
</svelte:head>

{#if page.error?.message === 'Not Found'}
  <div class="fr-grid-row fr-grid-row--middle fr-grid-row--gutters fr-grid-row--center">
    <div class="fr-py-0 fr-col-12 fr-col-md-6">
      <h1>Page non trouvée</h1>
      <p class="fr-text--sm fr-mb-3w">Erreur 404</p>
      <p class="fr-text--lead fr-mb-5w">
        La page que vous cherchez est introuvable. Excusez-nous pour la gène occasionnée.
      </p>
      <p class="fr-text--sm fr-mb-3w">
        Si vous avez tapé l'adresse web dans le navigateur, vérifiez qu'elle est correcte. La page
        n’est peut-être plus disponible.
        <br />Dans ce cas, pour continuer votre visite vous pouvez consulter notre page d’accueil.
        Sinon contactez-nous pour que l’on puisse vous rediriger vers la bonne information.
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
{:else}
  <div class="fr-grid-row fr-grid-row--middle fr-grid-row--gutters fr-grid-row--center">
    <div class="fr-py-0 fr-col-12 fr-col-md-6">
      <h1>Erreur inattendue</h1>
      <p class="fr-text--sm fr-mb-3w">Erreur 500</p>
      <p class="fr-text--lead fr-mb-5w">
        Désolé, le service rencontre un problème, nous travaillons pour le résoudre le plus
        rapidement possible.
      </p>
      <p class="fr-text--sm fr-mb-3w">
        Essayez de rafraîchir la page ou bien ressayez plus tard.<br />
        Si vous avez besoin d’une aide immédiate, merci de nous contacter.
      </p>
      <ul class="fr-btns-group fr-btns-group--inline-md">
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
{/if}
