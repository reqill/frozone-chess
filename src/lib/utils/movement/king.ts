import { MOVE_INDEX_CHANGE } from '$lib/constants/movement.constants';
import type { PieceType, SquareInfoType } from '$lib/types/chess.types';
import type { PositionStoreValueType } from '$lib/types/store.types';
import type { PieceMoveMetaType } from '$lib/types/utils.types';
import { getFullSquareInfo } from '../fenNotationParser/getFullSquareInfo';

export const king = (
	positions: PositionStoreValueType,
	piece: PieceType,
	meta: PieceMoveMetaType
) => {
	const {
		side,
		position,
		meta: { firstMove },
	} = piece;
	const castlingRights = meta.castlingRights[piece.side];

	const possibleMoves: SquareInfoType[] = [];
	const attackMoves: SquareInfoType[] = [];

	// move up
	if (position.index + MOVE_INDEX_CHANGE.UP >= 0) {
		const currentPosition = getFullSquareInfo(position.index + MOVE_INDEX_CHANGE.UP);
		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
		} else if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}
	}

	// move down
	if (position.index + MOVE_INDEX_CHANGE.DOWN <= 63) {
		const currentPosition = getFullSquareInfo(position.index + MOVE_INDEX_CHANGE.DOWN);
		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
		} else if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}
	}

	// move left
	if (position.index % 8 !== 0) {
		const currentPosition = getFullSquareInfo(position.index + MOVE_INDEX_CHANGE.LEFT);
		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
		} else if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}
	}

	// move right
	if (position.index % 8 !== 7) {
		const currentPosition = getFullSquareInfo(position.index + MOVE_INDEX_CHANGE.RIGHT);
		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
		} else if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}
	}

	// move up left
	if (position.index + MOVE_INDEX_CHANGE.UP_LEFT >= 0 && position.index % 8 !== 0) {
		const currentPosition = getFullSquareInfo(position.index + MOVE_INDEX_CHANGE.UP_LEFT);
		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
		} else if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}
	}

	// move up right
	if (position.index + MOVE_INDEX_CHANGE.UP_RIGHT <= 63 && position.index % 8 !== 7) {
		const currentPosition = getFullSquareInfo(position.index + MOVE_INDEX_CHANGE.UP_RIGHT);
		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
		} else if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}
	}

	// move down left
	if (position.index + MOVE_INDEX_CHANGE.DOWN_LEFT >= 0 && position.index % 8 !== 0) {
		const currentPosition = getFullSquareInfo(position.index + MOVE_INDEX_CHANGE.DOWN_LEFT);
		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
		} else if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}
	}

	// move down right
	if (position.index + MOVE_INDEX_CHANGE.DOWN_RIGHT <= 63 && position.index % 8 !== 7) {
		const currentPosition = getFullSquareInfo(position.index + MOVE_INDEX_CHANGE.DOWN_RIGHT);
		const pieceAtPosition = positions.get(currentPosition);

		if (!pieceAtPosition) {
			possibleMoves.push(currentPosition);
		} else if (pieceAtPosition.side !== side) {
			attackMoves.push(currentPosition);
		}
	}

	// king side castling
	if (castlingRights.kingSide && firstMove) {
		const kingSideRook = positions.get(getFullSquareInfo(position.index + 3));
		const pieceBetweenKingAndRook1 = positions.get(getFullSquareInfo(position.index + 2));
		const pieceBetweenKingAndRook2 = positions.get(getFullSquareInfo(position.index + 1));

		if (
			kingSideRook &&
			kingSideRook.type === 'rook' &&
			kingSideRook.side === side &&
			!pieceBetweenKingAndRook1 &&
			!pieceBetweenKingAndRook2
		) {
			possibleMoves.push(getFullSquareInfo(position.index + 2));
		}
	}

	// queen side castling
	if (castlingRights.queenSide) {
		const queenSideRook = positions.get(getFullSquareInfo(position.index - 4));
		const pieceBetweenKingAndRook1 = positions.get(getFullSquareInfo(position.index - 3));
		const pieceBetweenKingAndRook2 = positions.get(getFullSquareInfo(position.index - 2));
		const pieceBetweenKingAndRook3 = positions.get(getFullSquareInfo(position.index - 1));

		if (
			queenSideRook &&
			queenSideRook.type === 'rook' &&
			queenSideRook.side === side &&
			!pieceBetweenKingAndRook1 &&
			!pieceBetweenKingAndRook2 &&
			!pieceBetweenKingAndRook3
		) {
			possibleMoves.push(getFullSquareInfo(position.index - 2));
		}
	}

	return { possibleMoves, attackMoves };
};
