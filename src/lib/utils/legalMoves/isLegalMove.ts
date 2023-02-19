import type { FenNotationObjectType, PiecePositionInfoType, SquareInfoType } from "$lib/types/chess.types";
import { getLegalMoves } from "./getLegalMoves";

export const isLegalMove = (gameObject: FenNotationObjectType, pieceToMove?: PiecePositionInfoType, endSquare?: SquareInfoType ) => {
    if (!pieceToMove || !endSquare) {
        return false;
    }

    const isOwnPieceOnEndSquare = gameObject.position.find((pos) => pos.square.index === endSquare.index)?.side === pieceToMove.side;

    const legalMoves = getLegalMoves(gameObject, pieceToMove);
    return legalMoves.some((move) => move.index === endSquare.index) && pieceToMove.side === gameObject.move && pieceToMove.square.index !== endSquare.index && !isOwnPieceOnEndSquare ;
}