import type { SquareInfoType } from '$lib/types/chess.types';

export const HEX_COLOR_REGEX = /^#[0-9A-F]{6}$/i;

export const PIECES = {
	PAWN: 'pawn',
	ROOK: 'rook',
	KNIGHT: 'knight',
	BISHOP: 'bishop',
	QUEEN: 'queen',
	KING: 'king',
} as const;

export const COLORS = {
	WHITE: 'white',
	BLACK: 'black',
} as const;

export const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const DEFAULT_BOARD_BOUNDARIES = {
	top: -1,
	right: -1,
	bottom: -1,
	left: -1,
};

export const PICE_VALUE = {
	[PIECES.PAWN]: 1,
	[PIECES.ROOK]: 5,
	[PIECES.KNIGHT]: 3,
	[PIECES.BISHOP]: 3,
	[PIECES.QUEEN]: 9,
	[PIECES.KING]: 0,
};

export const DEFAULT_TIMERS = {
	white: 600_000,
	black: 600_000,
	starting: 600_000,
};

export const DEFAULT_INCREMENT = {
	white: 5_000,
	black: 5_000,
};

export const DEFAULT_CASTLING_RIGHTS = {
	white: {
		kingSide: true,
		queenSide: true,
	},
	black: {
		kingSide: true,
		queenSide: true,
	},
};

export const SQUARES: Required<SquareInfoType>[] = [
	{ index: 0, code: 'a8' },
	{ index: 1, code: 'b8' },
	{ index: 2, code: 'c8' },
	{ index: 3, code: 'd8' },
	{ index: 4, code: 'e8' },
	{ index: 5, code: 'f8' },
	{ index: 6, code: 'g8' },
	{ index: 7, code: 'h8' },
	{ index: 8, code: 'a7' },
	{ index: 9, code: 'b7' },
	{ index: 10, code: 'c7' },
	{ index: 11, code: 'd7' },
	{ index: 12, code: 'e7' },
	{ index: 13, code: 'f7' },
	{ index: 14, code: 'g7' },
	{ index: 15, code: 'h7' },
	{ index: 16, code: 'a6' },
	{ index: 17, code: 'b6' },
	{ index: 18, code: 'c6' },
	{ index: 19, code: 'd6' },
	{ index: 20, code: 'e6' },
	{ index: 21, code: 'f6' },
	{ index: 22, code: 'g6' },
	{ index: 23, code: 'h6' },
	{ index: 24, code: 'a5' },
	{ index: 25, code: 'b5' },
	{ index: 26, code: 'c5' },
	{ index: 27, code: 'd5' },
	{ index: 28, code: 'e5' },
	{ index: 29, code: 'f5' },
	{ index: 30, code: 'g5' },
	{ index: 31, code: 'h5' },
	{ index: 32, code: 'a4' },
	{ index: 33, code: 'b4' },
	{ index: 34, code: 'c4' },
	{ index: 35, code: 'd4' },
	{ index: 36, code: 'e4' },
	{ index: 37, code: 'f4' },
	{ index: 38, code: 'g4' },
	{ index: 39, code: 'h4' },
	{ index: 40, code: 'a3' },
	{ index: 41, code: 'b3' },
	{ index: 42, code: 'c3' },
	{ index: 43, code: 'd3' },
	{ index: 44, code: 'e3' },
	{ index: 45, code: 'f3' },
	{ index: 46, code: 'g3' },
	{ index: 47, code: 'h3' },
	{ index: 48, code: 'a2' },
	{ index: 49, code: 'b2' },
	{ index: 50, code: 'c2' },
	{ index: 51, code: 'd2' },
	{ index: 52, code: 'e2' },
	{ index: 53, code: 'f2' },
	{ index: 54, code: 'g2' },
	{ index: 55, code: 'h2' },
	{ index: 56, code: 'a1' },
	{ index: 57, code: 'b1' },
	{ index: 58, code: 'c1' },
	{ index: 59, code: 'd1' },
	{ index: 60, code: 'e1' },
	{ index: 61, code: 'f1' },
	{ index: 62, code: 'g1' },
	{ index: 63, code: 'h1' },
];
