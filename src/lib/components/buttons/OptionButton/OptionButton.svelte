<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let label = '';
	export let icon: SVGElement | any | undefined = undefined;
	export let iconPlacement: 'top' | 'bottom' = 'top';

	export let disabled = false;
	export let inactive = false;
	export let active = false;
	export let fullWidth = false;
	export let center = false;

	const handleClick = (e: MouseEvent) => {
		if (disabled) return;

		dispatch('click', e);
	};

	$: buttonStyles = disabled
		? active
			? 'bg-primary-disabled text-app-white text-opacity-90'
			: 'bg-disabled-bg text-disabled-text'
		: active
		? `bg-primary text-app-white ${
				!inactive && 'group-hover:bg-primary-light group-active:translate-y-1'
		  }`
		: `bg-app-white text-app-black ${
				!inactive && 'group-hover:bg-primary group-hover:text-app-white group-active:translate-y-1'
		  }`;

	$: shadowStyles = disabled
		? active
			? 'bg-primary-shadow-disabled'
			: 'bg-btn-shadow'
		: active
		? `bg-primary-shadow ${!inactive && 'group-hover:bg-primary-shadow-light'}`
		: `bg-btn-shadow ${!inactive && 'group-hover:bg-primary-shadow'}`;
</script>

<!-- horizontal -->
<div
	class="border-box group {center && 'mx-auto'} relative inline-flex {fullWidth
		? 'w-full'
		: 'w-min'}"
>
	<button
		on:click={handleClick}
		{disabled}
		class="relative {inactive &&
			'pointer-events-none'} my-1 mx-1 flex w-full flex-col justify-center whitespace-nowrap py-[.962rem] {!fullWidth &&
			'px-[.85rem]'} align-middle {buttonStyles} btn-base"
	>
		{#if icon && iconPlacement === 'top'}
			<span class="btn-icon" data-placement="top">
				<svelte:component this={icon} size={26} />
			</span>
		{/if}

		<span class="btn-label" data-placement={iconPlacement}>{label}</span>

		{#if icon && iconPlacement === 'bottom'}
			<span class="btn-icon btn-label" data-placement="bottom">
				<svelte:component this={icon} size={26} />
			</span>
		{/if}
	</button>
	<div class="absolute top-1 bottom-1 left-1 right-1 -z-10 {shadowStyles} btn-base translate-y-1" />
</div>

<style lang="postcss">
	.btn-base {
		@apply select-none rounded-[.25rem] outline-none transition-all ease-in-out;
	}

	.btn-icon {
		@apply m-auto inline-block justify-center stroke-[3] align-middle;
	}

	.btn-icon[data-placement='top'] {
		@apply -mt-[.3rem] pb-[.1rem];
	}

	/* .btn-icon[data-placement='bottom'] {
		@apply ml-2 mr-1;
	} */

	.btn-label[data-placement='top'] {
		@apply mx-auto -mb-[.4rem] font-test text-[.7rem] font-bold uppercase leading-3;
	}

	/* .btn-label[data-placement='bottom'] {
		@apply font-test text-xs font-bold uppercase;
	} */
</style>
