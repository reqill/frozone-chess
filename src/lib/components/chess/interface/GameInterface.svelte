<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/PrimaryButton/PrimaryButton.svelte';
	import { chessboard, game } from '$lib/store';
	import Flag from 'svelte-material-icons/Flag.svelte';
	import Restore from 'svelte-material-icons/Restore.svelte';
	import FractionOneHalf from 'svelte-material-icons/FractionOneHalf.svelte';
	import InfoBox from './InfoBox.svelte';
	import CapturedPieces from './CapturedPieces.svelte';
	import { Tooltip } from '$lib/components/Tooltip';
	import GameHistory from './GameHistory.svelte';

	$: gameTime = $game.timer?.white ? Math.floor($game.timer.white / 60000) : 0;
	$: gameIncrement = $game.increment.white ? Math.floor($game.increment.white / 1000) : 0;
	$: gameText = gameTime > 0 ? `${gameTime} | ${gameIncrement}` : '';
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
		<InfoBox label="Move history">
			<GameHistory />
		</InfoBox>
		<InfoBox label="Captured" width="w-3/5">
			<CapturedPieces side={$chessboard.viewSide === 'white' ? 'black' : 'white'} placement="top" />
			<CapturedPieces side={$chessboard.viewSide} placement="bottom" />
		</InfoBox>
	</div>
	<Tooltip title="You can only pause active game" className="w-full" disabled={isGameActive}>
		<PrimaryButton
			fullWidth
			label={$game.status === 'paused' ? 'Resume' : 'Pause'}
			active={$game.status === 'paused'}
			disabled={!isGameActive}
			on:click={() => ($game.status === 'paused' ? game.resume() : game.pause())}
		/>
	</Tooltip>
	<div class="flex w-full gap-[.15rem] pt-1  ">
		<Tooltip
			title={isGameActive ? 'Undo the move' : 'Cannot undo move before start'}
			timeToActive={isGameActive ? 750 : 0}
		>
			<PrimaryButton icon={Restore} disabled={!isGameActive} narrow />
		</Tooltip>
		<Tooltip title="Resign from the game" className="w-full" timeToActive={750}>
			<PrimaryButton icon={Flag} fullWidth />
		</Tooltip>
		<Tooltip title="Offer a draw" timeToActive={750}>
			<PrimaryButton icon={FractionOneHalf} narrow />
		</Tooltip>
	</div>
</div>
