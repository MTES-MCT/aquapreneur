<script lang="ts">
  import { goto } from '$app/navigation';

  import Fieldset from '$lib/components/fieldset.svelte';
  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import TextareaGroup from '$lib/components/textarea–group.svelte';

  const { data } = $props();
</script>

<h1 class="fr-h2">Avez-vous eu des événements exceptionnels au cours de l'année {data.year} ?</h1>

<p>
  Vous pouvez nous indiquer tout évènement pouvant expliquer des changements importants de votre
  production.
</p>
<Fieldset>
  {#snippet legend()}
    <span class="fr-fieldset__legend--regular">Si oui, veuillez les préciser :</span>{/snippet}
  {#snippet inputs()}
    <TextareaGroup name="events-txt" rows={5}>
      {#snippet label()}{/snippet}
    </TextareaGroup>
  {/snippet}
</Fieldset>

<NavigationLinks prevHref="1" nextIsButton nextButtonCb={() => goto('3')} nextLabel="Valider" />
