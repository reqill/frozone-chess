<script lang="ts">
	import { game } from '$lib/store';
	import { GameConfiguration } from '.';
	import GameInterface from './GameInterface.svelte';
	import PostGameInterace from './PostGameInterace.svelte';
</script>

<section class="h-full w-72 pb-1">
	{#if $game.status === 'setup'}
		<GameConfiguration />
	{:else if $game.status === 'active' || $game.status === 'paused' || $game.status === 'pre-game'}
		<GameInterface />
	{:else}
		<PostGameInterace />
	{/if}
</section>
