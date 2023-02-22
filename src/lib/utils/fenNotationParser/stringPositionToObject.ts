import { StringifiedMap } from '$lib/common/map';
import type { FenNotationObjectType } from '$lib/types/chess.types';
import { getFullSquareInfo } from './getFullSquareInfo';
import { getPieceFromString } from './getPieceFromString';

export const stringPositionToObject = (position: string) => {
	const rows = position.split('/');
	const pieces: FenNotationObjectType['position'] = new StringifiedMap([]);

	if (rows.length !== 8) {
		throw new Error('Invalid position');
	}

	rows.forEach((row, rowIdx) => {
		let fileIndex = 0;

		for (let i = 0; i < row.length; i++) {
			const char = row[i];
			const charCode = char.charCodeAt(0);

			if (charCode >= 48 && charCode <= 57) {
				fileIndex += parseInt(char);
			} else {
				const piece = getPieceFromString(char);
				const index = 63 - ((7 - rowIdx) * 8 + (7 - fileIndex));
				const square = getFullSquareInfo(index);

				if (square === null) throw new Error('Invalid square');

				pieces.set(square, { ...piece, position: square });
				fileIndex++;
			}
		}
	});

	return pieces;
};
