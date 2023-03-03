<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let label: string | undefined = undefined;
	export let icon: SVGElement;

	export let disabled = false;
	export let active = false;

	const handleClick = (e: MouseEvent) => {
		if (disabled) return;

		dispatch('click', e);
	};
</script>

<!-- vertical -->
<button on:click={handleClick} {disabled}>
	<span>{icon}</span>
	{#if label}
		<span>{label}</span>
	{/if}
</button>
