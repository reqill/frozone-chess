import type { FenNotationObjectType, PiecePositionInfoType, SquareInfoType } from "$lib/types/chess.types";
import { getFullSquareInfo } from "../fenNotationParser/getFullSquareInfo";

export const getLegalPawnMoves = (gameObject: FenNotationObjectType, pieceInfo: PiecePositionInfoType) => {
    const { side, square } = pieceInfo;
    const { position, enPassant } = gameObject;

    const hasPawnMoved = side === "white" ? (square.index <= 55 && square.index >= 48) : (square.index <= 15 && square.index >= 8);

    const legalMoves: SquareInfoType[] = [];

    const forwardSquare = side === "black" ? square.index + 8 : square.index - 8;
    const doubleForwardSquare = side === "black" ? square.index + 16 : square.index - 16;
    const leftCapture = square.index % 8 !== 0 ? (side === "black" ? square.index + 7 : square.index - 7): -1;
    const rightCapture = square.index % 7 !== 0 ? (side === "black" ? square.index + 9 : square.index - 9) : -1;

    const isOnEnPassantEnemySquare = side === "white" ? square.index >= 24 && square.index <= 31 : square.index >= 32 && square.index <= 39;

    const forwardSquareInfo = position.find((pos) => pos.square.index === forwardSquare);
    const doubleForwardSquareInfo = position.find((pos) => pos.square.index === doubleForwardSquare);
    const leftCaptureInfo = position.find((pos) => pos.square.index === leftCapture);
    const rightCaptureInfo =  position.find((pos) => pos.square.index === rightCapture);

    if (!forwardSquareInfo?.piece) {
        legalMoves.push(getFullSquareInfo(forwardSquare));
    }

    if (!forwardSquareInfo?.piece && !doubleForwardSquareInfo?.piece && hasPawnMoved) {
        legalMoves.push(getFullSquareInfo(doubleForwardSquare),);
    }

    if ((leftCaptureInfo?.side !== side && leftCaptureInfo?.piece) || (enPassant?.index && enPassant.index === leftCapture && isOnEnPassantEnemySquare)) {
        legalMoves.push( getFullSquareInfo(leftCapture));
    }

    if ((rightCaptureInfo?.side !== side && rightCaptureInfo?.piece) || (enPassant?.index && enPassant.index === rightCapture && isOnEnPassantEnemySquare)) {
        legalMoves.push(getFullSquareInfo(rightCapture));
    }

    return legalMoves as Required<SquareInfoType>[];
}