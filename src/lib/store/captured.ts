import { DEFAULT_CAPTURED } from '$lib/constants/store.constants';
import type { PieceType, Side } from '$lib/types/chess.types';
import type { CapturedStoreValueType } from '$lib/types/store.types';
import { writable } from 'svelte/store';

const createCaptured = () => {
	const { subscribe, set, update } = writable<CapturedStoreValueType>(DEFAULT_CAPTURED);

	const capturePiece = (piece: Omit<PieceType, 'position'>) => {
		update((captured) => {
			captured[piece.side].value += piece.meta.value;
			captured[piece.side].pieces.push(piece);

			return captured;
		});
	};

	const revertLast = (side: Side) => {
		update((captured) => {
			const lastPiece = captured[side].pieces.pop();
			if (lastPiece) {
				captured[side].value -= lastPiece.meta.value;
			}

			return captured;
		});
	};

	return {
		subscribe,
		capture: capturePiece,
		reset: () => set(DEFAULT_CAPTURED),
		override: (captured?: CapturedStoreValueType) => set(captured || DEFAULT_CAPTURED),
		revertLast: revertLast,
	};
};

export const captured = createCaptured();
