import type { PieceType, Side } from '$lib/types/chess.types';
import { PIECES, COLORS } from '$lib/constants/chess.constants';

export const getPieceFromString = (piece: string): Omit<PieceType, 'position'> => {
	const pieceCode = piece.charCodeAt(0);
	let side: Side;

	if (piece.length !== 1) {
		throw new Error('Invalid piece');
	}

	if (pieceCode >= 65 && pieceCode <= 90) {
		side = COLORS.WHITE;
	} else if (pieceCode >= 97 && pieceCode <= 122) {
		side = COLORS.BLACK;
	} else {
		throw new Error('Invalid piece');
	}

	const defaultMeta = {
		firstMove: true,
		possibleMoves: [],
		attackMoves: [],
	};

	switch (piece.toLowerCase()) {
		case 'p':
			return { type: PIECES.PAWN, side, meta: { ...defaultMeta, value: 1 } };
		case 'r':
			return { type: PIECES.ROOK, side, meta: { ...defaultMeta, value: 5 } };
		case 'n':
			return { type: PIECES.KNIGHT, side, meta: { ...defaultMeta, value: 3 } };
		case 'b':
			return { type: PIECES.BISHOP, side, meta: { ...defaultMeta, value: 3 } };
		case 'q':
			return { type: PIECES.QUEEN, side, meta: { ...defaultMeta, value: 9 } };
		case 'k':
			return { type: PIECES.KING, side, meta: { ...defaultMeta, value: 0 } };
		default:
			throw new Error('Invalid piece');
	}
};
