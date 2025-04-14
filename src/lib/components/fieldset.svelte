<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    inputs,
    legend,
    id
  }: {
    inputs: Snippet<[string]>;
    legend: Snippet;
    id?: string;
  } = $props();

  const defaultId = $props.id();
  id = id ?? defaultId;
</script>

<fieldset class="fr-fieldset" {id} aria-labelledby="{id}-legend {id}-messages">
  <legend id="{id}-legend" class="fr-fieldset__legend">
    {@render legend()}
  </legend>

  {@render inputs(id)}

  <div class="fr-messages-group" id="{id}-messages" aria-live="polite"></div>
</fieldset>
