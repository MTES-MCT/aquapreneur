<script lang="ts">
  import { enhance } from '$app/forms';

  import type { Utilisateur } from '$db/schema/auth';

  import LogoAP from '$lib/assets/logo-aquapreneur.svg';

  const { utilisateur }: { utilisateur: Utilisateur | null } = $props();
</script>

<!-- svelte-ignore a11y_no_redundant_roles -->
<header role="banner" class="fr-header">
  <div class="fr-header__body">
    <div class="fr-container">
      <div class="fr-header__body-row">
        <div class="fr-header__brand fr-enlarge-link">
          <div class="fr-header__brand-top">
            <div class="fr-header__logo">
              <p class="fr-logo">
                République<br />
                française
              </p>
            </div>
            <div class="fr-header__operator">
              <a href="/" title="Retour à l'accueil du site">
                <img class="fr-responsive-img" style="width: 1rem" src={LogoAP} alt="" />
              </a>
            </div>
            <div class="fr-header__navbar">
              <button
                class="fr-btn--menu fr-btn"
                data-fr-opened="false"
                aria-controls="modal-499"
                id="button-500"
                title="Menu"
              >
                Menu
              </button>
            </div>
          </div>
          <div class="fr-header__service">
            <a href="/" title="Accueil - Aquapreneur">
              <p class="fr-header__service-title">
                Aquapreneur <span class="fr-badge fr-badge--sm fr-badge--success fr-badge--no-icon"
                  >Bêta</span
                >
              </p>
            </a>
            <p class="fr-header__service-tagline">
              Le portail qui accompagne les entrepreneurs et entrepreneuses aquacoles
            </p>
          </div>
        </div>

        <div class="fr-header__tools">
          <div class="fr-header__tools-links">
            <ul class="fr-btns-group">
              <li>
                {#if utilisateur}
                  <form method="post" action="/auth/logout/proconnect" use:enhance>
                    <button class="fr-btn fr-btn--sm fr-icon-lock-unlock-line fr-btn--tertiary"
                      >Se deconnecter</button
                    >
                  </form>
                {:else}
                  <form method="post" action="/auth/login/proconnect" use:enhance>
                    <button class="fr-btn fr-btn--sm fr-icon-lock-line fr-btn--tertiary"
                      >Se connecter</button
                    >
                  </form>
                {/if}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="fr-header__menu fr-modal" id="modal-499" aria-labelledby="button-500">
    <div class="fr-container">
      <button class="fr-btn--close fr-btn" aria-controls="modal-499" title="Fermer">
        Fermer
      </button>
      <div class="fr-header__menu-links"></div>
    </div>
  </div>
</header>
