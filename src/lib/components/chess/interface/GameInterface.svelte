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
	import GameType from '../GameType.svelte';

	$: isGameActive = $game.status === 'paused' || $game.status === 'active';
</script>

<div class="flex h-full max-h-max w-full flex-col gap-2">
	<GameType />

	<div class="flex grow gap-3 px-1">
		<InfoBox label="Move history">
			<GameHistory />
		</InfoBox>
		<InfoBox label="Captured" width="w-3/5">
			<CapturedPieces side={$chessboard.viewSide === 'white' ? 'black' : 'white'} placement="top" />
			<CapturedPieces side={$chessboard.viewSide} placement="bottom" />
		</InfoBox>
	</div>
	<div>
		<h5 class="mt-3 pl-[.45rem] pb-[.2rem] text-[.9rem] text-app-black/95 first-letter:font-test">
			Type your move
		</h5>
		<div class="mx-1 rounded-[.4rem] border-2 border-gray-500/10 bg-app-white">
			<p class="ml-2 mb-[.15rem] py-1 font-test text-app-black/20">Not available yet</p>
		</div>
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
	<div class="flex w-full gap-[.15rem]">
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
