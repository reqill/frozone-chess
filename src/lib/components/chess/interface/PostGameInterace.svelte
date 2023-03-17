<script lang="ts">
	import PrimaryButton from '$lib/components/buttons/PrimaryButton/PrimaryButton.svelte';
	import { chessboard, game } from '$lib/store';

	import ChevronDoubleLeft from 'svelte-material-icons/ChevronDoubleLeft.svelte';
	import ChevronDoubleRight from 'svelte-material-icons/ChevronDoubleRight.svelte';
	import ChevronLeft from 'svelte-material-icons/ChevronLeft.svelte';
	import ChevronRight from 'svelte-material-icons/ChevronRight.svelte';

	import InfoBox from './InfoBox.svelte';
	import CapturedPieces from './CapturedPieces.svelte';
	import { Tooltip } from '$lib/components/Tooltip';
	import GameHistory from './GameHistory.svelte';
	import GameType from '../GameType.svelte';
</script>

<div class="flex h-full max-h-max w-full flex-col">
	<GameType />

	<div class="mb-auto flex grow gap-3 px-1 py-2">
		<InfoBox label="Move history">
			<GameHistory />
		</InfoBox>
		<InfoBox label="Captured" width="w-3/5">
			<CapturedPieces side={$chessboard.viewSide === 'white' ? 'black' : 'white'} placement="top" />
			<CapturedPieces side={$chessboard.viewSide} placement="bottom" />
		</InfoBox>
	</div>
	<div class="flex w-full flex-col gap-1">
		<div class="mb-2 flex w-full pt-2 ">
			<Tooltip title="Skip to the start" timeToActive={750}>
				<PrimaryButton icon={ChevronDoubleLeft} narrow disabled />
			</Tooltip>
			<Tooltip title="Previous move" className="w-full" timeToActive={750}>
				<PrimaryButton icon={ChevronLeft} narrow disabled />
			</Tooltip>
			<Tooltip title="Next move" timeToActive={750}>
				<PrimaryButton icon={ChevronRight} narrow disabled />
			</Tooltip>
			<Tooltip title="Skip to the end" timeToActive={750}>
				<PrimaryButton icon={ChevronDoubleRight} narrow disabled />
			</Tooltip>
		</div>
		<PrimaryButton
			fullWidth
			label={$game.draw ? "It's a draw" : `${$game.winner} won!`}
			info={$game.draw ? ($game.status === 'stalemate' ? 'stalemate' : undefined) : $game.status}
			active
			inactive
		/>
		<PrimaryButton fullWidth label="Rematch" />
	</div>
</div>
