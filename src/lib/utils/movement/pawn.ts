import { MOVE_INDEX_CHANGE } from '$lib/constants/movement.constants';
import type { PieceType, SquareInfoType } from '$lib/types/chess.types';
import type { PositionStoreValueType } from '$lib/types/store.types';
import type { PieceMoveMetaType } from '$lib/types/utils.types';
import { getFullSquareInfo } from '../fenNotationParser/getFullSquareInfo';
import { isInRange } from './isInRange';

export const pawn = (
	positions: PositionStoreValueType,
	piece: PieceType,
	meta: PieceMoveMetaType
) => {
	const { enPassant } = meta;
	const { side, position } = piece;
	const { firstMove } = piece.meta;

	const pieceInFront = positions.get(
		getFullSquareInfo(position + side === 'white' ? MOVE_INDEX_CHANGE.UP : MOVE_INDEX_CHANGE.DOWN)
	);
	const pieceInFront2 = positions.get(
		getFullSquareInfo(
			position + side === 'white' ? MOVE_INDEX_CHANGE.DOUBLE_UP : MOVE_INDEX_CHANGE.DOUBLE_UP
		)
	);
	const captureLeft =
		position.index % 8 !== 0
			? positions.get(
					getFullSquareInfo(
						position + side === 'white' ? MOVE_INDEX_CHANGE.UP_LEFT : MOVE_INDEX_CHANGE.DOWN_LEFT
					)
			  )
			: 'NOT_VALID';
	const captureRight =
		position.index % 8 !== 7
			? positions.get(
					getFullSquareInfo(
						position + side === 'white' ? MOVE_INDEX_CHANGE.UP_RIGHT : MOVE_INDEX_CHANGE.DOWN_RIGHT
					)
			  )
			: 'NOT_VALID';

	const possibleMoves: SquareInfoType[] = [];
	const attackMoves: SquareInfoType[] = [];

	if (firstMove && !pieceInFront && !pieceInFront2) {
		possibleMoves.push(
			getFullSquareInfo(
				position + side === 'white' ? MOVE_INDEX_CHANGE.DOUBLE_UP : MOVE_INDEX_CHANGE.DOUBLE_DOWN
			)
		);
	}

	if (!pieceInFront) {
		possibleMoves.push(
			getFullSquareInfo(position + side === 'white' ? MOVE_INDEX_CHANGE.UP : MOVE_INDEX_CHANGE.DOWN)
		);
	}

	if (captureLeft && captureLeft !== 'NOT_VALID' && captureLeft.side !== side) {
		attackMoves.push(
			getFullSquareInfo(
				position + side === 'white' ? MOVE_INDEX_CHANGE.UP_LEFT : MOVE_INDEX_CHANGE.DOWN_LEFT
			)
		);
	}

	if (captureRight && captureRight !== 'NOT_VALID' && captureRight.side !== side) {
		attackMoves.push(
			getFullSquareInfo(
				position + side === 'white' ? MOVE_INDEX_CHANGE.UP_RIGHT : MOVE_INDEX_CHANGE.DOWN_RIGHT
			)
		);
	}

	if (enPassant && (position.index >= 24 || position.index <= 31) && side === 'white') {
		attackMoves.push(enPassant);
	}

	if (enPassant && (position.index >= 32 || position.index <= 39) && side === 'black') {
		attackMoves.push(enPassant);
	}

	possibleMoves.push(...attackMoves);

	possibleMoves.filter((item, index) => possibleMoves.indexOf(item) === index && isInRange(item));
	attackMoves.filter((item, index) => attackMoves.indexOf(item) === index && isInRange(item));

	return { possibleMoves, attackMoves };
};
