import type { StringifiedMap } from '$lib/common/map';
import type { CastlingInfoType, GameMode, PieceType, Side, SquareInfoType } from './chess.types';

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
	| 'setup'
	| 'pre-game'
	| 'active'
	| 'paused'
	| 'checkmate'
	| 'stalemate'
	| 'resigned'
	| 'abandoned'
	| 'timeout';

export type GameAudioType =
	| 'move'
	| 'capture'
	| 'check'
	| 'checkmate'
	| 'stalemate'
	| 'resign'
	| 'draw'
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
	timer: { [key in Side]?: number } & { starting: number };
	increment: { [key in Side]: number };
	gamemode?: GameMode;
	audio: {
		[key in GameAudioType]?: HTMLAudioElement;
	};
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

export type ConfigurationStoreValueType = {
	boardSquares: {
		light: string;
		dark: string;
	};
	pieceColors: {
		[key in Side]: {
			main: string;
			accent: string;
		};
	};
	outlineColors: {
		light: string;
		dark: string;
	};
	highlightColors: {
		light: string;
		dark: string;
	};
	arrowColor: string;
	possibleMoveColor: string;
	pieceSize: 'small' | 'medium' | 'large';
	flipOnMove: boolean;
	showTileLabels: boolean;
};
