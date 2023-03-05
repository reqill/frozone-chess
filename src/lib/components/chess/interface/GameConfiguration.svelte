<script lang="ts">
	import { OptionButton, PrimaryButton } from '$lib/components/buttons';
	import { Tooltip } from '$lib/components/Tooltip';
	import { game } from '$lib/store';
	import type { GameSetupType } from '$lib/store/game';
	import type { GameMode } from '$lib/types/chess.types';
	import Account from 'svelte-material-icons/Account.svelte';
	import AccountMultiple from 'svelte-material-icons/AccountMultiple.svelte';
	import Laptop from 'svelte-material-icons/Laptop.svelte';

	const gameModeOptions: GameMode[] = ['singleplayer', 'online', 'hotseats'];

	const timerOptions: GameSetupType[] = [
		{ timer: 600_000, increment: 5_000 },
		{ timer: 300_000, increment: 2_000 },
		{ timer: 600_000, increment: 0 },
		{ timer: 120_000, increment: 1_000 },
		{ timer: 1_200_000, increment: 15_000 },
		{ timer: undefined, increment: 0 },
	];

	let selectedGameMode: undefined | number = undefined;
	let selectedTimer: undefined | number = undefined;

	$: !!selectedTimer && game.setup({ ...timerOptions[selectedTimer] });

	const endSetup = () => {
		if (
			selectedTimer === undefined ||
			selectedGameMode === undefined ||
			gameModeOptions[selectedGameMode] !== 'hotseats'
		)
			return;

		game.setup(
			{ ...timerOptions[selectedTimer], gamemode: gameModeOptions[selectedGameMode] },
			true
		);
	};
</script>

<div class="flex h-full w-72 grow flex-col justify-between py-11">
	<div class="flex flex-col gap-1">
		<h4 class="text-[2rem] font-bold text-app-black">Create your game</h4>

		<h6 class="-mb-1 mt-1 pl-1 font-normal">Game type</h6>

		<div class="flex flex-row">
			<Tooltip title="This gamemode is not supported yet." className="w-full">
				<OptionButton
					label="one-player"
					icon={Account}
					fullWidth
					disabled
					active={selectedGameMode === 0}
					on:click={() => (selectedGameMode = 0)}
				/>
			</Tooltip>
			<Tooltip title="This gamemode is not supported yet." className="w-full">
				<OptionButton
					label="online"
					icon={Laptop}
					fullWidth
					disabled
					active={selectedGameMode === 1}
					on:click={() => (selectedGameMode = 1)}
				/>
			</Tooltip>
			<OptionButton
				label="hot-seats"
				icon={AccountMultiple}
				fullWidth
				active={selectedGameMode === 2}
				on:click={() => (selectedGameMode = 2)}
			/>
		</div>

		<h6 class="-mb-1 mt-2 pl-1 font-normal">Timers</h6>

		<div class="flex flex-row gap-2">
			<PrimaryButton
				label="10 | 5"
				fullWidth
				disabled={selectedGameMode === undefined}
				active={selectedTimer === 0}
				on:click={() => (selectedTimer = 0)}
			/>
			<PrimaryButton
				label="5 | 2"
				fullWidth
				disabled={selectedGameMode === undefined}
				active={selectedTimer === 1}
				on:click={() => (selectedTimer = 1)}
			/>
		</div>

		<div class="flex flex-row gap-2">
			<PrimaryButton
				label="10 | 0"
				fullWidth
				disabled={selectedGameMode === undefined}
				active={selectedTimer === 2}
				on:click={() => (selectedTimer = 2)}
			/>
			<PrimaryButton
				label="2 | 1"
				fullWidth
				disabled={selectedGameMode === undefined}
				active={selectedTimer === 3}
				on:click={() => (selectedTimer = 3)}
			/>
		</div>

		<div class="flex flex-row gap-2">
			<PrimaryButton
				label="20 | 15"
				fullWidth
				disabled={selectedGameMode === undefined}
				active={selectedTimer === 4}
				on:click={() => (selectedTimer = 4)}
			/>
			<PrimaryButton
				label="None"
				fullWidth
				disabled={selectedGameMode === undefined}
				active={selectedTimer === 5}
				on:click={() => (selectedTimer = 5)}
			/>
		</div>
	</div>

	<div class="pb-[.05rem]">
		<PrimaryButton
			label="Play"
			fullWidth
			on:click={endSetup}
			disabled={selectedTimer === undefined || selectedGameMode === undefined}
		/>
	</div>
</div>
