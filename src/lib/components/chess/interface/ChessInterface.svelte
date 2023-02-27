<script lang="ts">
	import { game, captured } from '$lib/store';
	import { parseMillisecondsToGameTime } from '$lib/utils';

	$: gamemodeTimer = Math.floor($game.timer.starting / 60000);
	$: gamemodeIncremet = (($game.increment.white % 60000) / 1000).toFixed(0);
</script>

<section class="min-w-[12rem] max-w-[20rem] bg-gray-500">
	<p>
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
</section>
{#if $game.status === 'active'}
	<button on:click={() => game.pause()}> pause game </button>
{/if}
{#if $game.status === 'paused'}
	<button on:click={() => game.resume()}> resume game </button>
{/if}
