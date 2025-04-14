<script lang="ts">
  const {
    prevHref,
    nextHref,
    prevLabel = 'Précédent',
    nextLabel = 'Suivant',
    nextIsButton = false,
    nextButtonCb
  }: {
    prevHref?: string;
    nextHref?: string;
    prevLabel?: string;
    nextLabel?: string;
    nextIsButton?: boolean;
    nextButtonCb?: () => void;
  } = $props();
</script>

<div
  class="fr-mt-8w"
  style="display:flex; justify-content: {prevHref ? 'space-between' : 'flex-end'};"
>
  {#if prevHref}
    <a
      href={prevHref}
      class="fr-link fr-icon-arrow-left-line fr-link--icon-left"
      style="justify-self: start">{prevLabel}</a
    >
  {/if}
  {#if nextHref}
    <a
      href={nextHref}
      class="fr-link fr-icon-arrow-right-line fr-link--icon-right"
      style="justify-self: end">{nextLabel}</a
    >
  {:else if nextIsButton}
    <button class="fr-btn" onclick={nextButtonCb ?? (() => null)}>{nextLabel}</button>
  {/if}
</div>
