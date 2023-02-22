import type { Piece, PieceType, Side, SquareInfoType } from '$lib/types/chess.types';
import { getFullSquareInfo } from './getFullSquareInfo';

export const getPositionStringFromPositions = (
	positions: Map<SquareInfoType, PieceType>
): string => {
	const rows = [];

	for (let i = 0; i < 8; i++) {
		let row: string[] = [];

		for (let j = 0; j < 8; j++) {
			const square = getFullSquareInfo(i * 8 + j);
			if (!square) throw new Error('Invalid position | out of range');

			const piece = positions.get(square);

			if (piece) {
				row.push(getPieceChar(piece.type, piece.side));
			} else {
				row.push('1');
			}

			if (row.length === 8) {
				let rowStr = row.join('');
				rowStr = rowStr.replace(/11111111/g, '8');
				rowStr = rowStr.replace(/1111111/g, '7');
				rowStr = rowStr.replace(/111111/g, '6');
				rowStr = rowStr.replace(/11111/g, '5');
				rowStr = rowStr.replace(/1111/g, '4');
				rowStr = rowStr.replace(/111/g, '3');
				rowStr = rowStr.replace(/11/g, '2');

				row = rowStr.split('');
			}
		}

		rows.push(row.join(''));
	}

	return rows.join('/');
};

const getPieceChar = (piece: Piece, side: Side): string => {
	const pieceChar = piece === 'knight' ? 'n' : piece[0];

	if (side === 'white') {
		return pieceChar.toUpperCase();
	} else {
		return pieceChar;
	}
};
