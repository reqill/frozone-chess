import { StringifiedMap } from '$lib/common/map';
import type {
	CapturedStoreValueType,
	ChessBoardStoreValueType,
	ConfigurationStoreValueType,
	GameStoreValueType,
	MoveHistoryStoreValueType,
	PositionStoreValueType,
} from '$lib/types/store.types';
import { copyStringifiedMap } from '$lib/utils/copyStringifiedMap';
import { updateAllPossibleMoves } from '$lib/utils/movement';
import { DEFAULT_INCREMENT, DEFAULT_TIMERS, SQUARES, STARTING_FEN } from './chess.constants';
import { DEFAULT_CASTLING_RIGHTS } from './chess.constants';

export const DEFAULT_POSITION: PositionStoreValueType = updateAllPossibleMoves(
	new StringifiedMap([
		[
			{ index: 0, code: 'a8' },
			{
				type: 'rook',
				side: 'black',
				position: { index: 0, code: 'a8' },
				meta: { firstMove: true, value: 5, possibleMoves: [], attackMoves: [] },
			},
		],
		[
			{ index: 1, code: 'b8' },
			{
				type: 'knight',
				side: 'black',
				position: { index: 1, code: 'b8' },
				meta: {
					firstMove: true,
					value: 3,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 2, code: 'c8' },
			{
				type: 'bishop',
				side: 'black',
				position: { index: 2, code: 'c8' },
				meta: { firstMove: true, value: 3, possibleMoves: [], attackMoves: [] },
			},
		],
		[
			{ index: 3, code: 'd8' },
			{
				type: 'queen',
				side: 'black',
				position: { index: 3, code: 'd8' },
				meta: { firstMove: true, value: 9, possibleMoves: [], attackMoves: [] },
			},
		],
		[
			{ index: 4, code: 'e8' },
			{
				type: 'king',
				side: 'black',
				position: { index: 4, code: 'e8' },
				meta: { firstMove: true, value: 0, possibleMoves: [], attackMoves: [] },
			},
		],
		[
			{ index: 5, code: 'f8' },
			{
				type: 'bishop',
				side: 'black',
				position: { index: 5, code: 'f8' },
				meta: { firstMove: true, value: 3, possibleMoves: [], attackMoves: [] },
			},
		],
		[
			{ index: 6, code: 'g8' },
			{
				type: 'knight',
				side: 'black',
				position: { index: 6, code: 'g8' },
				meta: {
					firstMove: true,
					value: 3,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 7, code: 'h8' },
			{
				type: 'rook',
				side: 'black',
				position: { index: 7, code: 'h8' },
				meta: { firstMove: true, value: 5, possibleMoves: [], attackMoves: [] },
			},
		],
		[
			{ index: 8, code: 'a7' },
			{
				type: 'pawn',
				side: 'black',
				position: { index: 8, code: 'a7' },
				meta: {
					firstMove: true,
					value: 1,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 9, code: 'b7' },
			{
				type: 'pawn',
				side: 'black',
				position: { index: 9, code: 'b7' },
				meta: {
					firstMove: true,
					value: 1,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 10, code: 'c7' },
			{
				type: 'pawn',
				side: 'black',
				position: { index: 10, code: 'c7' },
				meta: {
					firstMove: true,
					value: 1,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 11, code: 'd7' },
			{
				type: 'pawn',
				side: 'black',
				position: { index: 11, code: 'd7' },
				meta: {
					firstMove: true,
					value: 1,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 12, code: 'e7' },
			{
				type: 'pawn',
				side: 'black',
				position: { index: 12, code: 'e7' },
				meta: {
					firstMove: true,
					value: 1,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 13, code: 'f7' },
			{
				type: 'pawn',
				side: 'black',
				position: { index: 13, code: 'f7' },
				meta: {
					firstMove: true,
					value: 1,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 14, code: 'g7' },
			{
				type: 'pawn',
				side: 'black',
				position: { index: 14, code: 'g7' },
				meta: {
					firstMove: true,
					value: 1,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 15, code: 'h7' },
			{
				type: 'pawn',
				side: 'black',
				position: { index: 15, code: 'h7' },
				meta: {
					firstMove: true,
					value: 1,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 48, code: 'a2' },
			{
				type: 'pawn',
				side: 'white',
				position: { index: 48, code: 'a2' },
				meta: {
					firstMove: true,
					value: 1,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 49, code: 'b2' },
			{
				type: 'pawn',
				side: 'white',
				position: { index: 49, code: 'b2' },
				meta: {
					firstMove: true,
					value: 1,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 50, code: 'c2' },
			{
				type: 'pawn',
				side: 'white',
				position: { index: 50, code: 'c2' },
				meta: {
					firstMove: true,
					value: 1,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 51, code: 'd2' },
			{
				type: 'pawn',
				side: 'white',
				position: { index: 51, code: 'd2' },
				meta: {
					firstMove: true,
					value: 1,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 52, code: 'e2' },
			{
				type: 'pawn',
				side: 'white',
				position: { index: 52, code: 'e2' },
				meta: {
					firstMove: true,
					value: 1,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 53, code: 'f2' },
			{
				type: 'pawn',
				side: 'white',
				position: { index: 53, code: 'f2' },
				meta: {
					firstMove: true,
					value: 1,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 54, code: 'g2' },
			{
				type: 'pawn',
				side: 'white',
				position: { index: 54, code: 'g2' },
				meta: {
					firstMove: true,
					value: 1,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 55, code: 'h2' },
			{
				type: 'pawn',
				side: 'white',
				position: { index: 55, code: 'h2' },
				meta: {
					firstMove: true,
					value: 1,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 56, code: 'a1' },
			{
				type: 'rook',
				side: 'white',
				position: { index: 56, code: 'a1' },
				meta: { firstMove: true, value: 5, possibleMoves: [], attackMoves: [] },
			},
		],
		[
			{ index: 57, code: 'b1' },
			{
				type: 'knight',
				side: 'white',
				position: { index: 57, code: 'b1' },
				meta: {
					firstMove: true,
					value: 3,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 58, code: 'c1' },
			{
				type: 'bishop',
				side: 'white',
				position: { index: 58, code: 'c1' },
				meta: { firstMove: true, value: 3, possibleMoves: [], attackMoves: [] },
			},
		],
		[
			{ index: 59, code: 'd1' },
			{
				type: 'queen',
				side: 'white',
				position: { index: 59, code: 'd1' },
				meta: { firstMove: true, value: 9, possibleMoves: [], attackMoves: [] },
			},
		],
		[
			{ index: 60, code: 'e1' },
			{
				type: 'king',
				side: 'white',
				position: { index: 60, code: 'e1' },
				meta: { firstMove: true, value: 0, possibleMoves: [], attackMoves: [] },
			},
		],
		[
			{ index: 61, code: 'f1' },
			{
				type: 'bishop',
				side: 'white',
				position: { index: 61, code: 'f1' },
				meta: { firstMove: true, value: 3, possibleMoves: [], attackMoves: [] },
			},
		],
		[
			{ index: 62, code: 'g1' },
			{
				type: 'knight',
				side: 'white',
				position: { index: 62, code: 'g1' },
				meta: {
					firstMove: true,
					value: 3,
					possibleMoves: [],
					attackMoves: [],
				},
			},
		],
		[
			{ index: 63, code: 'h1' },
			{
				type: 'rook',
				side: 'white',
				position: { index: 63, code: 'h1' },
				meta: { firstMove: true, value: 5, possibleMoves: [], attackMoves: [] },
			},
		],
	]),
	{
		castlingRights: {
			white: { kingSide: true, queenSide: true },
			black: { kingSide: true, queenSide: true },
		},
		enPassant: null,
		turn: 'white',
	}
);

export const DEFAULT_CAPTURED: CapturedStoreValueType = {
	white: {
		value: 0,
		pieces: [],
	},
	black: {
		value: 0,
		pieces: [],
	},
};

export const DEFAULT_HISTORY: MoveHistoryStoreValueType = {
	moves: new Map([]),
	positions: new Map([[0, copyStringifiedMap(DEFAULT_POSITION)]]),
	captured: new Map([]),
};

export const DEFAULT_GAME: GameStoreValueType = {
	turn: 'white',
	status: 'setup',
	winner: null,
	draw: false,
	halfMoveClock: 0,
	fullMoveNumber: 0,
	position: copyStringifiedMap(DEFAULT_POSITION),
	captured: DEFAULT_CAPTURED,
	history: DEFAULT_HISTORY,
	castingRights: DEFAULT_CASTLING_RIGHTS,
	enPassant: null,
	fen: STARTING_FEN,
	timer: DEFAULT_TIMERS,
	increment: DEFAULT_INCREMENT,
	startTime: null,
	check: { white: false, black: false },
	audio: {},
};

export const DEFAULT_CHESSBOARD_STATE: ChessBoardStoreValueType = {
	boundaries: {
		top: -1,
		right: -1,
		bottom: -1,
		left: -1,
	},
	highlightedSquares: [],
	arrows: [],
	squareBoundaries: new StringifiedMap(),
	selectedSquare: null,
	intersectedSquare: null,
	dragPosition: {
		x: -1,
		y: -1,
	},
	isDragging: false,
	viewSide: 'white',
	squares: [...SQUARES],
	selectedPiece: null,
	pendingPromotion: null,
};

export const DEFAULT_CONFIGURATION: ConfigurationStoreValueType = {
	boardSquares: {
		light: '#f0d9b5',
		dark: '#b58863',
	},
	flipOnMove: false,
	pieceSize: 'large',
	pieceColors: {
		white: {
			main: '#FBFBFB',
			accent: '#1A1A1A',
		},
		black: {
			main: '#1A1A1A',
			accent: '#FBFBFB',
		},
	},
	highlightColors: {
		light: '#eb6949',
		dark: '#d94f34',
	},
	outlineColors: {
		light: 'ring-[#b58863]',
		dark: 'ring-[#f0d9b5]',
	},
	possibleMoveColor: '',
	arrowColor: '',
	showTileLabels: false,
};
