import type { SquareInfoType } from '$lib/types/chess.types';

export const isInRange = (move: SquareInfoType) => {
	const minIdx = 0;
	const maxIdx = 63;

	return move.index >= minIdx && move.index <= maxIdx;
};
