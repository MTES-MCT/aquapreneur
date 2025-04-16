<script lang="ts">
  import { enhance } from '$app/forms';

  import Fieldset from '$lib/components/fieldset.svelte';
  import NavigationLinks from '$lib/components/navigation-links.svelte';
  import Textareagroup from '$lib/components/textarea–group.svelte';
  import { getDeclarationContext } from '$lib/declaration-context';

  const context = getDeclarationContext();
</script>

<h1 class="fr-h2">Avez-vous des remarques ou suggestions concernant l’outil ?</h1>
<form method="POST" use:enhance>
  <Fieldset>
    {#snippet legend()}
      <span class="fr-fieldset__legend--regular"></span>{/snippet}
    {#snippet inputs()}
      <Textareagroup name="suggestions-txt" rows={5} bind:value={context.suggestionsComment}>
        {#snippet label()}{/snippet}
      </Textareagroup>
    {/snippet}
  </Fieldset>

  <NavigationLinks prevHref="3" nextIsButton />
</form>
