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
	for (
		let i = position.index + MOVE_INDEX_CHANGE.UP_LEFT;
		i % 8 !== 7 && i >= 0;
		i += MOVE_INDEX_CHANGE.UP_LEFT
	) {
		const currentPosition = getFullSquareInfo(i);
		if (!currentPosition) throw new Error('Invalid position for move left up to index: ' + i);

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
	for (
		let i = position.index + MOVE_INDEX_CHANGE.UP_RIGHT;
		i % 8 !== 0 && i >= 0;
		i += MOVE_INDEX_CHANGE.UP_RIGHT
	) {
		const currentPosition = getFullSquareInfo(i);
		if (!currentPosition) throw new Error('Invalid position for move right up to index: ' + i);

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
	for (
		let i = position.index + MOVE_INDEX_CHANGE.DOWN_LEFT;
		i % 8 !== 7 && i <= 63;
		i += MOVE_INDEX_CHANGE.DOWN_LEFT
	) {
		const currentPosition = getFullSquareInfo(i);
		if (!currentPosition) throw new Error('Invalid position for move left down to index: ' + i);

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
	for (
		let i = position.index + MOVE_INDEX_CHANGE.DOWN_RIGHT;
		i % 8 !== 0 && i <= 63;
		i += MOVE_INDEX_CHANGE.DOWN_RIGHT
	) {
		const currentPosition = getFullSquareInfo(i);
		if (!currentPosition) throw new Error('Invalid position for move right down to index: ' + i);

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
