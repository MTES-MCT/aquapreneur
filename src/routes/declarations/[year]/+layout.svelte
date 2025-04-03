<script lang="ts">
  import type { Snippet } from 'svelte';

  import { page } from '$app/state';

  import MenuDeclaration from '$lib/components/menu-declaration.svelte';

  import type { LayoutData } from './$types';

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="fr-grid-row fr-grid-row--top">
  <div class="fr-col-md-3 fr-col-12">
    <MenuDeclaration step={page.data.step} baseUrl="/declarations/{data.year}"></MenuDeclaration>
  </div>

  <div class="fr-col-8 fr-mt-7w">
    {@render children()}
  </div>
</div>
