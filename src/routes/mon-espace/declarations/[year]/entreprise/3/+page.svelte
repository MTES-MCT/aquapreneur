<script lang="ts">
  import { enhance } from '$app/forms';

  import Fieldset from '$lib/components/fieldset.svelte';
  import InputGroup from '$lib/components/input-group.svelte';
  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import { getDeclarationContext } from '$lib/declaration-context';

  const { data } = $props();

  const context = getDeclarationContext();

  if (!context.emailEntreprise) {
    context.emailEntreprise = data.utilisateur.courriel;
  }
  if (!context.telEntreprise) {
    context.telEntreprise = data.utilisateur.telephone ?? '';
  }
</script>

<h1 class="fr-h2">Comment vous contacter ?</h1>
<p>
  Merci de vérifier si vos coordonnées de contact sont exactes, et si besoin les corriger ou les
  compléter.
</p>
<form method="POST" use:enhance>
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
        bind:value={context.emailEntreprise}
        {fieldsetId}
        required
      >
        {#snippet label()}
          E-mail de l’entreprise *
          <span class="fr-hint-text">
            Indiquez l’adresse e-mail générale de votre entreprise. Format attendu : nom@domaine.fr
          </span>
        {/snippet}
      </InputGroup>

      <InputGroup
        name="courriel-contact"
        type="email"
        {fieldsetId}
        bind:value={context.emailContact}
      >
        {#snippet label()}
          E-mail de contact
          <span class="fr-hint-text">
            Indiquez l’adresse e-mail du contact principal. Format attendu : nom@domaine.fr
          </span>
        {/snippet}
      </InputGroup>

      <InputGroup
        name="tel-entreprise"
        type="tel"
        {fieldsetId}
        bind:value={context.telEntreprise}
        required
      >
        {#snippet label()}
          Numéro de téléphone de l’entreprise *
          <span class="fr-hint-text">
            Indiquez le numéro de téléphone principal de votre entreprise. Format attendu : 01 22 33
            44 55
          </span>
        {/snippet}
      </InputGroup>

      <InputGroup name="tel-contact" type="tel" {fieldsetId} bind:value={context.telContact}>
        {#snippet label()}
          Numéro de téléphone de contact
          <span class="fr-hint-text">
            Indiquez le numéro de téléphone du contact principal. Format attendu : 01 22 33 44 55
          </span>
        {/snippet}
      </InputGroup>
    {/snippet}
  </Fieldset>

  <NavigationLinks prevHref="2" nextIsButton />
</form>
