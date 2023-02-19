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
	let cursorPos: MousePositionType = { x: 0, y: 0 };
	let isMoving = false;
	let legalMoves: SquareInfoType[] = [];
	let startSquare: Required<SquareInfoType> | undefined = undefined;
	let selectedSquare: SquareInfoType | undefined = undefined;
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

		selectedSquare = undefined;

		cursorPos = e.detail.mousePos;
	};

	const onPieceUp = (e: CustomEvent<PieceEvent>) => {
		isMoving = true;

		selectedSquare = undefined;

		legalMoves = getFilteredLegalMoves(gameObject, e.detail);

		startSquare = e.detail.square as Required<SquareInfoType>;
		cursorPos = e.detail.mousePos;
	};

	const onPieceDown = (e: CustomEvent<PieceEvent>) => {
		if (!isMoving || !startSquare) return;

		selectedSquare = undefined;

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

	const onMouseClick = ({
		detail: { e, pos },
	}: CustomEvent<{ e: MouseEvent; pos: PiecePositionInfoType }>) => {
		if (e.button === 0) {
			if (
				selectedSquare !== undefined &&
				legalMoves.find((legalSquare) => legalSquare.index === pos.square.index)
			) {
				const newSquare = SQUARES.find(
					(square) => square.index === pos.square.index
				) as Required<SquareInfoType>;

				const pieceToMove = gameObject.position.find(
					(piece) => piece.square.index === selectedSquare?.index
				);

				console.log(pieceToMove, newSquare);

				if (isLegalMove(gameObject, pieceToMove, newSquare)) {
					const finalPosition = { ...pieceToMove, square: newSquare } as PiecePositionInfoType;
					gameObject = updateGameObject(gameObject, pieceToMove, finalPosition);
				}

				selectedSquare = undefined;
				legalMoves = [];
			} else if (pos.piece !== undefined) {
				console.log('click LMB');
				legalMoves = getFilteredLegalMoves(gameObject, pos);
				selectedSquare = pos.square;
			}
		} else if (e.button === 2) {
			selectedSquare = undefined;
			console.log('click RMB');
		}
	};
</script>

<div class="relative h-full">
	<div
		class="grid-rows-8 m-auto grid aspect-square max-h-[85vh] max-w-[99vw] grid-cols-8 p-3"
		on:mouseenter={onMouseEnter}
	>
		{#key gameObject}
			{#each SQUARES as square, i (`chess-square-${square.code}`)}
				<BoardSquare
					on:squareclick={onMouseClick}
					{boundaries}
					{square}
					renderIndex={i}
					isSelected={selectedSquare?.index === square.index}
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
</div>
