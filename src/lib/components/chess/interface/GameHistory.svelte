<script lang="ts">
	import { history } from '$lib/store';
	import { onMount } from 'svelte';

	let mountHeight: number | null = null;
	$: historyArray = Array(Math.ceil($history.moves.size / 2)).fill(null);

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
			{#each historyArray as _, i}
				<tr>
					<td>
						{i + 1}.
					</td>
					<td>
						{$history.moves.get(i * 2)}
					</td>
					<td>
						{$history.moves.get(i * 2 + 1) || ''}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
