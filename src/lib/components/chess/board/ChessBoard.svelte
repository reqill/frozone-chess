<script lang="ts">
	import { position, game, chessboard } from '$lib/store';
	import type { PieceEvent, PiecePositionInfoType } from '$lib/types/chess.types';
	import PlayAudio from '../PlayAudio.svelte';
	import BoardSquare from './BoardSquare.svelte';

	let boardEl: any;
	$: () => chessboard.setBoundaries(boardEl?.getBoundingClientRect());

	const onPieceMove = (e: CustomEvent<PieceEvent>) => {
		// if (!isMoving || e.detail.side !== gameObject.move) return;
		// selectedSquare = undefined;
		// cursorPos = e.detail.mousePos;
	};

	const onPieceUp = (e: CustomEvent<PieceEvent>) => {
		// if (e.detail.side !== gameObject.move) return;
		// isMoving = true;
		// selectedSquare = undefined;
		// legalMoves = getFilteredLegalMoves(gameObject, e.detail);
		// startSquare = e.detail.square as Required<SquareInfoType>;
		// cursorPos = e.detail.mousePos;
	};

	const onPieceDown = (e: CustomEvent<PieceEvent>) => {
		// if (!isMoving || !startSquare || e.detail.side !== gameObject.move) return;
		// selectedSquare = undefined;
		// const newSquare = boardSquares.find(
		// 	(square) => square.index === intersectIndex
		// ) as Required<SquareInfoType>;
		// const pieceToMove = gameObject.position.find(
		// 	(piece) => piece.square.index === startSquare?.index
		// );
		// if (isLegalMove(gameObject, pieceToMove, newSquare)) {
		// 	const finalPosition = { ...pieceToMove, square: newSquare } as PiecePositionInfoType;
		// 	gameObject = { ...updateGameObject(gameObject, pieceToMove, finalPosition) };
		// }
		// cursorPos = { x: 0, y: 0 };
		// startSquare = undefined;
		// isMoving = false;
		// legalMoves = [];
	};

	const onMouseClick = ({
		detail: { e, pos },
	}: CustomEvent<{ e: MouseEvent; pos: PiecePositionInfoType }>) => {
		// if (e.button === 0) {
		// 	if (
		// 		selectedSquare !== undefined &&
		// 		legalMoves.find((legalSquare) => legalSquare.index === pos.square.index)
		// 	) {
		// 		const newSquare = boardSquares.find(
		// 			(square) => square.index === pos.square.index
		// 		) as Required<SquareInfoType>;
		// 		const pieceToMove = gameObject.position.find(
		// 			(piece) => piece.square.index === selectedSquare?.index
		// 		);
		// 		if (isLegalMove(gameObject, pieceToMove, newSquare)) {
		// 			const finalPosition = { ...pieceToMove, square: newSquare } as PiecePositionInfoType;
		// 			gameObject = updateGameObject(gameObject, pieceToMove, finalPosition);
		// 		}
		// 		selectedSquare = undefined;
		// 		legalMoves = [];
		// 	} else if (pos.piece !== undefined && pos.side === gameObject.move) {
		// 		legalMoves = getFilteredLegalMoves(gameObject, pos);
		// 		selectedSquare = pos.square;
		// 	}
		// } else if (e.button === 2) {
		// 	legalMoves = [];
		// 	selectedSquare = undefined;
		// }
	};

	const onOutsideClick = (e: MouseEvent) => {
		// if (
		// 	e.clientX < boundaries.left ||
		// 	e.clientX > boundaries.right ||
		// 	e.clientY > boundaries.bottom ||
		// 	e.clientY < boundaries.top
		// ) {
		// 	selectedSquare = undefined;
		// 	intersectIndex = -1;
		// 	legalMoves = [];
		// }
	};
</script>

<div class="relative h-full select-none">
	<div
		class="grid-rows-8 m-auto grid aspect-square max-h-[70vh] max-w-[99vw] grid-cols-8 p-3"
		bind:this={boardEl}
	>
		{#each $chessboard.squares as square, i (`chess-square-${square.code}`)}
			<BoardSquare
				on:squareclick={onMouseClick}
				on:piecedown={onPieceDown}
				on:pieceup={onPieceUp}
				on:piecemove={onPieceMove}
				{square}
				piece={$position.get(square)}
				renderIndex={i}
			/>
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
		<!-- Create separate button components (primary, secondary, tethiary, actions, icon-btns) -->
		<button
			on:click={() => chessboard.flip()}
			class="ml-auto rounded-md bg-zinc-300 px-4 py-1 transition-colors hover:bg-zinc-400"
		>
			board flip
		</button>
		<button
			on:click={() => game.reset()}
			class="mr-auto rounded-md bg-zinc-300 px-4 py-1 transition-colors hover:bg-zinc-400"
		>
			reset
		</button>
	</div>
</div>

<svelte:window
	on:click={onOutsideClick}
	on:resize={() => chessboard.setBoundaries(boardEl?.getBoundingClientRect())}
/>
