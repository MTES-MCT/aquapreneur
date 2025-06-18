<script lang="ts">
	import {
		type DeclarationContext,
		emptyDeclarationValues,
		setDeclarationContext,
	} from "$lib/declaration-context";

	let { children } = $props();

	let declarationState: DeclarationContext = $state({
		...emptyDeclarationValues,
	});
	setDeclarationContext(declarationState);
</script>

{@render children()}
