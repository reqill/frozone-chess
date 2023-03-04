<script lang="ts">
	import { chessboard } from '$lib/store';
	import { ChessBoard } from '$lib/components/chess/board';
	import { ChessInterface } from '$lib/components/chess/interface';
	import { PlayerInfoBar } from '$lib/components/chess/PlayerInfoBar';
	import { MatchScoreBar } from '$lib/components/chess/MatchScoreBar';
	import Cog from 'svelte-material-icons/Cog.svelte';
	import { Dialog } from '$lib/components/Dialog';
	import { ConfigurationMenu } from '$lib/components/chess/ConfiguarionMenu';

	let openConfiguration = false;
</script>

<div class="flex h-full w-full flex-row justify-center gap-7 p-3 align-top">
	<div class="relative py-11">
		<MatchScoreBar />
		<div class="absolute bottom-[.4rem] flex w-full justify-center">
			<button
				on:click={() => (openConfiguration = true)}
				class="text-app-black/25 transition-all ease-in hover:text-app-black/50"
			>
				<Cog size={24} />
			</button>
		</div>
	</div>
	<div class="flex w-full max-w-[80vh] flex-col gap-2">
		<PlayerInfoBar side={$chessboard.viewSide === 'white' ? 'black' : 'white'} />
		<ChessBoard />
		<PlayerInfoBar side={$chessboard.viewSide === 'white' ? 'white' : 'black'} />
	</div>
	<ChessInterface />
</div>

<Dialog bind:open={openConfiguration} subtitle="Configuration" title="Chess styles">
	<ConfigurationMenu />
</Dialog>
