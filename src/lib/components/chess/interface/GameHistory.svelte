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
	class="h-full overflow-x-auto pt-1"
	id="history-panel"
	style="max-height: {mountHeight || 'auto'}{mountHeight ? 'px' : ''};"
>
	<table>
		<tbody>
			{#each historyArray as _, i}
				<tr>
					<td>
						<p>{i + 1}.</p>
					</td>
					<td>
						<p>{$history.moves.get(i * 2)}</p>
					</td>
					<td>
						{#if i * 2 + 1 < $history.moves.size}
							<p>{$history.moves.get(i * 2 + 1) || ''}</p>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="postcss">
	table {
		@apply mt-[.15rem];
	}
	tr {
		@apply flex flex-row flex-nowrap;
	}

	td:first-child {
		@apply w-[3ch] px-1 pt-[.3rem] text-right text-xs;
	}

	td:nth-child(2) {
		@apply flex w-[9ch] flex-row justify-start px-1 text-center;
	}
	td:nth-child(3) {
		@apply flex w-[9ch] flex-row justify-start px-1 text-center;
	}

	td:nth-child(2) > p {
		@apply break-words rounded-[.25rem] bg-gray-100 px-2 py-[.1rem] text-left text-sm;
		word-spacing: 10rem;
	}

	td:nth-child(3) > p {
		@apply break-words rounded-[.25rem] bg-app-black/75 px-2 py-[.1rem] text-left  text-sm text-app-white;
		word-spacing: 10rem;
	}
</style>
