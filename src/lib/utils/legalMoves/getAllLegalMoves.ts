import type { PositionStoreValueType } from '$lib/types/store.types';

export const getAllLegalMoves = (position: PositionStoreValueType) => {
	// TODO: Check for all legal moves
	//implementation

	// if legal move covers enemy piece then add to possible attacks
	position.forEach((piece) => {
		if (piece.meta.possibleMoves) {
			piece.meta.possibleMoves.forEach((move) => {
				const pieceAtMove = position.get(move);

				if (pieceAtMove && pieceAtMove.side !== piece.side) {
					piece.meta.attackMoves.push(move);
				}
			});
		}
	});

	return position;
};
