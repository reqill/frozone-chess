import type { CastlingInfoType, SquareInfoType } from '$lib/types/chess.types';

export type PieceMoveMetaType = {
	enPassant: SquareInfoType | null;
	castlingRights: CastlingInfoType;
	turn: 'white' | 'black';
};
