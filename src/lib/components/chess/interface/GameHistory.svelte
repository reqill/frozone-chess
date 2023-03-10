<script lang="ts">
	import { history } from '$lib/store';

	let historyArray: { moveNumber: number; whiteMove: string; blackMove?: string }[] = [];

	$: $history.moves.forEach((move, i) => {
		if (i % 2 === 0) {
			historyArray[i / 2] = { moveNumber: i / 2 + 1, whiteMove: move };
		} else {
			historyArray[(i - 1) / 2].blackMove = move;
		}
	});
</script>

<div class="overflow-x-auto">
	<table>
		<thead>
			<tr>
				<th> Move </th>
				<th> White </th>
				<th> Black </th>
			</tr>
		</thead>
		<tbody>
			{#each historyArray as move}
				<tr>
					<td>
						{move.moveNumber}.
					</td>
					<td>
						{move.whiteMove}
					</td>
					<td>
						{move?.blackMove || ''}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
