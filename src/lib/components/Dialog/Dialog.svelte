<script lang="ts">
	import Portal from '../Portal/Portal.svelte';
	import { fade } from 'svelte/transition';
	import Close from 'svelte-material-icons/Close.svelte';

	export let title: string;
	export let subtitle = '';
	export let open = false;
	export let closeOnBgClick = false;
	let dialog: HTMLDivElement | null = null;

	const onClose = (e: MouseEvent) => {
		const { top, bottom, left, right } = dialog?.getBoundingClientRect() || {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
		};

		if (
			!(e.clientX > left && e.clientX < right && e.clientY > top && e.clientY < bottom) &&
			closeOnBgClick
		) {
			open = false;
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if open}
	<Portal>
		<div
			class="dialog-bg"
			in:fade={{ duration: 125 }}
			out:fade={{ duration: 125 }}
			on:click={onClose}
		>
			<div class="dialog-body" bind:this={dialog}>
				<div class="flex w-full flex-row justify-between pb-4 align-top">
					<div class="mr-auto">
						<h4 class="pr-6 font-test text-2xl font-bold text-app-black">{title}</h4>
						{#if subtitle}
							<p class="font-test text-sm text-app-black">{subtitle}</p>
						{/if}
					</div>
					<button
						on:click={() => (open = false)}
						class="ml-auto mb-auto mt-1 -mr-1 rounded-[.25rem] p-1 text-app-black transition-colors ease-in-out hover:bg-app-black/5 active:bg-app-black/10"
					>
						<Close size={24} />
					</button>
				</div>
				<div class="pb-1">
					<slot />
				</div>
			</div>
		</div>
	</Portal>
{/if}

<style lang="postcss">
	.dialog-bg {
		@apply fixed inset-0 z-50 flex flex-col justify-center bg-app-black/30 align-middle;
	}

	.dialog-body {
		@apply m-auto min-w-[24rem] rounded-md bg-app-white py-4 px-6;
	}
</style>
