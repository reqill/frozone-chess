<script lang="ts">
	import { captured } from '$lib/store';
	import type { Side } from '$lib/types/chess.types';
	import ChessPiece from '../pieces/ChessPiece.svelte';

	export let side: Side;
	export let placement: 'top' | 'bottom';

	$: captururedPieces = $captured[side].pieces.sort((a, b) => a.meta.value - b.meta.value);
	$: score = $captured[side].value;
	$: enemyScore = $captured[side === 'white' ? 'black' : 'white'].value;
	$: scoreDiff = score - enemyScore;
</script>

<div class="flex h-1/2 max-h-[50%] w-full {placement === 'top' ? 'flex-col' : 'flex-col-reverse'}">
	<div class="opacity-95">
		{#each captururedPieces as piece, i}
			<div
				class="flex w-full {i % 2 === 0 ? 'justify-start' : 'justify-end'}"
				style="z-index: {placement === 'top' ? i : 50 - i};"
			>
				<div class="relative aspect-square w-3/4 {placement === 'top' ? '-mb-[62%]' : '-mt-[62%]'}">
					<ChessPiece {piece} overridePadding="p-0" />
				</div>
			</div>
		{/each}
	</div>

	{#if scoreDiff > 0}
		<p
			class="{placement === 'top'
				? 'pt-[3.3rem]'
				: 'pb-[3.3rem]'} pr-1 text-center font-test font-bold text-app-black"
		>
			+{scoreDiff}
		</p>
	{/if}
</div>
