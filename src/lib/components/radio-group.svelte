<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    label,
    name,
    id,
    inline = false
  }: {
    label: Snippet;
    name: string;
    id: string;
    inline: boolean;
  } = $props();
</script>

<div class="fr-fieldset__element {inline ? 'fr-fieldset__element--inline' : ''}">
  <div class="fr-radio-group">
    <input type="radio" class="fr-input" {id} {name} />
    <label class="fr-label" for={id}>
      {@render label()}
    </label>
  </div>
</div>
