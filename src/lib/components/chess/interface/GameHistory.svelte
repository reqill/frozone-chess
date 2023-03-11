<script lang="ts">
	import { history } from '$lib/store';
	import { onMount } from 'svelte';

	let historyArray: { moveNumber: number; whiteMove: string; blackMove?: string }[] = [];

	$: $history.moves.forEach((move, i) => {
		if (i % 2 === 0) {
			historyArray[i / 2] = { moveNumber: i / 2 + 1, whiteMove: move };
		} else {
			historyArray[(i - 1) / 2].blackMove = move;
		}
	});

	let mountHeight: number | null = null;

	onMount(() => {
		mountHeight = document.querySelector('#history-panel')?.clientHeight || null;
	});
</script>

<div
	class="h-full overflow-x-auto"
	id="history-panel"
	style="max-height: {mountHeight || 'auto'}{mountHeight ? 'px' : ''};"
>
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
