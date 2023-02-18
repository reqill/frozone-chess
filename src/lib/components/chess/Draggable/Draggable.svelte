<script lang="ts">
	export let xOffset = 0;
	export let yOffset = 0;
	export let boundaries = {
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	};

	let moving = false;

	const onMouseDown = (e: any) => {
		moving = true;

		yOffset = e.offsetY - (e.target.clientHeight || e.target.parentElement.clientHeight) / 2;
		xOffset = e.offsetX - (e.target.clientWidth || e.target.parentElement.clientWidth) / 2;
	};

	const onMouseMove = (e: MouseEvent) => {
		if (!moving) return;

		if (e.clientX > boundaries.left && e.clientX < boundaries.right) {
			xOffset += e.movementX;
		}

		if (e.clientY > boundaries.top && e.clientY < boundaries.bottom) {
			yOffset += e.movementY;
		}
	};

	const onMouseUp = () => {
		moving = false;
		xOffset = 0;
		yOffset = 0;
	};
</script>

<div
	class="absolute inset-0 origin-center"
	style={`transform: translate(${xOffset}px, ${yOffset}px); ${
		moving ? 'cursor: grabbing; z-index: 99' : 'cursor: grab; z-index: 1'
	}`}
	on:mousedown={onMouseDown}
	on:dragstart={onMouseDown}
>
	<slot />
</div>

<svelte:window
	on:mouseup={onMouseUp}
	on:mousemove={onMouseMove}
	on:dragend={onMouseUp}
	on:drag={onMouseMove}
/>
