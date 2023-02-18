<script lang="ts">
	import { SQUARES, STARTING_FEN } from '$lib/constants/chess.constants';
	import { parseFEN } from '$lib/utils';
	import BoardSquare from './BoardSquare.svelte';

	export let gameFEN: string = STARTING_FEN;
	let boundaries = {
		top: 0,
		left: 0,
		right: 1920,
		bottom: 1080
	};

	const gameObject = parseFEN.toObject(gameFEN);

	const onMouseEnter = (e: any) => {
		const { top, left, right, bottom } = e.target.getBoundingClientRect();
		boundaries = {
			top,
			left,
			right,
			bottom
		};
	};
</script>

<div class="relative h-full">
	<div
		class="grid-rows-8 m-auto grid aspect-square max-h-[85vh] max-w-[99vw] grid-cols-8 p-3"
		on:mouseenter={onMouseEnter}
	>
		{#each SQUARES as square (`chess-square-${square.code}`)}
			<BoardSquare
				{boundaries}
				{square}
				{...gameObject.position.find((pos) => pos.square.index === square.index)}
			/>
		{/each}
	</div>
</div>
