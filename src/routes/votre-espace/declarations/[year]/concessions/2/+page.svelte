<script lang="ts">
  import Fieldset from '$lib/components/fieldset.svelte';
  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import RadioGroup from '$lib/components/radio-group.svelte';
  import { enhanceNoInvalidate } from '$lib/utils';
</script>

<h1 class="fr-h2">
  Avez-vous effectué des changements sur vos concessions depuis l'année dernière ?
</h1>

<p>
  Cela concerne tout changement ayant un impact sur l’usage de vos concessions. Par exemple :
  changement d’activité sur une zone, remplacement de tables par des filières en mer, extension
  d’une concession, arrêt de l’exploitation d’une concession…
</p>

<form method="POST" use:enhanceNoInvalidate>
  <Fieldset>
    {#snippet inputs()}
      <RadioGroup name="radio-inline" id="radio-oui" checked inline>
        {#snippet label()}Oui{/snippet}
      </RadioGroup>

      <RadioGroup name="radio-inline" id="radio-non" disabled inline>
        {#snippet label()}Non{/snippet}
      </RadioGroup>
    {/snippet}
  </Fieldset>

  <NavigationLinks prevHref="1" nextIsButton />
</form>
