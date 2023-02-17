<script>
	import ChessPiece from '$lib/components/chess/pieces/ChessPiece.svelte';
</script>

<svelte:head>
	<title>frozone-chess</title>
	<meta name="description" content="Chess online platform" />
</svelte:head>

<div class="flex pt-5">
	<ChessPiece piece="pawn" side="white" />
	<ChessPiece piece="king" side="white" />
	<ChessPiece piece="queen" side="white" />
	<ChessPiece piece="bishop" side="white" />
	<ChessPiece piece="rook" side="white" />
	<ChessPiece piece="knight" side="white" />
</div>
<div class="flex pb-5">
	<ChessPiece piece="pawn" side="black" />
	<ChessPiece piece="king" side="black" />
	<ChessPiece piece="queen" side="black" />
	<ChessPiece piece="bishop" side="black" />
	<ChessPiece piece="rook" side="black" />
	<ChessPiece piece="knight" side="black" />
</div>
