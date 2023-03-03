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

	$: buttonStyles = disabled
		? active
			? 'bg-primary-disabled text-app-white text-opacity-90'
			: 'bg-disabled-bg text-disabled-text'
		: active
		? 'bg-primary text-app-white hover:bg-primary-light active:translate-y-1'
		: 'bg-app-white text-app-black hover:bg-primary hover:text-app-white active:translate-y-1';

	$: shadowStyles = disabled
		? active
			? 'bg-primary-shadow-disabled'
			: 'bg-btn-shadow'
		: active
		? 'bg-primary-shadow group-hover:bg-primary-shadow-light group-active:translate-y-0 group-active:-z-10'
		: 'bg-btn-shadow group-hover:bg-primary-shadow group-active:translate-y-0 group-active:-z-10	';
</script>

<!-- horizontal -->
<button
	on:click={handleClick}
	{disabled}
	class="group relative my-2 mx-1 py-3 px-7 font-test text-2xl font-bold {!fullWidth &&
		'self-center'} {buttonStyles} btn-base group"
>
	{#if icon && iconPlacement === 'left'}
		<span class="p-btn-icon">{icon}</span>
	{/if}
	<span class="p-btn-label">{label}</span>
	{#if icon && iconPlacement === 'right'}
		<span class="p-btn-icon">{icon}</span>
	{/if}
	<span class="absolute inset-0 -z-10 {shadowStyles} btn-base translate-y-1" />
</button>

<style lang="postcss">
	.btn-base {
		@apply rounded-[.2rem] transition-all ease-in-out;
	}
</style>
