import { MOVE_INDEX_CHANGE } from '$lib/constants/movement.constants';
import type { PieceType, SquareInfoType } from '$lib/types/chess.types';
import type { PositionStoreValueType } from '$lib/types/store.types';
import type { PieceMoveMetaType } from '$lib/types/utils.types';
import { getFullSquareInfo } from '../fenNotationParser/getFullSquareInfo';
import { isInRange } from './isInRange';

export const bishop = (
	positions: PositionStoreValueType,
	piece: PieceType,
	meta?: PieceMoveMetaType
) => {
	const { side, position } = piece;

	const possibleMoves: SquareInfoType[] = [];
	const attackMoves: SquareInfoType[] = [];

	// left up
	for (let i = position.index; i % 8 !== 0 && i >= 0; i += MOVE_INDEX_CHANGE.UP_LEFT) {
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

	// right up
	for (let i = position.index; i % 8 !== 7 && i >= 0; i += MOVE_INDEX_CHANGE.UP_RIGHT) {
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

	// left down
	for (let i = position.index; i % 8 !== 0 && i <= 63; i += MOVE_INDEX_CHANGE.DOWN_LEFT) {
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

	// right down
	for (let i = position.index; i % 8 !== 7 && i <= 63; i += MOVE_INDEX_CHANGE.DOWN_RIGHT) {
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
