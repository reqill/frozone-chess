<script lang="ts">
	import { ChessBoard } from '$lib/components/chess/board';
	import { ChessInterface } from '$lib/components/chess/interface';
</script>

<div class="flex h-full w-full flex-row justify-center align-top">
	<div class="mr-0 w-[50%]">
		<ChessBoard />
	</div>
	<div class="ml-0">
		<ChessInterface />
	</div>
</div>
