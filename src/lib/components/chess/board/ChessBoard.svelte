<script lang="ts">
	import { DEFAULT_BOARD_BOUNDARIES, SQUARES, STARTING_FEN } from '$lib/constants/chess.constants';
	import type { Piece, PiecePositionInfoType, Side, SquareInfoType } from '$lib/types/chess.types';
	import type { MousePositionType } from '$lib/types/common.types';
	import { getLegalMoves, parseFEN } from '$lib/utils';
	import { getSquareBoundaries } from '$lib/utils/getSquareBoundaries';
	import { isLegalMove } from '$lib/utils/legalMoves';
	import { updateGameObject } from '$lib/utils/updateGameObject';
	import BoardSquare from './BoardSquare.svelte';

	export let gameFEN: string = STARTING_FEN;
	let boundaries = DEFAULT_BOARD_BOUNDARIES;
	let cursorPos: MousePositionType = { x: 0, y: 0 };
	let isMoving = false;
	let legalMoves: SquareInfoType[] = [];
	let startSquare: Required<SquareInfoType> | undefined = undefined;
	$: squareBoundaries = getSquareBoundaries(boundaries);

	$: intersectIndex = SQUARES.findIndex((square) => {
		const { top, left, right, bottom } = squareBoundaries[square.index];
		return (
			cursorPos.x >= left && cursorPos.x <= right && cursorPos.y >= top && cursorPos.y <= bottom
		);
	});

	let gameObject = parseFEN.toObject(gameFEN);

	const onMouseEnter = (e: any) => {
		const { top, left, right, bottom } = e.target.getBoundingClientRect();
		boundaries = {
			top,
			left,
			right,
			bottom,
		};
	};

	type PieceEvent = {
		mousePos: MousePositionType;
		piece: Piece;
		side: Side;
		square: SquareInfoType;
	};

	const onPieceMove = (e: CustomEvent<PieceEvent>) => {
		if (!isMoving) return;

		cursorPos = e.detail.mousePos;
	};

	const onPieceUp = (e: CustomEvent<PieceEvent>) => {
		isMoving = true;

		legalMoves = getLegalMoves(gameObject, e.detail);

		startSquare = e.detail.square as Required<SquareInfoType>;
		cursorPos = e.detail.mousePos;
	};

	const onPieceDown = (e: CustomEvent<PieceEvent>) => {
		if (!isMoving || !startSquare) return;

		const newSquare = SQUARES.find(
			(square) => square.index === intersectIndex
		) as Required<SquareInfoType>;

		const pieceToMove = gameObject.position.find(
			(piece) => piece.square.index === startSquare?.index
		);

		if (isLegalMove(gameObject, pieceToMove, newSquare)) {
			const finalPosition = { ...pieceToMove, square: newSquare } as PiecePositionInfoType;
			gameObject = updateGameObject(gameObject, pieceToMove, finalPosition);
		}

		cursorPos = { x: 0, y: 0 };
		startSquare = undefined;
		isMoving = false;
		legalMoves = [];
	};
</script>

<div class="relative h-full">
	<div
		class="grid-rows-8 m-auto grid aspect-square max-h-[85vh] max-w-[99vw] grid-cols-8 p-3"
		on:mouseenter={onMouseEnter}
		on:contextmenu|preventDefault
	>
		{#key gameObject}
			{#each SQUARES as square (`chess-square-${square.code}`)}
				<BoardSquare
					{boundaries}
					{square}
					isLegal={legalMoves.find((legalSquare) => legalSquare.index === square.index)
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
	</div>
</div>
