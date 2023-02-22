import { writable, derived } from 'svelte/store';
import { position } from './position';
import type { GameStoreValueType } from '$lib/types/store.types';
import { history } from './history';
import { captured } from './captured';
import { DEFAULT_GAME } from '$lib/constants/store.constants';
import type { Piece, SquareInfoType } from '$lib/types/chess.types';
import { getFullSquareInfo } from '$lib/utils/fenNotationParser/getFullSquareInfo';

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

	const exportData = () => {
		return {
			position: position.export(),
			history: history.export(),
			captured: captured.export(),
		};
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

	const _changeTurn = (game: GameStoreValueType) => {
		game.timer[game.turn] += game.increment[game.turn];
		game.turn = game.turn === 'white' ? 'black' : 'white';

		return game;
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

	const setCheck = () => {
		update((game) => {
			const whoInInCheck = game.turn === 'white' ? 'black' : 'white';

			game.check[whoInInCheck] = true;
			game.check[game.turn] = false;

			return game;
		});
	};

	const resetCheck = () => {
		update((game) => {
			game.check.white = false;
			game.check.black = false;

			return game;
		});
	};

	const move = (startPos: SquareInfoType, endPos?: SquareInfoType, promoteTo?: Piece) => {
		update((game) => {
			const piece = game.position.get(startPos);

			if (!piece || !endPos) return game;

			const isMoveLegal = piece.meta.possibleMoves?.find((move) => move.index === endPos.index);

			if (!isMoveLegal) return game;

			// remove castling rights if moved the king or rook
			if (piece.type === 'king' && piece.meta.firstMove) {
				game.castingRights[game.turn].kingSide = false;
				game.castingRights[game.turn].queenSide = false;
			} else if (piece.type === 'rook' && piece.meta.firstMove) {
				if (startPos.index % 8 === 0) {
					game.castingRights[game.turn].queenSide = false;
				} else if (startPos.index % 8 === 7) {
					game.castingRights[game.turn].kingSide = false;
				}
			}

			// Check if did a double pawn move to update en passant
			if (piece.type === 'pawn' && Math.abs(startPos.index - endPos.index) === 16) {
				if (game.turn === 'white') {
					game.enPassant = getFullSquareInfo(endPos.index + 8);
				} else {
					game.enPassant = getFullSquareInfo(endPos.index - 8);
				}
			} else {
				game.enPassant = null;
			}

			position.move(startPos, endPos, promoteTo);

			game = _changeTurn(game);

			return game;
		});
	};

	return {
		subscribe,
		setup,
		move,
		setCheck,
		resetCheck,
		export: exportData,
		start,
		pause,
		resume,
		reset,
		override,
	};
};

export const game = createGame();
