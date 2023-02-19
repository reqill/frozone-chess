import type { FenNotationObjectType, Side } from "$lib/types/chess.types";
import { getAllAttackedSquares } from "./legalMoves";

export const isKingInCheck = (gameObject: FenNotationObjectType, side: Side): boolean => {
    const kingPosition = gameObject.position.find(pos => pos.piece === "king" && pos.side !== side);

    if (!kingPosition) {
        throw new Error("King not found - game object is invalid");
    }

    const attackedSquares = getAllAttackedSquares(gameObject, side);

    const isKingAttacked = attackedSquares.some(square => square.index === kingPosition.square.index);
    
    return isKingAttacked
}