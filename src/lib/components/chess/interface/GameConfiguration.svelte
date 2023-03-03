<script lang="ts">
	import { OptionButton, PrimaryButton } from '$lib/components/buttons';
	import Account from 'svelte-material-icons/Account.svelte';
	import AccountMultiple from 'svelte-material-icons/AccountMultiple.svelte';
	import Laptop from 'svelte-material-icons/Laptop.svelte';
</script>

<div class="flex h-full w-72 grow flex-col justify-between py-11">
	<div class="flex flex-col gap-1">
		<h4 class="text-[2rem] font-bold text-app-black">Create your game</h4>

		<h6 class="-mb-1 mt-1 pl-1 font-normal">Game type</h6>

		<div class="flex flex-row">
			<OptionButton label="one-player" icon={Account} fullWidth />
			<OptionButton label="online" icon={Laptop} fullWidth />
			<OptionButton label="hot-seats" icon={AccountMultiple} fullWidth />
		</div>

		<h6 class="-mb-1 mt-2 pl-1 font-normal">Timers</h6>

		<div class="flex flex-row gap-2">
			<PrimaryButton label="10 | 5" fullWidth />
			<PrimaryButton label="5 | 2" fullWidth />
		</div>

		<div class="flex flex-row gap-2">
			<PrimaryButton label="10 | 0" fullWidth />
			<PrimaryButton label="2 | 1" fullWidth />
		</div>

		<div class="flex flex-row gap-2">
			<PrimaryButton label="20 | 15" fullWidth />
			<PrimaryButton label="None" fullWidth />
		</div>
	</div>

	<div class="pb-[.05rem]">
		<PrimaryButton label="Play" fullWidth />
	</div>
</div>
