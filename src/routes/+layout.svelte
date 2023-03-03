<script>
	import './styles.css';
</script>

<svelte:head>
	<link rel="stylesheet" href="https://use.typekit.net/qcn8fts.css" />
</svelte:head>

<div class="app">
	<main class="flex h-full w-full flex-col justify-center align-top">
		<h1 class="-mt-5 select-none pb-8 text-center text-8xl font-semibold blur-sm">frozone-chess</h1>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 100vh;
		max-height: 100vh;
		min-width: 100vw;
		max-width: 100vw;
		margin: 0;
		padding: 0;
	}

	main {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}
</style>
