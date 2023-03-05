<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let label: string | undefined = undefined;
	export let info: undefined | string = undefined;
	export let icon: SVGElement | any | undefined = undefined;
	export let iconPlacement: 'left' | 'right' = 'left';
	export let narrow = false;

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
				!inactive &&
				'group-hover:bg-primary-light group-active:translate-y-1 group-active:bg-primary-light'
		  }`
		: `bg-app-white text-app-black ${
				!inactive &&
				'group-hover:bg-primary group-hover:text-app-white group-active:translate-y-1 group-active:bg-primary group-active:text-app-white'
		  }`;

	$: shadowStyles = disabled
		? active
			? 'bg-primary-shadow-disabled'
			: 'bg-btn-shadow'
		: active
		? `bg-primary-shadow ${
				!inactive && 'group-hover:bg-primary-shadow-light group-active:bg-primary-shadow-light'
		  }`
		: `bg-btn-shadow ${
				!inactive && 'group-hover:bg-primary-shadow group-active:bg-primary-shadow'
		  }`;
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
		class="relative {inactive && 'pointer-events-none'} my-1 mx-1 inline-flex {label
			? 'py-[.85rem] '
			: 'py-[.975rem] '} w-full justify-center whitespace-nowrap
			 {narrow ? 'px-[1.15rem]' : 'px-7'} align-middle {buttonStyles} btn-base"
	>
		{#if icon && iconPlacement === 'left'}
			<span
				class="{info && '-mt-[.35rem] mb-[.35rem]'} {label && 'mr-2 -ml-1'} btn-icon btn-label"
				data-placement="left"
			>
				<svelte:component this={icon} size={28} />
			</span>
		{/if}

		{#if label}
			<span class="btn-label {info && '-mt-[.35rem] mb-[.35rem]'}">{label}</span>
		{/if}

		{#if icon && iconPlacement === 'right'}
			<span
				class=" {info && '-mt-[.35rem] mb-[.35rem]'} {label && 'ml-2 mr-1'} btn-icon btn-label"
				data-placement="right"
			>
				<svelte:component this={icon} size={28} />
			</span>
		{/if}
		{#if info}
			<span
				class="absolute right-0 left-0 bottom-[.45rem] text-center font-test text-[.7rem] font-bold uppercase leading-3"
			>
				{info}
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

	.btn-label {
		@apply font-test text-2xl font-bold;
	}
</style>
