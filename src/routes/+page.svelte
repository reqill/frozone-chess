<script>
	import { PrimaryButton } from '$lib/components/buttons';
	import { goto } from '$app/navigation';
</script>

<svelte:head>
	<title>frozone-chess</title>
	<meta name="description" content="Chess online platform" />
</svelte:head>

<div class="mx-auto mt-10 flex w-64 flex-col gap-2">
	<PrimaryButton label="Play" fullWidth on:click={() => setTimeout(() => goto('/play'), 100)} />
	<PrimaryButton
		label="Preview"
		fullWidth
		on:click={() => setTimeout(() => goto('/preview'), 100)}
	/>
</div>
