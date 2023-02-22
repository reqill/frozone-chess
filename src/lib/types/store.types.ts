import type { CastlingInfoType, PieceType, Side, SquareInfoType } from './chess.types';

export type CapturedStoreValueType = {
	[key in Side]: {
		value: number;
		pieces: Omit<PieceType, 'position'>[];
	};
};

export type PositionStoreValueType = Map<SquareInfoType, PieceType>;

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
