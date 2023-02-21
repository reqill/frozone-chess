import { writable, derived } from 'svelte/store';
import { position } from './position';
import type { GameStoreValueType } from '$lib/types/store.types';
import { history } from './history';
import { captured } from './captured';
import { DEFAULT_GAME } from '$lib/constants/store.constants';

type GameSetupType = Partial<Pick<GameStoreValueType, 'timer' | 'increment'>>;

const createGame = () => {
	const { subscribe, set, update } = writable<GameStoreValueType>(DEFAULT_GAME);
	derived([position, history, captured], ([$position, $history, $captured]) =>
		update((game) => {
			game = {
				...game,
				position: $position,
				history: $history,
				captured: $captured,
			};
			return game;
		})
	);

	const start = () => {
		update((game) => {
			game.startTime = new Date();
			game.status = 'active';
			return game;
		});

		const interval = setInterval(() => {
			update((game) => {
				if (game.status === 'active') {
					game.timer[game.turn] -= 100;
				}

				if (game.timer[game.turn] <= 0) {
					game.status = 'timeout';
					game.winner = game.turn === 'white' ? 'black' : 'white';
				}

				return game;
			});
		}, 100);

		return interval;
	};

	const pause = () => {
		update((game) => {
			if (game.status === 'active') {
				game.status = 'paused';
			}

			return game;
		});
	};

	const resume = () => {
		update((game) => {
			if (game.status === 'paused') {
				game.status = 'active';
			}

			return game;
		});
	};

	const setup = ({ increment, timer }: GameSetupType) => {
		update((game) => {
			if (increment) {
				game.increment = increment;
			}

			if (timer) {
				game.timer = timer;
			}

			return game;
		});
	};

	const changeTurn = () => {
		update((game) => {
			game.timer[game.turn] += game.increment[game.turn];
			game.turn = game.turn === 'white' ? 'black' : 'white';
			return game;
		});
	};

	const reset = () => {
		set(DEFAULT_GAME);
		position.reset();
		history.reset();
		captured.reset();
	};

	const override = (game?: GameStoreValueType) => {
		if (!game) throw new Error('No game provided to override');

		set(game);
		position.override(game.position);
		history.override(game.history);
		captured.override(game.captured);
	};

	return {
		subscribe,
		setup,
		start,
		changeTurn,
		pause,
		resume,
		reset,
		override,
	};
};

export const game = createGame();
