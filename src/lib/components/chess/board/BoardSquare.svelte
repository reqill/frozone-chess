<script lang="ts">
	import { DEFAULT_BOARD_BOUNDARIES } from '$lib/constants/chess.constants';
	import type { Piece, Side, SquareInfoType } from '$lib/types/chess.types';
	import type { MousePositionType } from '$lib/types/common.types';
	import { getSquareColor } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';
	import { Draggable } from '../Draggable';
	import { ChessPiece } from '../pieces';

	const dispatch = createEventDispatcher();

	export let square: Required<SquareInfoType>;
	export let piece: Piece | undefined = undefined;
	export let side: Side | undefined = undefined;
	export let boundaries = DEFAULT_BOARD_BOUNDARIES;
	export let isHovered = false;
	export let isLegal = false;

	//TODO: move to a global state
	export let squareColors = {
		light: '#f0d9b5',
		dark: '#b58863',
	};
	export let ring = {
		// more contrast than the square
		light: 'ring-[#b58863]',
		dark: 'ring-[#f0d9b5]',
	};

	$: isBottomEdge = square?.index > 55;
	$: isLeftEdge = square?.index % 8 === 0;

	$: squareColor = getSquareColor(square);
	$: corner =
		(square?.index === 0 && 'top-left') ||
		(square?.index === 7 && 'top-right') ||
		(square?.index === 56 && 'bottom-left') ||
		(square?.index === 63 && 'bottom-right');

	const onPieceDown = (e: CustomEvent<MousePositionType>) => {
		dispatch('piecedown', { mousePos: e.detail, piece, side, square });
	};

	const onPieceUp = (e: CustomEvent<MousePositionType>) => {
		dispatch('pieceup', { mousePos: e.detail, piece, side, square });
	};

	const onPieceMove = (e: CustomEvent<MousePositionType>) => {
		dispatch('piecemove', { mousePos: e.detail, piece, side, square });
	};
</script>

<div
	class={`square relative ${isHovered && 'z-50 ring-4 ring-inset ring-opacity-50'} ${
		ring[squareColor]
	}`}
	style={`background-color: ${squareColors[squareColor]}; 
	${corner && `border-${corner}-radius: 6%;`}`}
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
	{#if piece && side}
		<Draggable
			{boundaries}
			on:piecedown={onPieceDown}
			on:pieceup={onPieceUp}
			on:piecemove={onPieceMove}
		>
			<ChessPiece {piece} {side} />
		</Draggable>
	{/if}
	{#if isLegal}
		<div class="absolute inset-0 z-20 m-[30%] rounded-full bg-zinc-700 bg-opacity-40" />
	{/if}
</div>

<style>
	.square {
		width: 100%;
		height: 100%;
	}
</style>
