<script lang="ts">
	import { DEFAULT_BOARD_BOUNDARIES, SQUARES, STARTING_FEN } from '$lib/constants/chess.constants';
	import type { Piece, PiecePositionInfoType, Side, SquareInfoType } from '$lib/types/chess.types';
	import type { MousePositionType } from '$lib/types/common.types';
	import { parseFEN } from '$lib/utils';
	import { getFilteredLegalMoves } from '$lib/utils/getFilteredLegalMoves';
	import { getSquareBoundaries } from '$lib/utils/getSquareBoundaries';
	import { isLegalMove } from '$lib/utils/legalMoves';
	import { updateGameObject } from '$lib/utils/updateGameObject';
	import PlayAudio from '../PlayAudio.svelte';
	import BoardSquare from './BoardSquare.svelte';

	export let gameFEN: string = STARTING_FEN;
	let boundaries = DEFAULT_BOARD_BOUNDARIES;
	let boardSquares = SQUARES;
	let cursorPos: MousePositionType = { x: 0, y: 0 };
	let isMoving = false;
	let legalMoves: SquareInfoType[] = [];
	let startSquare: Required<SquareInfoType> | undefined = undefined;
	let selectedSquare: SquareInfoType | undefined = undefined;
	let boardEl: any;
	$: squareBoundaries = getSquareBoundaries(boundaries);

	$: intersectIndex = boardSquares.findIndex((square) => {
		const { top, left, right, bottom } = squareBoundaries[square.index];
		return (
			cursorPos.x >= left && cursorPos.x <= right && cursorPos.y >= top && cursorPos.y <= bottom
		);
	});

	let gameObject = parseFEN.toObject(gameFEN);

	$: boundaries = boardEl ? boardEl.getBoundingClientRect() : DEFAULT_BOARD_BOUNDARIES;

	type PieceEvent = {
		mousePos: MousePositionType;
		piece: Piece;
		side: Side;
		square: SquareInfoType;
	};

	const onPieceMove = (e: CustomEvent<PieceEvent>) => {
		if (!isMoving || e.detail.side !== gameObject.move) return;

		selectedSquare = undefined;

		cursorPos = e.detail.mousePos;
	};

	const onPieceUp = (e: CustomEvent<PieceEvent>) => {
		if (e.detail.side !== gameObject.move) return;

		isMoving = true;

		selectedSquare = undefined;

		legalMoves = getFilteredLegalMoves(gameObject, e.detail);

		startSquare = e.detail.square as Required<SquareInfoType>;
		cursorPos = e.detail.mousePos;
	};

	const onPieceDown = (e: CustomEvent<PieceEvent>) => {
		if (!isMoving || !startSquare || e.detail.side !== gameObject.move) return;

		selectedSquare = undefined;

		const newSquare = boardSquares.find(
			(square) => square.index === intersectIndex
		) as Required<SquareInfoType>;

		const pieceToMove = gameObject.position.find(
			(piece) => piece.square.index === startSquare?.index
		);

		if (isLegalMove(gameObject, pieceToMove, newSquare)) {
			const finalPosition = { ...pieceToMove, square: newSquare } as PiecePositionInfoType;
			gameObject = { ...updateGameObject(gameObject, pieceToMove, finalPosition) };
		}

		cursorPos = { x: 0, y: 0 };
		startSquare = undefined;
		isMoving = false;
		legalMoves = [];
	};

	const onWindowResize = () => {
		boundaries = boardEl.getBoundingClientRect();
	};

	const onMouseClick = ({
		detail: { e, pos },
	}: CustomEvent<{ e: MouseEvent; pos: PiecePositionInfoType }>) => {
		if (e.button === 0) {
			if (
				selectedSquare !== undefined &&
				legalMoves.find((legalSquare) => legalSquare.index === pos.square.index)
			) {
				const newSquare = boardSquares.find(
					(square) => square.index === pos.square.index
				) as Required<SquareInfoType>;

				const pieceToMove = gameObject.position.find(
					(piece) => piece.square.index === selectedSquare?.index
				);

				if (isLegalMove(gameObject, pieceToMove, newSquare)) {
					const finalPosition = { ...pieceToMove, square: newSquare } as PiecePositionInfoType;
					gameObject = updateGameObject(gameObject, pieceToMove, finalPosition);
				}

				selectedSquare = undefined;
				legalMoves = [];
			} else if (pos.piece !== undefined && pos.side === gameObject.move) {
				legalMoves = getFilteredLegalMoves(gameObject, pos);
				selectedSquare = pos.square;
			}
		} else if (e.button === 2) {
			legalMoves = [];
			selectedSquare = undefined;
		}
	};

	const onBoardFlip = () => {
		boardSquares = boardSquares.reverse();
	};

	const onOutsideClick = (e: MouseEvent) => {
		if (
			e.clientX < boundaries.left ||
			e.clientX > boundaries.right ||
			e.clientY > boundaries.bottom ||
			e.clientY < boundaries.top
		) {
			selectedSquare = undefined;
			intersectIndex = -1;
			legalMoves = [];
		}
	};
</script>

<div class="relative h-full select-none">
	<div
		class="grid-rows-8 m-auto grid aspect-square max-h-[70vh] max-w-[99vw] grid-cols-8 p-3"
		bind:this={boardEl}
	>
		{#key gameObject}
			{#each boardSquares as square, i (`chess-square-${square.code}`)}
				<BoardSquare
					on:squareclick={onMouseClick}
					{boundaries}
					{square}
					renderIndex={i}
					isSelected={selectedSquare?.index === square.index}
					sideMove={gameObject.move}
					isLegal={legalMoves.find((legalSquare) => legalSquare.index === square.index)
						? true
						: false}
					isCapture={gameObject.position.find(
						(piece) =>
							legalMoves.find((legalSquare) => legalSquare.index === square.index) &&
							piece.square.index === square.index
					) ||
					(square.index === gameObject.enPassant.index &&
						gameObject.position.find((pos) => pos.square.index === square.index)?.piece === 'pawn')
						? true
						: false}
					isHovered={intersectIndex === square.index}
					{...gameObject.position.find((pos) => pos.square.index === square.index)}
					on:piecedown={onPieceDown}
					on:pieceup={onPieceUp}
					on:piecemove={onPieceMove}
				/>
			{/each}
		{/key}
		{#key gameObject.position}
			<PlayAudio track="move" />
		{/key}
		{#key gameObject.position.length}
			<PlayAudio track="capture" />
		{/key}
	</div>
	<p class="text-center">
		{gameObject.move} to move
	</p>
	<div class="flex w-full flex-row justify-center gap-2 align-middle">
		<button
			on:click={() => onBoardFlip()}
			class="ml-auto rounded-md bg-zinc-300 px-4 py-1 transition-colors hover:bg-zinc-400"
		>
			board flip
		</button>
		<button
			on:click={() => (gameObject = parseFEN.toObject(gameFEN))}
			class="mr-auto rounded-md bg-zinc-300 px-4 py-1 transition-colors hover:bg-zinc-400"
		>
			reset
		</button>
	</div>
</div>

<svelte:window on:click={onOutsideClick} on:resize={onWindowResize} />
