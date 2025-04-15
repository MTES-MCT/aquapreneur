<script lang="ts">
  import { goto } from '$app/navigation';

  import Fieldset from '$lib/components/fieldset.svelte';
  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import Textareagroup from '$lib/components/textarea–group.svelte';
</script>

<h1 class="fr-h2">Avez-vous relevé des données erronées dans le formulaire ?</h1>

<Fieldset>
  {#snippet legend()}
    <span class="fr-fieldset__legend--regular"></span>{/snippet}
  {#snippet inputs()}
    <Textareagroup name="data-errors-txt" rows={5}>
      {#snippet label()}{/snippet}
    </Textareagroup>
  {/snippet}
</Fieldset>

<NavigationLinks prevHref="2" nextIsButton nextButtonCb={() => goto('4')} nextLabel="Valider" />
