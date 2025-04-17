<script lang="ts">
  import { enhance } from '$app/forms';

  import Fieldset from '$lib/components/fieldset.svelte';
  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import TextareaGroup from '$lib/components/textarea–group.svelte';
  import { getDeclarationContext } from '$lib/declaration-context';

  const { data } = $props();

  const context = getDeclarationContext();
</script>

<h1 class="fr-h2">Avez-vous eu des événements exceptionnels au cours de l'année {data.year} ?</h1>

<p>
  Vous pouvez nous indiquer tout évènement pouvant expliquer des changements importants de votre
  production.
</p>
<form method="POST" use:enhance>
  <Fieldset>
    {#snippet inputs()}
      <TextareaGroup name="events-txt" rows={5} bind:value={context.evtExceptionnelsComment}>
        {#snippet label()}Si oui, veuillez les préciser :{/snippet}
      </TextareaGroup>
    {/snippet}
  </Fieldset>

  <NavigationLinks prevHref="1" nextIsButton />
</form>
