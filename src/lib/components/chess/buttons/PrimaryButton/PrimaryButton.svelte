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
<button
	on:click={handleClick}
	{disabled}
	class="my-2 mx-1 rounded-[.2rem] py-3 px-7 font-test text-2xl font-bold {!fullWidth &&
		'self-center'} {disabled
		? active
			? 'bg-primary-shadow-disabled text-app-white text-opacity-90'
			: 'bg-disabled-bg text-disabled-text'
		: active
		? 'bg-primary text-app-white'
		: 'bg-app-white text-app-black'} transition-all ease-in-out"
>
	{#if icon && iconPlacement === 'left'}
		<span class="p-btn-icon">{icon}</span>
	{/if}
	<span class="p-btn-label">{label}</span>
	{#if icon && iconPlacement === 'right'}
		<span class="p-btn-icon">{icon}</span>
	{/if}
</button>
