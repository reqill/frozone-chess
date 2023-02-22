<script lang="ts">
	import type { HexColor, Piece } from '$lib/types/chess.types';

	import BishopB from './BishopB.svelte';
	import KingB from './KingB.svelte';
	import KnightB from './KnightB.svelte';
	import PawnB from './PawnB.svelte';
	import QueenB from './QueenB.svelte';
	import RookB from './RookB.svelte';

	export let type: Piece = 'pawn';
	export let main: HexColor = '#000000';
	export let accent: HexColor = '#ffffff';

	const types = {
		bishop: BishopB,
		king: KingB,
		knight: KnightB,
		pawn: PawnB,
		queen: QueenB,
		rook: RookB,
	};
</script>

<svelte:component this={types[type]} {main} {accent} />
