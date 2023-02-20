import type { FenNotationObjectType, PiecePositionInfoType } from '$lib/types/chess.types';
import { getFullSquareInfo } from './fenNotationParser/getFullSquareInfo';
import { isKingInCheck } from './isKingInCheck';

export const updateGameObject = (
	gameObject: FenNotationObjectType,
	oldPosition?: PiecePositionInfoType,
	newPosition?: PiecePositionInfoType
) => {
	if (!newPosition || !oldPosition || oldPosition.square.index === newPosition.square.index)
		return gameObject;

	const tmpGameObject = { ...gameObject };

	if (!oldPosition) {
		throw new Error(`No piece found at ${oldPosition}`);
	}

	tmpGameObject.position = tmpGameObject.position.filter(
		(pos) => pos.square.index !== oldPosition.square.index
	);

	const pieceToCapture = tmpGameObject.position.find(
		(pos) => pos.square.index === newPosition.square.index
	);

	if (pieceToCapture) {
		tmpGameObject.position = tmpGameObject.position.filter((pos) => pos !== pieceToCapture);
	}

	// castling
	const kingMovement = newPosition.square.index - oldPosition.square.index;
	if (oldPosition.piece === 'king' && Math.abs(kingMovement) === 2) {
		const rookToMove = tmpGameObject.position.find(
			(pos) =>
				pos.piece === 'rook' &&
				pos.side === oldPosition.side &&
				(kingMovement > 0
					? pos.square.index % 8 === 7 && tmpGameObject.castling[oldPosition.side].kingSide
					: pos.square.index % 8 === 0 && tmpGameObject.castling[oldPosition.side].queenSide)
		);

		if (rookToMove) {
			tmpGameObject.position = tmpGameObject.position.filter((pos) => pos !== rookToMove);
			tmpGameObject.position.push({
				...rookToMove,
				square: getFullSquareInfo(
					oldPosition.square.index < newPosition.square.index
						? oldPosition.square.index + 1
						: oldPosition.square.index - 1
				),
			});
		}
	}

	// Disable castling if king moved
	if (oldPosition.piece === 'king') {
		tmpGameObject.castling[oldPosition.side].kingSide = false;
		tmpGameObject.castling[oldPosition.side].queenSide = false;
	}

	// Disable castling if queen rook moved
	if (oldPosition.piece === 'rook' && oldPosition.square.index % 8 === 0) {
		tmpGameObject.castling[oldPosition.side].queenSide = false;
	}

	// Disable castling if king rook moved
	if (oldPosition.piece === 'rook' && oldPosition.square.index % 8 === 7) {
		tmpGameObject.castling[oldPosition.side].kingSide = false;
	}

	// check if pawn did double move so en passant is possible
	if (
		oldPosition.piece === 'pawn' &&
		Math.abs(oldPosition.square.index - newPosition.square.index) === 16
	) {
		tmpGameObject.enPassant = getFullSquareInfo(
			(oldPosition.square.index + newPosition.square.index) / 2
		);
	} else {
		tmpGameObject.enPassant = getFullSquareInfo('-');
	}

	// check if pawn did en passant capture on left side
	if (
		oldPosition.piece === 'pawn' &&
		Math.abs((oldPosition.square.index % 8) - (newPosition.square.index % 8)) === 1 &&
		!pieceToCapture
	) {
		const enPassantCaptureSquare = getFullSquareInfo(
			newPosition.square.index + (newPosition.side === 'white' ? 8 : -8)
		);
		const enPassantCapturePiece = tmpGameObject.position.find(
			(pos) => pos.square.index === enPassantCaptureSquare.index
		);

		if (enPassantCapturePiece) {
			tmpGameObject.position = tmpGameObject.position.filter(
				(pos) => pos !== enPassantCapturePiece
			);
		}
	}

	tmpGameObject.position.push({
		piece: newPosition.piece,
		side: newPosition.side,
		square: newPosition.square,
	});

	tmpGameObject.isKingInCheck[tmpGameObject.move === 'white' ? 'black' : 'white'] = isKingInCheck(
		tmpGameObject,
		tmpGameObject.move
	);

	tmpGameObject.move = tmpGameObject.move === 'white' ? 'black' : 'white';

	return tmpGameObject;
};
