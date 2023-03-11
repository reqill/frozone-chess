<script lang="ts">
	import { game } from '$lib/store';
	import type { Side } from '$lib/types/chess.types';
	import { parseMillisecondsToGameTime } from '$lib/utils';

	export let side: Side;
</script>

<div class="flex h-full w-full flex-row justify-between">
	<div class="flex h-full flex-row gap-2">
		<div
			class=" aspect-square h-full rounded-[.25rem] {side === 'white'
				? 'bg-app-white'
				: 'bg-app-black'}"
		>
			<!-- User Avatar -->
		</div>
		<div class="font-test">
			<h5 class="whitespace-nowrap text-base font-bold capitalize leading-[1.2rem] text-app-black">
				{side} Player
			</h5>
			<p class="text-sm leading-3 text-app-black/75">(1000)</p>
		</div>
	</div>
	{#if $game.timer[side] !== undefined}
		<div
			class="flex h-full w-[10ch] max-w-[10ch] justify-center rounded-[.25rem] align-middle {side ===
			'white'
				? 'bg-app-white'
				: 'bg-app-black'}"
		>
			<span
				class="m-auto w-[6ch] max-w-[6ch] text-center font-test text-xl font-bold {side === 'white'
					? 'text-app-black'
					: 'text-app-white'}">{parseMillisecondsToGameTime($game.timer[side])}</span
			>
		</div>
	{/if}
</div>
