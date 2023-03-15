<script lang="ts">
	import { ChessBoard } from '$lib/components/chess';
	import { ConfigurationMenu } from '$lib/components/chess/ConfiguarionMenu';
	import ChessInterface from '$lib/components/chess/interface/ChessInterface.svelte';
	import { MatchScoreBar } from '$lib/components/chess/MatchScoreBar';
	import { PlayerInfoBar } from '$lib/components/chess/PlayerInfoBar';
	import { Dialog } from '$lib/components/Dialog';
	import { chessboard } from '$lib/store';
	import Cog from 'svelte-material-icons/Cog.svelte';

	let openConfiguration = false;
</script>

<div class="main-col">
	<div class="narrow-row">
		<div class="narrow-corner" />
		<div class="player-info max-w-[calc(100vh_-_10rem)]">
			<PlayerInfoBar side={$chessboard.viewSide === 'white' ? 'black' : 'white'} />
		</div>
		<div class="wide-corner" />
	</div>
	<div class="max-row">
		<div class="score">
			<MatchScoreBar />
		</div>
		<div class="chessboard max-w-[calc(100vh_-_10rem)]">
			<ChessBoard />
		</div>
		<div class="controls">
			<ChessInterface />
		</div>
	</div>
	<div class="narrow-row">
		<div class="narrow-corner">
			<button
				on:click={() => (openConfiguration = true)}
				class="m-auto text-app-black/25 transition-all ease-in hover:text-app-black/50"
			>
				<Cog size={24} />
			</button>
		</div>
		<div class="player-info max-w-[calc(100vh_-_10rem)]">
			<PlayerInfoBar side={$chessboard.viewSide === 'black' ? 'black' : 'white'} />
		</div>
		<div class="wide-corner" />
	</div>
</div>

<Dialog bind:open={openConfiguration} subtitle="Configuration" title="Chess styles">
	<ConfigurationMenu />
</Dialog>

<style lang="postcss">
	.narrow-corner {
		@apply flex h-9 w-8 min-w-[2rem] justify-center align-middle;
	}

	.wide-corner {
		@apply h-9 w-72 min-w-[18rem];
	}

	.chessboard {
		@apply aspect-square w-full p-1;
	}

	.player-info {
		@apply h-9 w-full px-1;
	}

	.controls {
		@apply h-auto w-72 min-w-[18rem];
	}

	.score {
		@apply h-auto w-8 min-w-[2rem] py-1;
	}

	.narrow-row {
		@apply mx-auto flex h-9 w-full flex-row justify-center gap-3;
	}

	.max-row {
		@apply mx-auto flex w-full flex-row justify-center gap-3;
	}

	.main-col {
		@apply flex w-full flex-col gap-1 p-2;
	}
</style>
