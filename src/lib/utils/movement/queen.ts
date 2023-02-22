import type { PieceType } from '$lib/types/chess.types';
import type { PositionStoreValueType } from '$lib/types/store.types';
import type { PieceMoveMetaType } from '$lib/types/utils.types';
import { bishop } from './bishop';
import { isInRange } from './isInRange';
import { rook } from './rook';

export const queen = (
	positions: PositionStoreValueType,
	piece: PieceType,
	meta?: PieceMoveMetaType
) => {
	const { possibleMoves: rookMoves, attackMoves: rookAttacks } = rook(positions, piece, meta);
	const { possibleMoves: bishopMoves, attackMoves: bishopAttacks } = bishop(positions, piece, meta);

	const possibleMoves = [...rookMoves, ...bishopMoves];
	const attackMoves = [...rookAttacks, ...bishopAttacks];

	possibleMoves.push(...attackMoves);

	possibleMoves.filter((item, index) => possibleMoves.indexOf(item) === index && isInRange(item));
	attackMoves.filter((item, index) => attackMoves.indexOf(item) === index && isInRange(item));

	return { possibleMoves, attackMoves };
};
