import type { Piece, PiecePositionInfoType, Side } from '$lib/types/chess.types';

export const getPositionStringFromPositions = (positions: PiecePositionInfoType[]): string => {
	const sortedPositions = positions.sort((a, b) => a.square.index - b.square.index);

	const rows = [];

	for (let i = 0; i < 8; i++) {
		let row: string[] = [];

		for (let j = 0; j < 8; j++) {
			const squareIndex = i * 8 + j;
			const piece = sortedPositions.find((p) => p.square.index === squareIndex);

			if (piece) {
				row.push(getPieceChar(piece.piece, piece.side));
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
