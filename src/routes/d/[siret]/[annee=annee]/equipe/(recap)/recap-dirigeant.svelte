<script lang="ts">
	import type { DeclarationSchema } from "$lib/schemas/declaration-schema";

	const {
		dirigeant,
	}: {
		dirigeant: DeclarationSchema["equipe"]["dirigeants"][number];
	} = $props();
</script>

TODO…
<br />
{dirigeant.prenomNom}
