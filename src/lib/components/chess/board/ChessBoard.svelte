<script lang="ts">
	import { position, chessboard, game } from '$lib/store';
	import { fade } from 'svelte/transition';
	import PlayAudio from '../PlayAudio.svelte';
	import BoardSquare from './BoardSquare.svelte';

	let boardEl: any;
	$: chessboard.setBoundaries(boardEl?.getBoundingClientRect());

	const onWindowClick = (e: MouseEvent) => {
		if (
			e.clientX < $chessboard.boundaries.left ||
			e.clientX > $chessboard.boundaries.right ||
			e.clientY < $chessboard.boundaries.top ||
			e.clientY > $chessboard.boundaries.bottom
		) {
			chessboard.clearSelection();
			chessboard.clearOverlays();
		}
	};
</script>

<div class="grid-rows-8 relative grid aspect-square w-full grid-cols-8" bind:this={boardEl}>
	{#if $game.status === 'paused'}
		<div in:fade={{ duration: 150 }} out:fade={{ duration: 150 }} class="pause-overlay">
			<h3>Paused</h3>
			<p>(resume to continue)</p>
		</div>
	{/if}
	{#each $chessboard.squares as square, i (`chess-square-${square.code}`)}
		<BoardSquare {square} piece={$position.get(square)} renderIndex={i} />
	{/each}
	{#key $game.status === 'setup'}
		<PlayAudio />
	{/key}
</div>

<svelte:window
	on:click={onWindowClick}
	on:contextmenu|preventDefault
	on:resize={() => chessboard.setBoundaries(boardEl?.getBoundingClientRect())}
/>

<style lang="postcss">
	.pause-overlay {
		@apply absolute inset-0 z-[99] flex flex-col justify-center rounded-[.6%] bg-clip-content align-middle backdrop-blur-sm;
	}

	.pause-overlay > h3 {
		@apply mx-auto mt-auto font-test text-7xl font-bold text-app-black;
	}

	.pause-overlay > p {
		@apply mx-auto mb-auto pt-1 font-test text-xl text-app-black;
	}
</style>
