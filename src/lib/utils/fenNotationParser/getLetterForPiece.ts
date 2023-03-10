import type { Piece } from '$lib/types/chess.types';

export const getLetterForPiece = (piece: Piece) => {
	switch (piece) {
		case 'pawn':
			return 'P';
		case 'knight':
			return 'N';
		case 'bishop':
			return 'B';
		case 'rook':
			return 'R';
		case 'queen':
			return 'Q';
		case 'king':
			return 'K';
		default:
			return 'NotAValidPiece';
	}
};
