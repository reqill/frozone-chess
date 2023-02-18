<script>
	import './styles.css';
</script>

<div class="app">
	<main>
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
