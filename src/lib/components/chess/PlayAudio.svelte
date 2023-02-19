<script lang="ts">
	import { onMount } from 'svelte';
	import CAPTURE from '$lib/sounds/capture.mp3';
	import MOVE from '$lib/sounds/move-self.mp3';

	let capture: HTMLAudioElement;
	let move: HTMLAudioElement;
	export let track: 'move' | 'capture' = 'move';

	onMount(() => {
		if (track === 'move') move.play();
		if (track === 'capture') capture.play();

		setTimeout(() => {
			move.pause();
			capture.pause();
			move.currentTime = 0;
			capture.currentTime = 0;
		}, 100);
	});
</script>

<audio src={CAPTURE} preload="auto" bind:this={capture} />
<audio src={MOVE} preload="auto" bind:this={move} />
