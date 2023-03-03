<script lang="ts">
	import { chessboard } from '$lib/store';
	import { ChessBoard } from '$lib/components/chess/board';
	import { ChessInterface } from '$lib/components/chess/interface';
	import { PlayerInfoBar } from '$lib/components/chess/PlayerInfoBar';
	import { MatchScoreBar } from '$lib/components/chess/MatchScoreBar';
</script>

<div class="flex h-full w-full flex-row justify-center gap-7 p-3 align-top">
	<div class="py-11">
		<MatchScoreBar />
	</div>
	<div class="flex w-full max-w-[80vh] flex-col gap-2">
		<PlayerInfoBar side={$chessboard.viewSide === 'white' ? 'black' : 'white'} />
		<ChessBoard />
		<PlayerInfoBar side={$chessboard.viewSide === 'white' ? 'white' : 'black'} />
	</div>
	<ChessInterface />
</div>
