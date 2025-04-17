<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    label,
    type,
    name,
    value = $bindable(),
    fieldsetId,
    required,
    actionButton
  }: {
    label: Snippet;
    type: 'text' | 'email' | 'tel';
    name: string;
    value?: string | null;
    fieldsetId: string;
    required?: boolean;
    actionButton?: Snippet;
  } = $props();
  const id = $props.id();
</script>

<div class="fr-fieldset__element">
  <div class="fr-input-group">
    <label class="fr-label" for={id}>
      {@render label()}
    </label>
    <div class:wbtn={!!actionButton} class="fr-mt-2v">
      <input
        class="fr-input"
        aria-describedby="{fieldsetId}-messages"
        {type}
        {id}
        {name}
        bind:value
        {required}
      />
      {#if actionButton}
        {@render actionButton()}
      {/if}
    </div>
  </div>
</div>

<style>
  .wbtn {
    display: flex;
    column-gap: 1rem;
  }
</style>
