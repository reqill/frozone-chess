import type { FenNotationObjectType, PiecePositionInfoType, SquareInfoType } from "$lib/types/chess.types";
import { getFullSquareInfo } from "../fenNotationParser/getFullSquareInfo";

export const getLegalKingMoves = (gameObject: FenNotationObjectType, pieceInfo: PiecePositionInfoType) => {
    const { side, square } = pieceInfo;
    const { position } = gameObject;

    const legalMoves: SquareInfoType[] = []; 
    const tmpMoves: SquareInfoType[] = [];

    const canGoUp = square.index - 8 >= 0;
    const canGoDown = square.index + 8 <= 63;
    const canGoLeft = square.index % 8 !== 0;
    const canGoRight = square.index % 8 !== 7;

    const canGoUpLeft = canGoUp && canGoLeft;
    const canGoUpRight = canGoUp && canGoRight;
    const canGoDownLeft = canGoDown && canGoLeft;
    const canGoDownRight = canGoDown && canGoRight;

    if (canGoUp) {
        tmpMoves.push(getFullSquareInfo(square.index - 8));
    }

    if (canGoDown) {
        tmpMoves.push(getFullSquareInfo(square.index + 8));
    }

    if (canGoLeft) {
        tmpMoves.push(getFullSquareInfo(square.index - 1));
    }

    if (canGoRight) {
        tmpMoves.push(getFullSquareInfo(square.index + 1));
    }

    if (canGoUpLeft) {
        tmpMoves.push(getFullSquareInfo(square.index - 9));
    }

    if (canGoUpRight) {
        tmpMoves.push(getFullSquareInfo(square.index - 7));
    }

    if (canGoDownLeft) {
        tmpMoves.push(getFullSquareInfo(square.index + 7));
    }

    if (canGoDownRight) {
        tmpMoves.push(getFullSquareInfo(square.index + 9));
    }

    for (const move of tmpMoves) {
        const squareInfo = position.find((pos) => pos.square.index === move.index);

        if (!squareInfo?.piece) {
            legalMoves.push(move);
            continue;
        }

        if (squareInfo?.side && squareInfo.side !== side) {
            legalMoves.push(move);
            continue;
        }
    }

    return legalMoves;
}