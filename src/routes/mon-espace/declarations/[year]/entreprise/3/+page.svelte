<script lang="ts">
  import { goto } from '$app/navigation';

  import NavigationLinks from '$lib/components/navigation-links.svelte';

  const { data } = $props();
</script>

<h1 class="fr-h2">Comment vous contacter ?</h1>
<p>
  Merci de vérifier si vos coordonnées de contact sont exactes, et si besoin les corriger ou les
  compléter.
</p>
<fieldset
  class="fr-fieldset"
  id="address-543"
  aria-labelledby="address-543-legend address-543-messages"
>
  <legend
    class="fr-fieldset__legend--regular fr-fieldset__legend fr-hint-text fr-text--sm"
    id="radio-inline-legend"
  >
    * Les champs marqués d’une étoile sont obligatoires
  </legend>

  <div class="fr-fieldset__element">
    <div class="fr-input-group">
      <label class="fr-label" for="text-input-text"
        >E-mail de l’entreprise *<span class="fr-hint-text"
          >Indiquez l’adresse e-mail générale de votre entreprise. Format attendu : nom@domaine.fr</span
        ></label
      ><input
        class="fr-input"
        type="email"
        id="text-input-text"
        name="text-input-text"
        value={data.utilisateur.courriel}
      />
    </div>
  </div>
  <div class="fr-fieldset__element">
    <div class="fr-input-group">
      <label class="fr-label" for="text-input-text"
        >E-mail de contact<span class="fr-hint-text"
          >Indiquez l’adresse e-mail du contact principal. Format attendu : nom@domaine.fr</span
        ></label
      ><input class="fr-input" type="email" id="text-input-text" name="text-input-text" />
    </div>
  </div>
  <div class="fr-fieldset__element">
    <div class="fr-input-group">
      <label class="fr-label" for="text-input-text"
        >Numéro de téléphone de l’entreprise *<span class="fr-hint-text"
          >Indiquez le numéro de téléphone principal de votre entreprise. Format attendu : 01 22 33
          44 55</span
        ></label
      ><input
        class="fr-input"
        type="tel"
        id="text-input-text"
        name="text-input-text"
        value={data.utilisateur.telephone}
      />
    </div>
  </div>
  <div class="fr-fieldset__element">
    <div class="fr-input-group">
      <label class="fr-label" for="text-input-text"
        >Numéro de téléphone de contact<span class="fr-hint-text"
          >Indiquez le numéro de téléphone du contact principal. Format attendu : 01 22 33 44 55</span
        ></label
      ><input class="fr-input" type="tel" id="text-input-text" name="text-input-text" />
    </div>
  </div>
</fieldset>
<NavigationLinks
  prevHref="2"
  nextLabel="Valider"
  nextIsButton
  nextButtonCb={() => goto('../concessions')}
/>
