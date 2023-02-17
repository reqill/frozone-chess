import type { FenNotationObjectType } from "$lib/types/chess.types";
import { getCastlingRightsFromString } from "./getCastlingRightsFromString";
import { getFullSquareInfo } from "./getFullSquareInfo";
import { stringPositionToObject } from "./stringPositionToObject";

export const parseFanNotation = (fen: string): FenNotationObjectType => {
    const [positionStr, moveStr, castlingStr, enPassantStr, halfMoveClockStr, fullMoveNumberStr] = fen.split(" ");

    const position = stringPositionToObject(positionStr);
    const move = moveStr === "w" ? "white" : "black";
    const castling = getCastlingRightsFromString(castlingStr);
    const enPassant = getFullSquareInfo(enPassantStr);
    const halfMoveClock = parseInt(halfMoveClockStr);
    const fullMoveNumber = parseInt(fullMoveNumberStr);

    return {
        position,
        move,
        castling,
        enPassant,
        halfMoveClock,
        fullMoveNumber
    };
}