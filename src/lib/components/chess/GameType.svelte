<script lang="ts">
	import { PrimaryButton } from '../buttons';
	import { game } from '$lib/store';
	import { getGameType } from '$lib/utils';

	$: gameTime = $game.timer?.starting ? Math.floor($game.timer.starting / 60000) : 0;
	$: gameIncrement = $game.increment.white ? Math.floor($game.increment.white / 1000) : 0;
	$: gameMode =
		$game.gamemode === 'hotseats'
			? 'hot-seats'
			: $game.gamemode === 'singleplayer'
			? 'one-player'
			: $game.gamemode;

	$: gameType = getGameType(gameTime, gameIncrement);
</script>

<PrimaryButton fullWidth label={gameType} info={gameMode} active inactive />
