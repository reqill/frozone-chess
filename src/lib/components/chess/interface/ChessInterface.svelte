<script lang="ts">
	import { game } from '$lib/store';
	import { GameConfiguration } from '.';
	import GameInterface from './GameInterface.svelte';
</script>

<section class="h-full w-72 pb-1">
	{#if $game.status === 'setup'}
		<GameConfiguration />
	{/if}
	{#if $game.status !== 'setup'}
		<GameInterface />
	{/if}
	<!-- <p>
		{gamemodeTimer} | {gamemodeIncremet}
	</p>
	<p>{$game.turn} to move</p>
	<p>{$captured.white.pieces.map((p) => `${p.type}, `)}</p>
	<p>{$captured.black.pieces.map((p) => `${p.type}, `)}</p>

	<p>{$game.status}</p>
	<p>white time: {parseMillisecondsToGameTime($game.timer.white)}</p>
	<p>black time: {parseMillisecondsToGameTime($game.timer.black)}</p>
	{#if $game.winner}
		<p>Winner: {$game.winner}</p>
	{/if}
	{#if $game.draw}
		<p>DRAW</p>
	{/if}
	<button on:click={() => game.setup({ increment: 0, timer: 60_000 })}>set very short timers</button
	>
	<button on:click={() => game.setup({ increment: 1_000, timer: 120_000 })}>set short timers</button
	>
	<button on:click={() => game.setup({ increment: 5_000, timer: 600_000 })}>set long timers</button>
	{#if $game.status === 'active'}
		<button on:click={() => game.pause()}> pause game </button>
	{/if}
	{#if $game.status === 'paused'}
		<button on:click={() => game.resume()}> resume game </button>
	{/if} -->
</section>
