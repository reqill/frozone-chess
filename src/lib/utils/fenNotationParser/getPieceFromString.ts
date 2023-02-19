import type { Piece, Side } from '$lib/types/chess.types';
import { PIECES, COLORS } from '$lib/constants/chess.constants';

export const getPieceFromString = (piece: string): { piece: Piece; side: Side } => {
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

	switch (piece.toLowerCase()) {
		case 'p':
			return { piece: PIECES.PAWN, side };
		case 'r':
			return { piece: PIECES.ROOK, side };
		case 'n':
			return { piece: PIECES.KNIGHT, side };
		case 'b':
			return { piece: PIECES.BISHOP, side };
		case 'q':
			return { piece: PIECES.QUEEN, side };
		case 'k':
			return { piece: PIECES.KING, side };
		default:
			throw new Error('Invalid piece');
	}
};
