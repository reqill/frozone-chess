<script lang="ts">
	import Flag from 'svelte-material-icons/Flag.svelte';
	import Account from 'svelte-material-icons/Account.svelte';
	import AccountMultiple from 'svelte-material-icons/AccountMultiple.svelte';
	import Laptop from 'svelte-material-icons/Laptop.svelte';
	import { OptionButton, PrimaryButton } from '$lib/components/buttons';
	import { Dialog } from '$lib/components/Dialog';

	let open = false;
	let active = true;
</script>

<div class="flex flex-row flex-wrap justify-center align-middle">
	<PrimaryButton label="Normal" />
	<PrimaryButton label="Inactive" inactive />
	<PrimaryButton label="Icon" icon={Flag} />
	<PrimaryButton label="Disabled" disabled />
	<PrimaryButton
		label={active ? 'Active' : 'Inactive'}
		{active}
		on:click={() => (active = !active)}
	/>
	<PrimaryButton label="Active Disabled" active disabled />
</div>
<div class="flex flex-row  justify-center align-middle">
	<PrimaryButton label="Full Width 1" fullWidth />
	<PrimaryButton label="Full Width 2" fullWidth />
	<PrimaryButton label="Full Width 3" fullWidth />
</div>
<div class="flex flex-row">
	<PrimaryButton label="Normal" />
	<OptionButton label="one-player" icon={Account} />
	<OptionButton label="online" icon={Laptop} />
	<OptionButton label="hot-seats" icon={AccountMultiple} />
	<PrimaryButton fullWidth label="Blitz 5 | 2" info="hot-seats" active inactive />
</div>
<PrimaryButton label="Open dialog" fullWidth on:click={() => (open = true)} />

<Dialog bind:open title="Test Dialog" subtitle="Subtitle test">
	<p>lol</p>
</Dialog>
