import type {
	FenNotationObjectType,
	PiecePositionInfoType,
	SquareInfoType,
} from '$lib/types/chess.types';
import { updateGameObject } from '../updateGameObject';
import { getLegalMoves } from './getLegalMoves';

export const isLegalMove = (
	gameObject: FenNotationObjectType,
	pieceToMove?: PiecePositionInfoType,
	endSquare?: SquareInfoType
) => {
	if (!pieceToMove || !endSquare) {
		return false;
	}

	const isOwnPieceOnEndSquare =
		gameObject.position.find((pos) => pos.square.index === endSquare.index)?.side ===
		pieceToMove.side;

	const legalMoves = getLegalMoves(gameObject, pieceToMove);

	const baseCondition = legalMoves.some((move) => move.index === endSquare.index) &&
	pieceToMove.side === gameObject.move &&
	pieceToMove.square.index !== endSquare.index &&
	!isOwnPieceOnEndSquare

	if(!baseCondition){
		return false;
	}
	
	// let tmpGameObject = { ...gameObject };
	// tmpGameObject = updateGameObject(tmpGameObject, pieceToMove, tmpGameObject.position.find((pos) => pos.square.index === endSquare.index));

	// const willKingBeInCheck = tmpGameObject.isKingInCheck[tmpGameObject.move]
	
	// if(willKingBeInCheck){
	// 	return false;
	// }

	return true;
};
