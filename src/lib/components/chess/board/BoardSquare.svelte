<script lang="ts">
	import type { Piece, Side, SquareInfoType } from '$lib/types/chess.types';
	import { getSquareColor } from '$lib/utils';
	import { Draggable } from '../Draggable';
	import { ChessPiece } from '../pieces';

	export let square: SquareInfoType;
	export let piece: Piece | undefined = undefined;
	export let side: Side | undefined = undefined;
	export let boundaries = {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	};
	let hovered = false;

	//TODO: move to a global state
	export let squareColors = {
		light: '#f0d9b5',
		dark: '#b58863'
	};

	$: squareColor = getSquareColor(square);
	$: corner =
		(square.index === 0 && 'top-left') ||
		(square.index === 7 && 'top-right') ||
		(square.index === 56 && 'bottom-left') ||
		(square.index === 63 && 'bottom-right');

	const onMouseEnter = () => {
		hovered = true;
	};

	const onMouseLeave = () => {
		hovered = false;
	};
</script>

<div
	class="square relative "
	style={`background-color: ${squareColors[squareColor]}; 
	${corner && `border-${corner}-radius: 6%;`}`}
	on:mouseenter={onMouseEnter}
	on:mouseleave={onMouseLeave}
>
	{#if piece && side}
		<Draggable {boundaries}>
			<ChessPiece {piece} {side} />
		</Draggable>
	{/if}
</div>

<style>
	.square {
		width: 100%;
		height: 100%;
	}
</style>
