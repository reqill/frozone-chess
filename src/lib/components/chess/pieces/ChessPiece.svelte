<script lang="ts">
	import type { ChessColorConfig, Piece, Side } from '$lib/types/chess.types';
	import BlackPiece from './black/BlackPiece.svelte';
	import WhitePiece from './white/WhitePiece.svelte';

	export let piece: Piece;
	export let side: Side;
	export let colorsOverride: ChessColorConfig = {};

	const defaultColors: Required<ChessColorConfig> = {
		white: {
			main: '#ffffff',
			accent: '#000000'
		},
		black: {
			main: '#000000',
			accent: '#ffffff'
		}
	};

	$: colors = {
		white: { ...defaultColors.white, ...colorsOverride?.white },
		black: { ...defaultColors.black, ...colorsOverride?.black }
	} satisfies Required<ChessColorConfig>;

	const pieces = {
		black: BlackPiece,
		white: WhitePiece
	};
</script>

<svelte:component
	this={pieces[side]}
	{piece}
	main={colors[side].main}
	accent={colors[side].accent}
/>
