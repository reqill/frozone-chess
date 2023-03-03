<script lang="ts">
	import { position, chessboard } from '$lib/store';
	import PlayAudio from '../PlayAudio.svelte';
	import BoardSquare from './BoardSquare.svelte';

	let boardEl: any;
	$: chessboard.setBoundaries(boardEl?.getBoundingClientRect());
	let showTileCode = false;

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

<div class="grid-rows-8 grid aspect-square w-full grid-cols-8" bind:this={boardEl}>
	{#each $chessboard.squares as square, i (`chess-square-${square.code}`)}
		<BoardSquare {square} piece={$position.get(square)} renderIndex={i} {showTileCode} />
	{/each}
	<PlayAudio />
</div>

<svelte:window
	on:click={onWindowClick}
	on:contextmenu|preventDefault
	on:resize={() => chessboard.setBoundaries(boardEl?.getBoundingClientRect())}
/>
