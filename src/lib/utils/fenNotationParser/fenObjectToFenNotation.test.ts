import { describe, it, expect } from 'vitest';
import { fenObjectToFenNotation } from './fenObjectToFenNotation';
import type { FenNotationObjectType } from '$lib/types/chess.types';

describe('fenObjectToFenNotation', () => {
	const testCases = [
		{
			input: {
				position: [
					{ piece: 'rook', side: 'black', square: { index: 0, code: 'a8' } },
					{ piece: 'knight', side: 'black', square: { index: 1, code: 'b8' } },
					{ piece: 'bishop', side: 'black', square: { index: 2, code: 'c8' } },
					{ piece: 'queen', side: 'black', square: { index: 3, code: 'd8' } },
					{ piece: 'king', side: 'black', square: { index: 4, code: 'e8' } },
					{ piece: 'bishop', side: 'black', square: { index: 5, code: 'f8' } },
					{ piece: 'knight', side: 'black', square: { index: 6, code: 'g8' } },
					{ piece: 'rook', side: 'black', square: { index: 7, code: 'h8' } },
					{ piece: 'pawn', side: 'black', square: { index: 8, code: 'a7' } },
					{ piece: 'pawn', side: 'black', square: { index: 9, code: 'b7' } },
					{ piece: 'pawn', side: 'black', square: { index: 10, code: 'c7' } },
					{ piece: 'pawn', side: 'black', square: { index: 11, code: 'd7' } },
					{ piece: 'pawn', side: 'black', square: { index: 15, code: 'h7' } },
					{ piece: 'pawn', side: 'white', square: { index: 48, code: 'a2' } },
					{ piece: 'pawn', side: 'white', square: { index: 51, code: 'd2' } },
					{ piece: 'pawn', side: 'white', square: { index: 52, code: 'e2' } },
					{ piece: 'pawn', side: 'white', square: { index: 53, code: 'f2' } },
					{ piece: 'pawn', side: 'white', square: { index: 54, code: 'g2' } },
					{ piece: 'pawn', side: 'white', square: { index: 55, code: 'h2' } },
					{ piece: 'rook', side: 'white', square: { index: 56, code: 'a1' } },
					{ piece: 'knight', side: 'white', square: { index: 57, code: 'b1' } },
					{ piece: 'bishop', side: 'white', square: { index: 58, code: 'c1' } },
					{ piece: 'queen', side: 'white', square: { index: 59, code: 'd1' } },
					{ piece: 'king', side: 'white', square: { index: 60, code: 'e1' } },
					{ piece: 'bishop', side: 'white', square: { index: 61, code: 'f1' } },
					{ piece: 'knight', side: 'white', square: { index: 62, code: 'g1' } },
					{ piece: 'rook', side: 'white', square: { index: 63, code: 'h1' } },
				],
				move: 'black',
				castling: {
					white: {
						kingSide: true,
						queenSide: false,
					},
					black: {
						kingSide: true,
						queenSide: true,
					},
				},
				enPassant: { index: 42, code: 'c3' },
				halfMoveClock: 2,
				fullMoveNumber: 4,
			},
			expected: 'rnbqkbnr/pppp3p/8/8/8/8/P2PPPPP/RNBQKBNR b Kkq c3 2 4',
		},
	];

	it('should return the correct FEN notation', () => {
		testCases.forEach(({ input, expected }) => {
			expect(fenObjectToFenNotation(input as FenNotationObjectType)).toEqual(expected);
		});
	});
});
