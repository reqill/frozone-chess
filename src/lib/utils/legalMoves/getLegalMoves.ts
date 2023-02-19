import type { FenNotationObjectType, PiecePositionInfoType, SquareInfoType } from "$lib/types/chess.types";
import { getLegalBishopMoves } from "./getLegalBishopMoves";
import { getLegalKingMoves } from "./getLegalKingMoves";
import { getLegalKnightMoves } from "./getLegalKnightMoves";
import { getLegalPawnMoves } from "./getLegalPawnMoves";
import { getLegalQueenMoves } from "./getLegalQueenMoves";
import { getLegalRookMoves } from "./getLegalRookMoves";

export const getLegalMoves = (gameObject: FenNotationObjectType, pieceInfo?: PiecePositionInfoType) => {
    if (!pieceInfo || !pieceInfo.piece || !pieceInfo.square || pieceInfo.side !== gameObject.move) {
        return [];
    }

    const legalMoves: Required<SquareInfoType>[] = [];

    switch (pieceInfo.piece) {
        case "pawn":
            legalMoves.push(...getLegalPawnMoves(gameObject, pieceInfo));
            break;
        case "rook":
            legalMoves.push(...getLegalRookMoves(gameObject, pieceInfo));
            break;
        case "knight":
            legalMoves.push(...getLegalKnightMoves(gameObject, pieceInfo));
            break;
        case "bishop":
            legalMoves.push(...getLegalBishopMoves(gameObject, pieceInfo));
            break;
        case "queen":
            legalMoves.push(...getLegalQueenMoves(gameObject, pieceInfo));
            break;
        case "king":
            legalMoves.push(...getLegalKingMoves(gameObject, pieceInfo));
            break;
        default:
            break;
    }

    return legalMoves;
}