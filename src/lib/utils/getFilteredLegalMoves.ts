import type { FenNotationObjectType, PiecePositionInfoType, SquareInfoType } from "$lib/types/chess.types";
import { getLegalMoves } from "./legalMoves";
import { updateGameObject } from "./updateGameObject";

export const getFilteredLegalMoves = (gameObject: FenNotationObjectType, pieceToMove: PiecePositionInfoType): SquareInfoType[] => {
    const legalMoves = getLegalMoves(gameObject, pieceToMove);


    // const filteredLegalMoves = legalMoves.filter((move) => {
    //     let tmpGameObject = { ...gameObject };

    //     tmpGameObject = updateGameObject(tmpGameObject, pieceToMove, {...pieceToMove, square: move});   

    //     return !tmpGameObject.isKingInCheck[tmpGameObject.move === "white" ? "black" : "white"];
    // });

    return legalMoves;
}