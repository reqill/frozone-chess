<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { DEFAULT_BOARD_BOUNDARIES } from '$lib/constants/chess.constants';

	const dispatch = createEventDispatcher();

	export let xOffset = tweened(0, { duration: 100, easing: cubicOut });
	export let yOffset = tweened(0, { duration: 100, easing: cubicOut });
	export let boundaries = DEFAULT_BOARD_BOUNDARIES;
	export let canInteract = true; // TODO: decide what to dowith it

	let moving = false;

	const onMouseDown = (e: any) => {
		if (e.button !== 0 || !canInteract) return;

		moving = true;

		// center the piece on mouse
		yOffset.set(e.offsetY - (e.target.clientHeight || e.target.parentElement.clientHeight) / 2);
		xOffset.set(e.offsetX - (e.target.clientWidth || e.target.parentElement.clientWidth) / 2);

		dispatch('pieceup', { x: e.clientX, y: e.clientY });
	};

	const onMouseMove = (e: MouseEvent) => {
		if (!moving || !canInteract) return;

		if (e.clientX > boundaries.left && e.clientX < boundaries.right) {
			xOffset.update((prev) => prev + e.movementX);
		}

		if (e.clientY > boundaries.top && e.clientY < boundaries.bottom) {
			yOffset.update((prev) => prev + e.movementY);
		}

		dispatch('piecemove', { x: e.clientX, y: e.clientY });
	};

	const onMouseUp = (e: any) => {
		if (!canInteract) return;

		moving = false;

		if (e.clientX >= boundaries.left && e.clientX <= boundaries.right) {
			dispatch('piecedown');
		}

		xOffset.set(0);
		yOffset.set(0);
	};
</script>

<div
	class="absolute inset-0 origin-center"
	style={`transform: translate(${$xOffset}px, ${$yOffset}px); ${
		canInteract
			? moving
				? 'cursor: grabbing; z-index: 99'
				: 'cursor: grab; z-index: 1'
			: 'cursor: default;'
	}`}
	on:mousedown={onMouseDown}
>
	<slot />
</div>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />
