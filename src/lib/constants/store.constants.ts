import { StringifiedMap } from '$lib/common/map';
import type {
	CapturedStoreValueType,
	ChessBoardStoreValueType,
	GameStoreValueType,
	MoveHistoryStoreValueType,
	PositionStoreValueType,
} from '$lib/types/store.types';
import { updateAllPossibleMoves } from '$lib/utils/movement';
import { DEFAULT_INCREMENT, DEFAULT_TIMERS, SQUARES, STARTING_FEN } from './chess.constants';
import { DEFAULT_CASTLING_RIGHTS } from './chess.constants';

export const DEFAULT_POSITION: PositionStoreValueType = new StringifiedMap([
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
				firstMove: true, value: 3, possibleMoves: [
					{ index: 18, code: 'c6' },
					{ index: 16, code: 'a6' },
				], attackMoves: []
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
				firstMove: true, value: 3, possibleMoves: [
					{ index: 21, code: 'f6' },
					{ index: 23, code: 'h6' },
				], attackMoves: []
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
				firstMove: true, value: 1, possibleMoves: [
					{ index: 16, code: 'a6' },
					{ index: 24, code: 'a5' },
				], attackMoves: []
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
				firstMove: true, value: 1, possibleMoves: [
					{ index: 17, code: 'b6' },
					{ index: 25, code: 'b5' },
				], attackMoves: []
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
				firstMove: true, value: 1, possibleMoves: [
					{ index: 18, code: 'c6' },
					{ index: 26, code: 'c5' },
				], attackMoves: []
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
				firstMove: true, value: 1, possibleMoves: [
					{ index: 19, code: 'd6' },
					{ index: 27, code: 'd5' },
				], attackMoves: []
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
				firstMove: true, value: 1, possibleMoves: [
					{ index: 20, code: 'e6' },
					{ index: 28, code: 'e5' },
				], attackMoves: []
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
				firstMove: true, value: 1, possibleMoves: [
					{ index: 21, code: 'f6' },
					{ index: 29, code: 'f5' },
				], attackMoves: []
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
				firstMove: true, value: 1, possibleMoves: [
					{ index: 22, code: 'g6' },
					{ index: 30, code: 'g5' },
				], attackMoves: []
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
				firstMove: true, value: 1, possibleMoves: [
					{ index: 23, code: 'h6' },
					{ index: 31, code: 'h5' },
				], attackMoves: []
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
				firstMove: true, value: 1, possibleMoves: [
					{ index: 40, code: 'a3' },
					{ index: 32, code: 'a4' },
				], attackMoves: []
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
				firstMove: true, value: 1, possibleMoves: [
					{ index: 41, code: 'b3' },
					{ index: 33, code: 'b4' },
				], attackMoves: []
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
				firstMove: true, value: 1, possibleMoves: [
					{ index: 42, code: 'c3' },
					{ index: 34, code: 'c4' },
				], attackMoves: []
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
				firstMove: true, value: 1, possibleMoves: [
					{ index: 43, code: 'd3' },
					{ index: 35, code: 'd4' },
				], attackMoves: []
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
				firstMove: true, value: 1, possibleMoves: [
					{ index: 44, code: 'e3' },
					{ index: 36, code: 'e4' },
				], attackMoves: []
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
				firstMove: true, value: 1, possibleMoves: [
					{ index: 45, code: 'f3' },
					{ index: 37, code: 'f4' },
				], attackMoves: []
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
				firstMove: true, value: 1, possibleMoves: [
					{ index: 46, code: 'g3' },
					{ index: 38, code: 'g4' },
				], attackMoves: []
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
				firstMove: true, value: 1, possibleMoves: [
					{ index: 47, code: 'h3' },
					{ index: 39, code: 'h4' },
				], attackMoves: []
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
				firstMove: true, value: 3, possibleMoves: [
					{ index: 42, code: 'c3' },
					{ index: 40, code: 'a3' },
				], attackMoves: []
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
				firstMove: true, value: 3, possibleMoves: [
					{ index: 47, code: 'h3' },
					{ index: 45, code: 'f3' },
				], attackMoves: []
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
])

/*, { castlingRights: { white: { kingSide: true, queenSide: true }, black: { kingSide: true, queenSide: true } }, enPassant: null }*/

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
	positions: new Map([[0, DEFAULT_POSITION]]),
	captured: new Map([]),
};

export const DEFAULT_GAME: GameStoreValueType = {
	turn: 'white',
	status: 'pre-game',
	winner: null,
	draw: false,
	halfMoveClock: 0,
	fullMoveNumber: 0,
	position: DEFAULT_POSITION,
	captured: DEFAULT_CAPTURED,
	history: DEFAULT_HISTORY,
	castingRights: DEFAULT_CASTLING_RIGHTS,
	enPassant: null,
	fen: STARTING_FEN,
	timer: DEFAULT_TIMERS,
	increment: DEFAULT_INCREMENT,
	startTime: null,
	check: { white: false, black: false },
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
	squares: SQUARES,
};
