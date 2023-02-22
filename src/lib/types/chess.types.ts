import type { COLORS, PIECES } from '$lib/constants/chess.constants';

export type HexColor = `#${string}`;

export type Piece = (typeof PIECES)[keyof typeof PIECES];
export type Side = (typeof COLORS)[keyof typeof COLORS];
export type ChessColorConfig = {
	[key in Side]?: {
		main?: HexColor;
		accent?: HexColor;
	};
};

export type CastlingSingleType = {
	queenSide: boolean;
	kingSide: boolean;
};

export type PieceType = {
	type: Piece;
	side: Side;
	position: SquareInfoType;
	meta: {
		firstMove: boolean;
		value: number;
		possibleMoves: SquareInfoType[];
		attackMoves: SquareInfoType[];
	};
};

export type CastleDirection = keyof CastlingSingleType;

export type CastlingInfoType = { [key in Side]: CastlingSingleType };

export type SquareColor = 'light' | 'dark';

export type PiecePositionInfoType = { piece: Piece; side: Side; square: Required<SquareInfoType> };

export type SquareInfoType = { index: number; code: string };

export type FenNotationObjectType = {
	position: PiecePositionInfoType[];
	move: Side;
	castling: CastlingInfoType;
	enPassant: SquareInfoType;
	halfMoveClock: number;
	fullMoveNumber: number;
	isKingInCheck: {
		[key in Side]?: boolean;
	};
	win?: Side;
};

export type BoundariesType = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

export type SquareBoundariesType = { [key: number]: BoundariesType };
