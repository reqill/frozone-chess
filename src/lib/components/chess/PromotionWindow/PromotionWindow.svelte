<script lang="ts">
	import type { Side } from '$lib/types/chess.types';
	import ChessPiece from '../pieces/ChessPiece.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let side: Side;
</script>

<div class="m-[.15rem] flex flex-col rounded-md bg-app-white py-1 shadow-2xl">
	<button on:click={() => dispatch('promotion', 'knight')}>
		<ChessPiece piece={{ side, type: 'knight' }} />
	</button>
	<button on:click={() => dispatch('promotion', 'bishop')}>
		<ChessPiece piece={{ side, type: 'bishop' }} />
	</button>
	<button on:click={() => dispatch('promotion', 'rook')}>
		<ChessPiece piece={{ side, type: 'rook' }} />
	</button>
	<button on:click={() => dispatch('promotion', 'queen')}>
		<ChessPiece piece={{ side, type: 'queen' }} />
	</button>
</div>

<style lang="postcss">
	button {
		@apply mx-1 rounded-[.25rem] py-0 transition-colors ease-in-out hover:bg-app-black/10;
	}
</style>
