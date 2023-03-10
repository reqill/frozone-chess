<script lang="ts">
	import { fade } from 'svelte/transition';

	export let title = '';
	// TODO: support all positions in TooltipPlacement (calculation for top/bottom)
	// export let placement: 'top' = 'top';
	export let style = '';
	export let className = '';
	export let disabled = false;
	export let distance = 3;
	export let timeToActive = 0;

	let open = false;
	let anchorEl: HTMLDivElement | null = null;
	let tooltipEl: HTMLSpanElement | null = null;

	$: childBoundaries = anchorEl?.getBoundingClientRect();
	$: tooltipBoundaries = tooltipEl?.getBoundingClientRect();

	// eslint-disable-next-line no-undef
	let timer: undefined | NodeJS.Timeout;

	const onMouseEnter = (e: MouseEvent) => {
		timer = setTimeout(() => {
			open = true;
		}, timeToActive);
	};

	const onMouseLeave = (e: MouseEvent) => {
		timer && clearTimeout(timer);
		open = false;
	};
</script>

{#if title && open && !disabled && childBoundaries}
	<span
		in:fade={{ duration: 125 }}
		out:fade={{ duration: 125 }}
		style="top: 0; left: 0; transform: translate(calc(-50% + {childBoundaries.left +
			childBoundaries.width / 2}px), calc(-50% + {childBoundaries.top -
			(tooltipBoundaries?.height || 0) / 2 -
			distance}px));"
		bind:this={tooltipEl}>{title}</span
	>
{/if}

<div
	on:mouseenter={onMouseEnter}
	on:mouseleave={onMouseLeave}
	{style}
	class="relative {className}"
	bind:this={anchorEl}
>
	<slot />
</div>

<style lang="postcss">
	span {
		@apply absolute z-50 origin-center select-none rounded-[.25rem] bg-app-black/80 py-[.15rem] px-3 text-sm text-app-white;
	}

	span::after {
		content: '';
		@apply absolute bottom-0 left-1/2 box-border -translate-x-1/2 translate-y-full border-[6px] border-solid border-transparent border-t-app-black/80;
	}
</style>
