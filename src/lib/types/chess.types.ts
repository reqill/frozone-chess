import type { StringifiedMap } from '$lib/common/map';
import type { COLORS, PIECES } from '$lib/constants/chess.constants';
import type { MousePositionType } from './common.types';

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
	position: StringifiedMap<SquareInfoType, PieceType>;
	turn: Side;
	castlingRights: CastlingInfoType;
	enPassant: SquareInfoType | null;
	halfMoveClock: number;
	fullMoveNumber: number;
};

export type PieceEvent = {
	mousePos: MousePositionType;
	type: Piece;
	side: Side;
	position: SquareInfoType;
};

export type BoundariesType = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

export type SquareBoundariesType = { [key: number]: BoundariesType };
