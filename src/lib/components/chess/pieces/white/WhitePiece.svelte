<script lang="ts">
	import type { HexColor, Piece } from '$lib/types/chess.types';

	import BishopW from './BishopW.svelte';
	import KingW from './KingW.svelte';
	import KnightW from './KnightW.svelte';
	import PawnW from './PawnW.svelte';
	import QueenW from './QueenW.svelte';
	import RookW from './RookW.svelte';

	export let piece: Piece = 'pawn';
	export let main: HexColor = '#ffffff';
	export let accent: HexColor = '#000000';

	const pieces = {
		bishop: BishopW,
		king: KingW,
		knight: KnightW,
		pawn: PawnW,
		queen: QueenW,
		rook: RookW,
	};
</script>

<svelte:component this={pieces[piece]} {main} {accent} />
