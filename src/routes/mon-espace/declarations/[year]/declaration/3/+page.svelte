<script lang="ts">
  import { enhance } from '$app/forms';

  import Fieldset from '$lib/components/fieldset.svelte';
  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import Textareagroup from '$lib/components/textarea–group.svelte';
  import { getDeclarationContext } from '$lib/declaration-context';

  const context = getDeclarationContext();
</script>

<h1 class="fr-h2">Avez-vous relevé des données erronées dans le formulaire ?</h1>
<form method="POST" use:enhance>
  <Fieldset>
    {#snippet legend()}
      <span class="fr-fieldset__legend--regular"></span>{/snippet}
    {#snippet inputs()}
      <Textareagroup name="data-errors-txt" rows={5} bind:value={context.formErreursComment}>
        {#snippet label()}{/snippet}
      </Textareagroup>
    {/snippet}
  </Fieldset>

  <NavigationLinks prevHref="2" nextIsButton />
</form>
