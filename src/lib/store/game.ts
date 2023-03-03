import { writable } from 'svelte/store';
import { position } from './position';
import type {
	CapturedStoreValueType,
	GameAudioType,
	GameStoreValueType,
	MoveHistoryStoreValueType,
	PositionStoreValueType,
} from '$lib/types/store.types';
import { history } from './history';
import { captured } from './captured';
import { DEFAULT_GAME } from '$lib/constants/store.constants';
import type { GameMode, Piece, SquareInfoType } from '$lib/types/chess.types';
import { getFullSquareInfo } from '$lib/utils/fenNotationParser/getFullSquareInfo';
import { configuration } from './configuration';
import { chessboard } from './chessboard';

export type GameSetupType = { timer?: number; increment?: number; gamemode?: GameMode };

const createGame = () => {
	const { subscribe, set, update } = writable<GameStoreValueType>(DEFAULT_GAME);

	const start = () => {
		update((game) => {
			game.startTime = new Date();
			game.status = 'active';
			return game;
		});

		const interval = setInterval(() => {
			update((game) => {
				if (game.status === 'active') {
					game.timer[game.turn] -= 50;
				}

				if (game.timer[game.turn] <= 0) {
					game.status = 'timeout';
					game.winner = game.turn === 'white' ? 'black' : 'white';
					clearInterval(interval);
				}

				return game;
			});
		}, 50);

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

	const setup = ({ increment, timer, gamemode }: GameSetupType, final = false) => {
		update((game) => {
			if (game.status !== 'setup') return game;

			if (increment !== undefined) {
				game.increment.white = increment;
				game.increment.black = increment;
			}

			if (timer) {
				game.timer.black = timer;
				game.timer.white = timer;
				game.timer.starting = timer;
			}

			if (gamemode) {
				game.gamemode = gamemode;
			}

			if (final && game.timer && game.increment && game.gamemode) {
				game.status = 'pre-game';
			}

			return game;
		});
	};

	const _changeTurn = (game: GameStoreValueType, firstMove = false) => {
		if (!firstMove) {
			game.timer[game.turn] += game.increment[game.turn];
		}
		game.turn = game.turn === 'white' ? 'black' : 'white';

		return game;
	};

	const reset = () => {
		position.reset();
		history.reset();
		captured.reset();
		set(DEFAULT_GAME);
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

	const move = (startPos: SquareInfoType, endPos: SquareInfoType | null, promoteTo?: Piece) => {
		update((game) => {
			if (game.status === 'pre-game') {
				start();
				game.status = 'active';
			}

			if (game.status !== 'active') return game;

			const firstMove = game.history.moves.size === 0;

			const piece = game.position.get(startPos);

			if (!piece || !endPos || piece.side !== game.turn) return game;

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

			game = _changeTurn(game, firstMove);

			const meta = {
				enPassant: game.enPassant,
				castlingRights: game.castingRights,
				turn: game.turn,
			};
			position.move(startPos, endPos, meta, promoteTo);

			if (configuration.shouldFlipBoard()) {
				chessboard.flip();
			}
			return game;
		});
	};

	const updatePosition = (position: PositionStoreValueType) => {
		update((game) => {
			game.position = position;
			return game;
		});
	};

	const updateHistory = (history: MoveHistoryStoreValueType) => {
		update((game) => {
			game.history = history;
			return game;
		});
	};

	const updateCaptured = (captured: CapturedStoreValueType) => {
		update((game) => {
			game.captured = captured;
			return game;
		});
	};

	const bindAudioPlayer = (actionType: GameAudioType, player: HTMLAudioElement) => {
		update((game) => {
			game.audio[actionType] = player;
			return game;
		});
	};

	const playSound = (actionType: GameAudioType) => {
		update((game) => {
			if (game.audio?.[actionType]) {
				game.audio[actionType]?.play();

				setTimeout(() => {
					game.audio[actionType]?.pause();
					game.audio[actionType]!.currentTime = 0;
				}, 200);
			}
			return game;
		});
	};

	return {
		subscribe,
		setup,
		move,
		playSound,
		updatePosition,
		updateHistory,
		updateCaptured,
		setCheck,
		resetCheck,
		export: exportData,
		start,
		pause,
		resume,
		reset,
		override,
		bindAudioPlayer,
	};
};

export const game = createGame();
