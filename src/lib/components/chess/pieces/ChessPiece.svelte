<script lang="ts">
	import { configuration } from '$lib/store';
	import type { PieceType } from '$lib/types/chess.types';
	import { BlackPiece } from './black';
	import { WhitePiece } from './white';

	export let piece: Pick<PieceType, 'type' | 'side'>;

	const pieces = {
		black: BlackPiece,
		white: WhitePiece,
	};

	$: size =
		$configuration.pieceSize === 'large'
			? 'p-[.15rem]'
			: $configuration.pieceSize === 'medium'
			? 'p-1'
			: 'p-[.4rem]';
</script>

<div class="pointer-events-none cursor-none select-none {size}">
	<svelte:component
		this={pieces[piece.side]}
		type={piece.type}
		main={$configuration.pieceColors[piece.side].main}
		accent={$configuration.pieceColors[piece.side].accent}
	/>
</div>
