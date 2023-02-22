import { MOVE_INDEX_CHANGE } from '$lib/constants/movement.constants';
import type { PieceType, SquareInfoType } from '$lib/types/chess.types';
import type { PositionStoreValueType } from '$lib/types/store.types';

export const bishop = (positions: PositionStoreValueType, piece: PieceType) => {
	const possibleMoves: SquareInfoType[] = [];
	const attackMoves: SquareInfoType[] = [];

	return { possibleMoves, attackMoves };
};
