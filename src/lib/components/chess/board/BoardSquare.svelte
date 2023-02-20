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
	export let isCapture = false;
	export let renderIndex = -1;
	export let sideMove: Side | undefined = undefined;
	export let isSelected = false;

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

	$: isBottomEdge = renderIndex > 55;
	$: isLeftEdge = renderIndex % 8 === 0;

	$: squareColor = getSquareColor(square);
	$: corner =
		(renderIndex === 0 && 'top-left') ||
		(renderIndex === 7 && 'top-right') ||
		(renderIndex === 56 && 'bottom-left') ||
		(renderIndex === 63 && 'bottom-right');

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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class={`square relative ${
		(isHovered || isSelected) && 'z-50 ring-4 ring-inset ring-opacity-50'
	} ${ring[squareColor]}`}
	style={`background-color: ${squareColors[squareColor]}; 
	${corner && `border-${corner}-radius: 6%;`}`}
	on:click={(e) => dispatch('squareclick', { e, pos: { piece, side, square } })}
	on:contextmenu|preventDefault={(e) =>
		dispatch('squareclick', { e, pos: { piece, side, square } })}
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
			canInteract={sideMove && side === sideMove}
			on:piecedown={onPieceDown}
			on:pieceup={onPieceUp}
			on:piecemove={onPieceMove}
		>
			<ChessPiece {piece} {side} />
		</Draggable>
	{/if}
	{#if isLegal && !isCapture}
		<div class="absolute inset-0 z-20 m-[35%] rounded-full bg-zinc-700 bg-opacity-30" />
	{/if}
	{#if isLegal && isCapture}
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
