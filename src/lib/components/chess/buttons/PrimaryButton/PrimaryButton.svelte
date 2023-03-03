<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let label = '';
	export let icon: SVGElement | undefined = undefined;

	export let disabled = false;
	export let active = false;

	const handleClick = (e: MouseEvent) => {
		if (disabled) return;

		dispatch('click', e);
	};
</script>

<!-- horizontal -->
<button on:click={handleClick} {disabled}>
	{#if icon}
		<span>{icon}</span>
	{/if}
	<span>{label}</span>
</button>

<style lang="postcss">
	button {
		@apply bg-app-white font-test font-bold;
	}

	button:disabled {
		@apply bg-disabled-bg;
	}

	button:hover {
		@apply bg-primary;
	}
</style>
