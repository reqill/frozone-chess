<script lang="ts">
	import type { ChessColorConfig, PieceType } from '$lib/types/chess.types';
	import { BlackPiece } from './black';
	import { WhitePiece } from './white';

	export let piece: Pick<PieceType, 'type' | 'side'>;
	export let colorsOverride: ChessColorConfig = {};

	const defaultColors: Required<ChessColorConfig> = {
		white: {
			main: '#ffffff',
			accent: '#000000',
		},
		black: {
			main: '#000000',
			accent: '#ffffff',
		},
	};

	$: colors = {
		white: { ...defaultColors.white, ...colorsOverride?.white },
		black: { ...defaultColors.black, ...colorsOverride?.black },
	} satisfies Required<ChessColorConfig>;

	const pieces = {
		black: BlackPiece,
		white: WhitePiece,
	};
</script>

<div class="pointer-events-none cursor-none select-none p-1">
	<svelte:component
		this={pieces[piece.side]}
		type={piece.type}
		main={colors[piece.side].main}
		accent={colors[piece.side].accent}
	/>
</div>
