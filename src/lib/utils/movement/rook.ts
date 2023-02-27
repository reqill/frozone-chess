import type { PieceType, SquareInfoType } from '$lib/types/chess.types';
import type { PositionStoreValueType } from '$lib/types/store.types';
import type { PieceMoveMetaType } from '$lib/types/utils.types';
import { getFullSquareInfo } from '../fenNotationParser/getFullSquareInfo';
import { isInRange } from './isInRange';

export const rook = (
	positions: PositionStoreValueType,
	piece: PieceType,
	meta?: PieceMoveMetaType
) => {
	const { side, position } = piece;

	const possibleMoves: SquareInfoType[] = [];
	const attackMoves: SquareInfoType[] = [];

	// up
	for (let i = position.index - 8; i >= 0; i -= 8) {
		const currentPosition = getFullSquareInfo(i);
		if (!currentPosition) throw new Error('Invalid position | out of range');

		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
			continue;
		}

		if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}

		break;
	}

	// down
	for (let i = position.index + 8; i <= 63; i += 8) {
		const currentPosition = getFullSquareInfo(i);
		if (!currentPosition) throw new Error('Invalid position | out of range');

		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
			continue;
		}

		if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}

		break;
	}

	// left
	for (let i = position.index - 1; i >= 0 && i % 8 !== 7; i -= 1) {
		if (i === position.index) continue;

		const currentPosition = getFullSquareInfo(i);
		if (!currentPosition) throw new Error('Invalid position | out of range');

		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
			continue;
		}

		if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}

		break;
	}

	// right
	for (let i = position.index + 1; i <= 63 && i % 8 !== 0; i += 1) {
		if (i === position.index) continue;

		const currentPosition = getFullSquareInfo(i);
		if (!currentPosition) throw new Error('Invalid position | out of range');

		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
			continue;
		}

		if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}

		break;
	}

	possibleMoves.push(...attackMoves);

	possibleMoves.filter((item, index) => possibleMoves.indexOf(item) === index && isInRange(item));
	attackMoves.filter((item, index) => attackMoves.indexOf(item) === index && isInRange(item));

	return { possibleMoves, attackMoves };
};
