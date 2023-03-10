import { DEFAULT_HISTORY } from '$lib/constants/store.constants';
import type { MoveHistoryStoreValueType, PositionStoreValueType } from '$lib/types/store.types';
import { getMoveNotation } from '$lib/utils';
import { writable } from 'svelte/store';
import { position } from './position';
import type { Piece, PieceType, SquareInfoType } from '$lib/types/chess.types';
import { captured } from './captured';
import { game } from './game';
import { copyStringifiedMap } from '$lib/utils/copyStringifiedMap';

const createHistory = () => {
	const { subscribe, set, update } = writable<MoveHistoryStoreValueType>(DEFAULT_HISTORY);

	const addToHistory = (
		newPositions: PositionStoreValueType,
		meta: {
			startSquare: SquareInfoType;
			endSquare: SquareInfoType;
			capture?: PieceType | null;
			promotion?: Piece | null;
			check: boolean;
			castling?: 'kingside' | 'queenside' | null;
			checkmate: boolean;
			draw: boolean;
			win?: 'white' | 'black' | null;
		}
	) => {
		update((history) => {
			const move = getMoveNotation(meta.startSquare, meta.endSquare, {
				newPositions,
				oldPositions: history.positions.get(history.positions.size - 1),
				captured: meta.capture,
				promotion: meta.promotion,
				check: meta.check,
				castling: meta.castling,
				checkmate: meta.checkmate,
				draw: meta.draw,
				win: meta.win,
			});

			history.moves.set(history.moves.size, move);
			history.positions.set(history.positions.size, copyStringifiedMap(newPositions));

			if (meta.capture) {
				const side = meta.capture.side;
				const lastCapture = history.captured.get(history.captured.size - 1);

				const newCapturedInfo = {
					white: {
						value: lastCapture?.white.value || 0,
						pieces: lastCapture?.white.pieces || [],
					},
					black: {
						value: lastCapture?.black.value || 0,
						pieces: lastCapture?.black.pieces || [],
					},
				};

				newCapturedInfo[side].value += meta.capture.meta.value;
				newCapturedInfo[side].pieces.push(meta.capture);

				history.captured.set(history.captured.size, newCapturedInfo);
			}

			console.log(move);
			game.updateHistory(history);

			return history;
		});
	};

	const undoMove = () => {
		update((history) => {
			if (history.moves.size === 0) return history;

			history.moves.delete(history.moves.size - 1);
			history.positions.delete(history.positions.size - 1);
			history.captured.delete(history.captured.size - 1);

			position.override(history.positions?.get(history.positions.size - 1));
			captured.override(history.captured?.get(history.captured.size - 1));

			game.updateHistory(history);

			return history;
		});
	};

	const historyFromMoves = (moves: string[]) => {
		// TODO: Implement this
		console.log('historyFromMoves', moves);
	};

	const exportData = () => {
		return 'history';
	};

	return {
		subscribe,
		add: addToHistory,
		undo: undoMove,
		export: exportData,
		reset: () => set(DEFAULT_HISTORY),
		resetToMoves: historyFromMoves,
		override: (history?: MoveHistoryStoreValueType) => set(history || DEFAULT_HISTORY),
	};
};

export const history = createHistory();
