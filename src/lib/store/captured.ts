import type { PieceType, Side } from '$lib/types/chess.types';
import type { CapturedStoreValueType } from '$lib/types/store.types';
import { writable } from 'svelte/store';
import { game } from './game';

const createCaptured = () => {
	const { subscribe, set, update } = writable<CapturedStoreValueType>({
		white: {
			value: 0,
			pieces: [],
		},
		black: {
			value: 0,
			pieces: [],
		},
	});

	const capturePiece = (piece: Omit<PieceType, 'position'>) => {
		update((captured) => {
			const oppositeSide = piece.side === 'white' ? 'black' : 'white';

			captured[oppositeSide].value += piece.meta.value;
			captured[oppositeSide].pieces.push(piece);

			game.updateCaptured(captured);

			return captured;
		});
	};

	const revertLast = (side: Side) => {
		update((captured) => {
			const lastPiece = captured[side].pieces.pop();
			if (lastPiece) {
				captured[side].value -= lastPiece.meta.value;
			}

			game.updateCaptured(captured);

			return captured;
		});
	};

	const exportData = () => {
		return 'captured';
	};

	return {
		subscribe,
		export: exportData,
		capture: capturePiece,
		reset: () =>
			set({
				white: {
					value: 0,
					pieces: [],
				},
				black: {
					value: 0,
					pieces: [],
				},
			}),
		override: (captured?: CapturedStoreValueType) =>
			set(
				captured || {
					white: {
						value: 0,
						pieces: [],
					},
					black: {
						value: 0,
						pieces: [],
					},
				}
			),
		revertLast: revertLast,
	};
};

export const captured = createCaptured();
