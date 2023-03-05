<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/PrimaryButton/PrimaryButton.svelte';
	import { game } from '$lib/store';
	import Flag from 'svelte-material-icons/Flag.svelte';
	import Restore from 'svelte-material-icons/Restore.svelte';
	import FractionOneHalf from 'svelte-material-icons/FractionOneHalf.svelte';
	import InfoBox from './InfoBox.svelte';

	$: gameTime = $game.timer?.white ? Math.floor($game.timer.white / 60000) : 0;
	$: gameIncrement = $game.increment.white ? Math.floor($game.increment.white / 1000) : 0;
	$: gameText = gameTime > 0 ? `${gameTime} | ${gameIncrement}` : 'Unlimited';
	$: gameMode =
		$game.gamemode === 'hotseats'
			? 'hot-seats'
			: $game.gamemode === 'singleplayer'
			? 'one-player'
			: $game.gamemode;

	$: gameType = gameTime > 0 ? (gameTime <= 10 ? 'Blitz' : 'Normal') : 'Unlimited';

	$: isGameActive = $game.status === 'paused' || $game.status === 'active';
</script>

<div class="flex h-full w-full flex-col pt-[2.65rem] pb-11">
	<PrimaryButton fullWidth label="{gameType} {gameText}" info={gameMode} active inactive />

	<div class="flex grow gap-3 px-1 py-3">
		<InfoBox label="Move history" />
		<InfoBox label="Captured" width="w-3/5" />
	</div>
	<PrimaryButton
		fullWidth
		label={$game.status === 'paused' ? 'Resume' : 'Pause'}
		active={$game.status === 'paused'}
		disabled={!isGameActive}
		on:click={() => ($game.status === 'paused' ? game.resume() : game.pause())}
	/>
	<div class="flex w-full gap-[.15rem] pt-1  ">
		<PrimaryButton icon={Restore} disabled={!isGameActive} narrow />
		<PrimaryButton icon={Flag} fullWidth />
		<PrimaryButton icon={FractionOneHalf} narrow />
	</div>
</div>
