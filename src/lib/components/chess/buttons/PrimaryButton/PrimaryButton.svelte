<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let label = '';
	export let icon: SVGElement | undefined = undefined;
	export let iconPlacement: 'left' | 'right' = 'left';

	export let disabled = false;
	export let active = false;
	export let fullWidth = false;

	const handleClick = (e: MouseEvent) => {
		if (disabled) return;

		dispatch('click', e);
	};
</script>

<!-- horizontal -->
<button on:click={handleClick} {disabled} data-fullwidth={fullWidth} data-active={active}>
	{#if icon && iconPlacement === 'left'}
		<span class="p-btn-icon">{icon}</span>
	{/if}
	<span class="p-btn-label">{label}</span>
	{#if icon && iconPlacement === 'right'}
		<span class="p-btn-icon">{icon}</span>
	{/if}
</button>

<style lang="postcss">
	button {
		@apply relative my-2 mx-1 rounded-[.2rem] bg-app-white py-3 px-7 text-app-black transition-all ease-in-out;
	}

	button:not([data-fullwidth='true']) {
		@apply self-center;
	}

	button::after {
		content: '';
		@apply absolute inset-0 -z-[1] translate-y-1 rounded-[.2rem] bg-secondary-shadow transition-all ease-in-out;
	}

	button:not([disabled]):hover::after {
		content: '';
		@apply translate-y-1 bg-primary-shadow;
	}

	button[data-active='true'] {
		@apply bg-primary text-app-white;
	}

	button[data-active='true']::after {
		content: '';
		@apply translate-y-1 bg-primary-shadow;
	}

	button[data-active='true']:not([disabled]):hover {
		@apply bg-primary-light text-app-white;
	}

	button[data-active='true']:not([disabled]):hover::after {
		content: '';
		@apply translate-y-1 bg-primary-shadow-light;
	}

	button:disabled[data-active='true'] {
		@apply bg-primary-disabled text-app-white;
	}

	button:disabled[data-active='true']::after {
		content: '';
		@apply translate-y-1 bg-primary-shadow-disabled;
	}

	button:disabled {
		@apply bg-disabled-bg text-disabled-text;
	}

	button:not([disabled]):hover {
		@apply bg-primary text-app-white;
	}

	.p-btn-icon {
		@apply inline-block fill-app-black;
	}

	.p-btn-label {
		@apply font-test text-2xl font-bold;
	}
</style>
