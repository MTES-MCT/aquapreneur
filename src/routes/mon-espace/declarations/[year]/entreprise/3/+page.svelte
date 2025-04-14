<script lang="ts">
  import { goto } from '$app/navigation';

  import Fieldset from '$lib/components/fieldset.svelte';
  import InputGroup from '$lib/components/input-group.svelte';
  import NavigationLinks from '$lib/components/navigation-links.svelte';

  const { data } = $props();
</script>

<h1 class="fr-h2">Comment vous contacter ?</h1>
<p>
  Merci de vérifier si vos coordonnées de contact sont exactes, et si besoin les corriger ou les
  compléter.
</p>

<Fieldset>
  {#snippet legend()}
    <span class="fr-fieldset__legend--regular fr-hint-text fr-text--sm">
      * Les champs marqués d’une étoile sont obligatoires
    </span>
  {/snippet}

  {#snippet inputs(fieldsetId)}
    <InputGroup
      name="courriel-entreprise"
      type="email"
      value={data.utilisateur.courriel}
      {fieldsetId}
    >
      {#snippet label()}
        E-mail de l’entreprise *
        <span class="fr-hint-text">
          Indiquez l’adresse e-mail générale de votre entreprise. Format attendu : nom@domaine.fr
        </span>
      {/snippet}
    </InputGroup>

    <InputGroup name="courriel-contact" type="email" {fieldsetId}>
      {#snippet label()}
        E-mail de contact
        <span class="fr-hint-text">
          Indiquez l’adresse e-mail du contact principal. Format attendu : nom@domaine.fr
        </span>
      {/snippet}
    </InputGroup>

    <InputGroup name="tel-entreprise" type="tel" value={data.utilisateur.telephone} {fieldsetId}>
      {#snippet label()}
        Numéro de téléphone de l’entreprise *
        <span class="fr-hint-text">
          Indiquez le numéro de téléphone principal de votre entreprise. Format attendu : 01 22 33
          44 55
        </span>
      {/snippet}
    </InputGroup>

    <InputGroup name="tel-contact" type="tel" {fieldsetId}>
      {#snippet label()}
        Numéro de téléphone de contact
        <span class="fr-hint-text">
          Indiquez le numéro de téléphone du contact principal. Format attendu : 01 22 33 44 55
        </span>
      {/snippet}
    </InputGroup>
  {/snippet}
</Fieldset>

<NavigationLinks
  prevHref="2"
  nextLabel="Valider"
  nextIsButton
  nextButtonCb={() => goto('../concessions')}
/>
