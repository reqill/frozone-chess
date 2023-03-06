<script lang="ts">
	export let width = 'w-full';
	export let label: undefined | string = undefined;
</script>

<div class="h-full {width} ">
	{#if label}
		<h5 class="pl-1 text-[.9rem] text-app-black/95 first-letter:font-test">{label}</h5>
	{/if}
	<div
		style={label ? 'height: calc(100% - 1.25rem)' : 'height: 100%;'}
		class="rounded-md border-2 border-gray-500/10 bg-app-white"
	>
		<slot />
	</div>
</div>
