import { DEFAULT_HISTORY } from '$lib/constants/store.constants';
import type { MoveHistoryStoreValueType, PositionStoreValueType } from '$lib/types/store.types';
import { getMoveNotation } from '$lib/utils';
import { writable } from 'svelte/store';
import { position } from './position';
import type { PieceType } from '$lib/types/chess.types';
import { captured } from './captured';
import { game } from './game';

const createHistory = () => {
	const { subscribe, set, update } = writable<MoveHistoryStoreValueType>(DEFAULT_HISTORY);

	const addToHistory = (newPositions: PositionStoreValueType, captured?: PieceType) => {
		update((history) => {
			const move = getMoveNotation(newPositions, history.positions.get(history.positions.size - 1));

			history.moves.set(history.moves.size, move);
			history.positions.set(history.positions.size, newPositions);

			if (captured) {
				const side = captured.side;
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

				newCapturedInfo[side].value += captured.meta.value;
				newCapturedInfo[side].pieces.push(captured);

				history.captured.set(history.captured.size, newCapturedInfo);
			}

			console.log('new history', history);
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
