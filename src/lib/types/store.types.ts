import type { StringifiedMap } from '$lib/common/map';
import type { CastlingInfoType, PieceType, Side, SquareInfoType } from './chess.types';

export type CapturedStoreValueType = {
	[key in Side]: {
		value: number;
		pieces: Omit<PieceType, 'position'>[];
	};
};

export type PositionStoreValueType = StringifiedMap<SquareInfoType, PieceType>;

export type MoveHistoryStoreValueType = {
	moves: Map<number, string>;
	positions: Map<number, PositionStoreValueType>;
	captured: Map<number, CapturedStoreValueType>;
};

type GameStatusType =
	| 'pre-game'
	| 'active'
	| 'paused'
	| 'checkmate'
	| 'stalemate'
	| 'resigned'
	| 'abandoned'
	| 'timeout';

export type GameStoreValueType = {
	turn: Side;
	status: GameStatusType;
	winner: Side | null;
	draw: boolean;
	halfMoveClock: number;
	fullMoveNumber: number;
	position: PositionStoreValueType;
	captured: CapturedStoreValueType;
	history: MoveHistoryStoreValueType;
	castingRights: CastlingInfoType;
	enPassant: SquareInfoType | null;
	check: { [key in Side]: boolean };
	fen: string;
	startTime: Date | null;
	timer: { [key in Side]: number };
	increment: { [key in Side]: number };
};

// TODO: move to chess.types.ts
export type ChessBoardArrowType = {
	from: SquareInfoType;
	to: SquareInfoType | null;
};

// TODO: move to chess.types.ts
export type ChessBoardBoundariesType = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

// TODO: move to chess.types.ts
export type SquareBoundariesType = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

export type ChessBoardStoreValueType = {
	squareBoundaries: StringifiedMap<SquareInfoType, SquareBoundariesType>;
	boundaries: ChessBoardBoundariesType;
	highlightedSquares: SquareInfoType[];
	arrows: ChessBoardArrowType[];
	dragPosition: { x: number; y: number };
	selectedSquare: SquareInfoType | null;
	intersectedSquare: SquareInfoType | null;
	isDragging: boolean;
	viewSide: Side;
	squares: SquareInfoType[];
};
