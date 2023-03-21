<script lang="ts">
	import type { MousePositionType } from '$lib/types/common.types';
	import type { Piece, PieceType, SquareInfoType } from '$lib/types/chess.types';
	import { position, chessboard, game, configuration } from '$lib/store';
	import { getSquareColor } from '$lib/utils';
	import { Draggable } from '../Draggable';
	import { ChessPiece } from '../pieces';
	import { onDestroy } from 'svelte';
	import { PromotionWindow } from '../PromotionWindow';
	import { fade } from 'svelte/transition';

	export let square: SquareInfoType;
	export let piece: PieceType | undefined = undefined;
	export let renderIndex: number;
	let gameInterval: any = undefined;

	$: promoting =
		$chessboard?.pendingPromotion && $chessboard.pendingPromotion.to.index === square.index;

	$: canCaptureHere =
		$chessboard.selectedSquare &&
		!$chessboard?.pendingPromotion &&
		$chessboard.selectedSquare.index !== square.index &&
		$position
			.get($chessboard.selectedSquare)
			?.meta.attackMoves.some((s) => s.index === square.index);

	$: isLastMove =
		($chessboard.lastMove?.from.index === square.index ||
			$chessboard.lastMove?.to.index === square.index) &&
		($game.status === 'active' || $game.status === 'paused');

	$: canMoveHere =
		$chessboard.selectedSquare &&
		!$chessboard?.pendingPromotion &&
		($game.status === 'active' || $game.status === 'pre-game') &&
		$chessboard.selectedSquare.index !== square.index &&
		$position
			.get($chessboard.selectedSquare)
			?.meta.possibleMoves.some((s) => s.index === square.index);

	$: isHovered = $chessboard.intersectedSquare?.index === square.index;
	$: isSelected = $chessboard.selectedSquare?.index === square.index;

	$: shouldShowOutline =
		$chessboard.intersectedSquare && $chessboard.isDragging ? isHovered : piece && isSelected;

	$: isHighlighted =
		$chessboard.highlightedSquares.find((s) => s.index === square.index) !== undefined;

	$: () => $game.timer.white === 0 || ($game.timer.black === 0 && clearInterval(gameInterval));

	$: squareColors = $configuration.boardSquares;
	$: highlightColor = $configuration.highlightColors;
	$: ring = $configuration.outlineColors;

	$: isBottomEdge = renderIndex > 55;
	$: isLeftEdge = renderIndex % 8 === 0;

	$: squareColor = getSquareColor(square);
	$: corner =
		(renderIndex === 0 && 'top-left') ||
		(renderIndex === 7 && 'top-right') ||
		(renderIndex === 56 && 'bottom-left') ||
		(renderIndex === 63 && 'bottom-right');

	const onPieceDown = () => {
		chessboard.stopDrag();
	};

	const onPieceUp = (e: CustomEvent<MousePositionType>) => {
		chessboard.startDrag(square, e.detail, piece);
	};

	const onPieceMove = (e: CustomEvent<MousePositionType>) => {
		chessboard.onDrag(square, e.detail);
	};

	const onSquareClick = (e: MouseEvent) => {
		if (e.button !== 0) return;

		chessboard.selectSquare(square, piece);
	};

	const onPieceRightClick = () => {
		chessboard.highlight(square);
	};

	const onPromotion = ({ detail }: CustomEvent<Piece>) => {
		chessboard.promote(detail);
	};

	onDestroy(() => {
		clearInterval(gameInterval);
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class={`square relative ${shouldShowOutline && 'z-30 ring-4 ring-inset ring-opacity-50'} ${
		ring[squareColor]
	}`}
	style={`background-color: ${
		isHighlighted ? highlightColor[squareColor] : squareColors[squareColor]
	}; 
	${corner && `border-${corner}-radius: 6%;`}`}
	on:click={onSquareClick}
	on:contextmenu|preventDefault={onPieceRightClick}
>
	{#if isBottomEdge}
		<p
			class="absolute bottom-[-1%] right-[7%] select-none text-lg font-medium"
			style={`color: ${squareColors[squareColor === 'light' ? 'dark' : 'light']}`}
		>
			{square.code[0]}
		</p>
	{/if}

	{#if isLeftEdge}
		<p
			class="absolute top-[1%] left-[4%] select-none text-lg font-medium"
			style={`color: ${squareColors[squareColor === 'light' ? 'dark' : 'light']}`}
		>
			{square.code[1]}
		</p>
	{/if}

	{#if promoting}
		<div
			in:fade={{ duration: 125 }}
			out:fade={{ duration: 125 }}
			class="absolute left-0 right-0 {$chessboard.viewSide === $game.turn
				? 'top-0'
				: 'bottom-0'} z-40"
		>
			<PromotionWindow side={$game.turn} on:promotion={onPromotion} />
		</div>
	{/if}

	{#if $configuration.showTileLabels}
		<div
			class={`absolute top-[50%] flex h-full w-full -translate-y-[48%] flex-col justify-center text-center opacity-20 `}
			style={`color: ${squareColors[squareColor === 'light' ? 'dark' : 'light']}`}
		>
			<p class="text-xl font-medium">{square.code}</p>
			<p class="text-xl font-medium">{square.index}</p>
		</div>
	{/if}

	{#if isLastMove}
		<div class="absolute inset-0 bg-amber-300 bg-opacity-30" />
	{/if}

	{#if piece}
		<Draggable
			boundaries={$chessboard.boundaries}
			on:piecedown={() => onPieceDown()}
			on:pieceup={(e) => onPieceUp(e)}
			on:piecemove={(e) => onPieceMove(e)}
		>
			<ChessPiece {piece} />
		</Draggable>
	{/if}

	<!-- TODO: adjust styling -->
	{#if canMoveHere && !canCaptureHere}
		<div class="absolute inset-0 z-20 m-[35%] rounded-full bg-zinc-700 bg-opacity-30" />
	{/if}

	<!-- TODO: adjust styling -->
	{#if canMoveHere && canCaptureHere}
		<div
			class="absolute inset-0 z-20 m-[2%] rounded-full border-[.475rem] border-solid border-zinc-700 border-opacity-30"
		/>
	{/if}
</div>

<style>
	.square {
		width: 100%;
		height: 100%;
	}
</style>
