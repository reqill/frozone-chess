import type {
	FenNotationObjectType,
	PiecePositionInfoType,
	SquareInfoType,
} from '$lib/types/chess.types';
import { getFullSquareInfo } from './fenNotationParser/getFullSquareInfo';
import { isKingInCheck } from './isKingInCheck';
import { getAllAttackedSquares, getLegalMoves } from './legalMoves';
import { updateGameObject } from './updateGameObject';

export const getFilteredLegalMoves = (
	gameObject: FenNotationObjectType,
	pieceToMove: PiecePositionInfoType
): SquareInfoType[] => {
	const legalMoves = getLegalMoves(gameObject, pieceToMove);
	const movesAfterKingIsChecked: SquareInfoType[] = [];
	const castlePreventingMoves: SquareInfoType[] = [];

	legalMoves.forEach((move) => {
		let tmpGameObject = JSON.parse(JSON.stringify(gameObject)) as FenNotationObjectType;
		tmpGameObject = {
			...updateGameObject(tmpGameObject, pieceToMove, { ...pieceToMove, square: move }),
		};

		const isKingChecked = isKingInCheck(tmpGameObject, tmpGameObject.move);
		if (isKingChecked) {
			movesAfterKingIsChecked.push(move);
		}
	});

	if (pieceToMove.piece === 'king') {
		if (
			gameObject.castling[pieceToMove.side].queenSide &&
			movesAfterKingIsChecked.find((square)=>square.index === (pieceToMove.square.index - 1))
		) {
			castlePreventingMoves.push(
				getFullSquareInfo(pieceToMove.square.index - 2)
			);

		} else if (
			gameObject.castling[pieceToMove.side].kingSide &&
			movesAfterKingIsChecked.find((square)=>square.index === (pieceToMove.square.index + 1))
		) {
			castlePreventingMoves.push(
				getFullSquareInfo(pieceToMove.square.index + 2)
			);
		}
	}
	return legalMoves.filter(
		(move) => !movesAfterKingIsChecked.includes(move) && !castlePreventingMoves.find((square)=>square.index === move.index)
	);
};
