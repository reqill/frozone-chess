<script lang="ts">
	import { position, game, chessboard } from '$lib/store';
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

<div class="relative h-full select-none">
	<div
		class="grid-rows-8 m-auto grid aspect-square max-h-[70vh] max-w-[99vw] grid-cols-8 p-3"
		bind:this={boardEl}
	>
		{#each $chessboard.squares as square, i (`chess-square-${square.code}`)}
			<BoardSquare {square} piece={$position.get(square)} renderIndex={i} {showTileCode} />
		{/each}

		{#key $position.size}
			<PlayAudio track="capture" />
		{/key}
		{#key $position}
			<PlayAudio track="move" />
		{/key}
	</div>
	<p class="text-center">
		{$game.turn} to move
	</p>
	<div class="flex w-full flex-row justify-center gap-2 align-middle">
		<!-- TODO: Create separate button components (primary, secondary, tethiary, actions, icon-btns) -->
		<button
			on:click={() => chessboard.flip()}
			class="ml-auto rounded-md bg-zinc-300 px-4 py-1 transition-colors hover:bg-zinc-400"
		>
			board flip
		</button>
		<button
			on:click={() => game.reset()}
			class="rounded-md bg-zinc-300 px-4 py-1 transition-colors hover:bg-zinc-400"
		>
			reset
		</button>
		<button
			on:click={() => (showTileCode = !showTileCode)}
			class="mr-auto rounded-md bg-zinc-300 px-4 py-1 transition-colors hover:bg-zinc-400"
		>
			{showTileCode ? 'hide labels' : 'show labels'}
		</button>
	</div>
</div>

<svelte:window
	on:click={onWindowClick}
	on:contextmenu|preventDefault
	on:resize={() => chessboard.setBoundaries(boardEl?.getBoundingClientRect())}
/>
