<script lang="ts">
	import CAPTURE from '$lib/sounds/capture.mp3';
	import MOVE from '$lib/sounds/move-self.mp3';
	import { game } from '$lib/store';
	import { onMount } from 'svelte';

	let capture: HTMLAudioElement;
	let move: HTMLAudioElement;

	onMount(() => {
		game.bindAudioPlayer('capture', capture);
		game.bindAudioPlayer('move', move);
	});
</script>

<audio src={CAPTURE} preload="auto" bind:this={capture} />
<audio src={MOVE} preload="auto" bind:this={move} />
<!-- TODO: define other sounds -->
