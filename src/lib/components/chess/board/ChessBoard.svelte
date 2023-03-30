<script lang="ts">
	import { position, chessboard, game } from '$lib/store';
	import { fade } from 'svelte/transition';
	import PlayAudio from '../PlayAudio.svelte';
	import BoardSquare from './BoardSquare.svelte';

	let boardEl: any;
	let bodyEl: any;
	$: chessboard.setBoundaries(boardEl?.getBoundingClientRect());

	const onWindowClick = (e: MouseEvent) => {
		if (!isMouseInBoard(e)) {
			chessboard.clearSelection();
			chessboard.clearOverlays();
		}
	};

	const isMouseInBoard = (e: MouseEvent) => {
		return (
			e.clientX > $chessboard.boundaries.left &&
			e.clientX < $chessboard.boundaries.right &&
			e.clientY > $chessboard.boundaries.top &&
			e.clientY < $chessboard.boundaries.bottom
		);
	};

	const onMouseDown = (e: MouseEvent) => {
		if (e.button !== 2) return;

		chessboard.startArrow(e);
	};

	const onMouseUp = (e: MouseEvent) => {
		if (e.button !== 2) return;

		chessboard.stopArrow(e);
	};

	const drawArrow = (
		start: { x: number; y: number } | null,
		end: { x: number; y: number } | null
	) => {
		if (!start || !end) return;
		console.log(start, end);

		const line: HTMLElement = document.createElement('div');

		const length: number = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
		const angle: number = Math.atan2(end.y - start.y, end.x - start.x);
		line.classList.add('arrow');

		line.style.position = 'absolute';
		line.style.left = `${start.x}px`;
		line.style.top = `${start.y}px`;
		line.style.width = `${length}px`;
		line.style.height = '1px';
		line.style.zIndex = '100';
		line.style.backgroundColor = 'black';
		line.style.transform = `rotate(${angle}rad)`;

		document.body.appendChild(line);
	};

	const clearAllArrows = () => {
		const arrows = document.querySelectorAll('.arrow');
		arrows.forEach((arrow) => arrow.remove());
		return true;
	};

	$: boardEl &&
		clearAllArrows() &&
		$chessboard.arrows.forEach((arrow) => drawArrow(arrow.drawingStart, arrow.drawingEnd));
</script>

<div class="grid-rows-8 relative grid aspect-square w-full grid-cols-8" bind:this={boardEl}>
	{#if $game.status === 'paused'}
		<div in:fade={{ duration: 150 }} out:fade={{ duration: 150 }} class="pause-overlay">
			<h3>Paused</h3>
			<p>(resume to continue)</p>
		</div>
	{/if}
	{#each $chessboard.squares as square, i (`chess-square-${square.code}`)}
		<BoardSquare {square} piece={$position.get(square)} renderIndex={i} />
	{/each}
	{#key $game.status === 'setup'}
		<PlayAudio />
	{/key}
</div>

<svelte:window
	on:click={onWindowClick}
	on:contextmenu|preventDefault
	on:mousedown={onMouseDown}
	on:mouseup={onMouseUp}
	on:resize={() => chessboard.setBoundaries(boardEl?.getBoundingClientRect())}
/>

<style lang="postcss">
	.pause-overlay {
		@apply absolute inset-0 z-[99] flex flex-col justify-center rounded-[.6%] bg-clip-content align-middle backdrop-blur-sm;
	}

	.pause-overlay > h3 {
		@apply mx-auto mt-auto font-test text-7xl font-bold text-app-black;
	}

	.pause-overlay > p {
		@apply mx-auto mb-auto pt-1 font-test text-xl text-app-black;
	}
</style>
