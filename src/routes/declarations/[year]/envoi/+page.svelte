<script lang="ts">
  import { goto } from '$app/navigation';

  function handleCloseModal(modalId: string) {
    const element = document.getElementById(modalId);
    // @ts-expect-error -- pas de type disponible
    dsfr(element).modal.conceal();
  }

  function handleSubmit() {
    goto('/');
  }
</script>

<h2 class="fr-h5">Récapitulatif de votre déclaration</h2>

<!-- Bouton d'ouverture de la modale -->

<button class="fr-btn" data-fr-opened="false" aria-controls="fr-modal-2">
  Valider et envoyer
</button>

<!-- Modale avec zone d'action DSFR
   Idéalement, la balise <dialog> devrait être un enfant direct de la balise <body>
-->

<!-- svelte-ignore a11y_no_redundant_roles -->
<dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" class="fr-modal" role="dialog">
  <div class="fr-container fr-container--fluid fr-container-md">
    <div class="fr-grid-row fr-grid-row--center">
      <div class="fr-col-12 fr-col-md-8 fr-col-lg-6">
        <div class="fr-modal__body">
          <div class="fr-modal__header">
            <button class="fr-btn--close fr-btn" aria-controls="fr-modal-2">Fermer</button>
          </div>
          <div class="fr-modal__content">
            <h1 id="fr-modal-2-title" class="fr-modal__title">
              <span class="fr-icon-arrow-right-line fr-icon--lg"></span>
              Confirmation de l’envoi
            </h1>
            <p>
              La déclaration ne sera plus modifiable. Vous recevrez une confirmation par e-mail.
            </p>
          </div>
          <div class="fr-modal__footer">
            <div
              class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left"
            >
              <button class="fr-btn fr-btn--icon-left" onclick={handleSubmit}> Envoyer </button>
              <button
                class="fr-btn fr-btn--secondary"
                onclick={() => handleCloseModal('fr-modal-2')}
              >
                Continuer ma déclaration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</dialog>
