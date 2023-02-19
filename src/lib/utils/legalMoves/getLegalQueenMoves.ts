import type {
	FenNotationObjectType,
	PiecePositionInfoType,
	SquareInfoType,
} from '$lib/types/chess.types';
import { getLegalBishopMoves } from './getLegalBishopMoves';
import { getLegalRookMoves } from './getLegalRookMoves';

export const getLegalQueenMoves = (
	gameObject: FenNotationObjectType,
	pieceInfo: PiecePositionInfoType
) => {
	const legalMoves: SquareInfoType[] = [];

	legalMoves.push(...getLegalRookMoves(gameObject, pieceInfo));
	legalMoves.push(...getLegalBishopMoves(gameObject, pieceInfo));

	return legalMoves;
};
