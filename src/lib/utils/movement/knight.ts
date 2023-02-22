import { MOVE_INDEX_CHANGE } from '$lib/constants/movement.constants';
import type { PieceType, SquareInfoType } from '$lib/types/chess.types';
import type { PositionStoreValueType } from '$lib/types/store.types';
import type { PieceMoveMetaType } from '$lib/types/utils.types';
import { getFullSquareInfo } from '../fenNotationParser/getFullSquareInfo';
import { isInRange } from './isInRange';

export const knight = (
	positions: PositionStoreValueType,
	piece: PieceType,
	meta?: PieceMoveMetaType
) => {
	const { side, position } = piece;

	const possibleMoves: SquareInfoType[] = [];
	const attackMoves: SquareInfoType[] = [];

	// double up, single left
	if (position.index + MOVE_INDEX_CHANGE.KNIGHT_UP_UP_LEFT >= 0 && position.index % 8 !== 0) {
		const currentPosition = getFullSquareInfo(position.index + MOVE_INDEX_CHANGE.KNIGHT_UP_UP_LEFT);
		if (!currentPosition) throw new Error('Invalid position | out of range');

		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
		} else if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}
	}

	// double up, single right
	if (position.index + MOVE_INDEX_CHANGE.KNIGHT_UP_UP_RIGHT >= 0 && position.index % 8 !== 7) {
		const currentPosition = getFullSquareInfo(
			position.index + MOVE_INDEX_CHANGE.KNIGHT_UP_UP_RIGHT
		);
		if (!currentPosition) throw new Error('Invalid position | out of range');

		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
		} else if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}
	}

	// double down, single left
	if (position.index + MOVE_INDEX_CHANGE.KNIGHT_DOWN_DOWN_LEFT <= 63 && position.index % 8 !== 0) {
		const currentPosition = getFullSquareInfo(
			position.index + MOVE_INDEX_CHANGE.KNIGHT_DOWN_DOWN_LEFT
		);
		if (!currentPosition) throw new Error('Invalid position | out of range');

		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
		} else if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}
	}

	// double down, single right
	if (position.index + MOVE_INDEX_CHANGE.KNIGHT_DOWN_DOWN_RIGHT <= 63 && position.index % 8 !== 7) {
		const currentPosition = getFullSquareInfo(
			position.index + MOVE_INDEX_CHANGE.KNIGHT_DOWN_DOWN_RIGHT
		);
		if (!currentPosition) throw new Error('Invalid position | out of range');

		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
		} else if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}
	}

	// double left, single up
	if (position.index + MOVE_INDEX_CHANGE.KNIGHT_UP_LEFT_LEFT >= 0 && position.index % 8 > 1) {
		const currentPosition = getFullSquareInfo(
			position.index + MOVE_INDEX_CHANGE.KNIGHT_UP_LEFT_LEFT
		);
		if (!currentPosition) throw new Error('Invalid position | out of range');

		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
		} else if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}
	}

	// double left, single down
	if (position.index + MOVE_INDEX_CHANGE.KNIGHT_DOWN_LEFT_LEFT <= 63 && position.index % 8 > 1) {
		const currentPosition = getFullSquareInfo(
			position.index + MOVE_INDEX_CHANGE.KNIGHT_DOWN_LEFT_LEFT
		);
		if (!currentPosition) throw new Error('Invalid position | out of range');

		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
		} else if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}
	}

	// double right, single up
	if (position.index + MOVE_INDEX_CHANGE.KNIGHT_UP_RIGHT_RIGHT >= 0 && position.index % 8 < 6) {
		const currentPosition = getFullSquareInfo(
			position.index + MOVE_INDEX_CHANGE.KNIGHT_UP_RIGHT_RIGHT
		);
		if (!currentPosition) throw new Error('Invalid position | out of range');

		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
		} else if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}
	}

	// double right, single down
	if (position.index + MOVE_INDEX_CHANGE.KNIGHT_DOWN_RIGHT_RIGHT <= 63 && position.index % 8 < 6) {
		const currentPosition = getFullSquareInfo(
			position.index + MOVE_INDEX_CHANGE.KNIGHT_DOWN_RIGHT_RIGHT
		);
		if (!currentPosition) throw new Error('Invalid position | out of range');

		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
		} else if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}
	}

	possibleMoves.push(...attackMoves);

	possibleMoves.filter((item, index) => possibleMoves.indexOf(item) === index && isInRange(item));
	attackMoves.filter((item, index) => attackMoves.indexOf(item) === index && isInRange(item));

	return { possibleMoves, attackMoves };
};
