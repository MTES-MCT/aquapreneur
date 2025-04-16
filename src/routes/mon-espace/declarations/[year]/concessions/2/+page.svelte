<script lang="ts">
  import { enhance } from '$app/forms';

  import Fieldset from '$lib/components/fieldset.svelte';
  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import RadioGroup from '$lib/components/radio-group.svelte';
</script>

<h1 class="fr-h2">
  Avez-vous effectué des changements sur vos concessions depuis l'année dernière ?
</h1>

<form method="POST" use:enhance>
  <Fieldset>
    {#snippet legend()}
      <span class="fr-fieldset__legend--regular">
        Par exemple, vous avez [changements typiques effectués sur les concessions]
      </span>
    {/snippet}
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
