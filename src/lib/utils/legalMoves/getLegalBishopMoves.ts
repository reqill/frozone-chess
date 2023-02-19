import type { FenNotationObjectType, PiecePositionInfoType, SquareInfoType } from "$lib/types/chess.types";
import { getFullSquareInfo } from "../fenNotationParser/getFullSquareInfo";

export const getLegalBishopMoves = (gameObject: FenNotationObjectType, pieceInfo: PiecePositionInfoType) => {
    const { side, square } = pieceInfo;
    const { position } = gameObject;

    const legalMoves: SquareInfoType[] = []; 

    const colNum = square.index % 8;
    const rowNum = Math.floor(square.index / 8);
    const topLeftLimit = colNum > rowNum ? square.index - rowNum * 9 : square.index - colNum * 9;
    const topRightLimit = square.index - (7 - colNum) * 7
    const bottomLeftLimit = square.index + colNum * 7
    const bottomRightLimit = square.index + (7 - colNum) * 9
    
    // All square to top left
    for (let i = square.index; i >= topLeftLimit; i -= 9) {   
        const squareInfo = position.find((pos) => pos.square.index === i);

        if(i === square.index) {
            continue;
        }

        if (!squareInfo?.piece) {
            legalMoves.push(getFullSquareInfo(i));
            continue;
        }

        if (squareInfo?.side && squareInfo.side !== side) {
            legalMoves.push(getFullSquareInfo(i));
            break;
        } else {
            break;
        }
    }

    // All square to top right
    for(let i = square.index; i >= topRightLimit; i -= 7) {
        const squareInfo = position.find((pos) => pos.square.index === i);

        if(i === square.index) {
            continue;
        }

        if (!squareInfo?.piece) {
            legalMoves.push(getFullSquareInfo(i));
            continue;
        }

        if (squareInfo?.side && squareInfo.side !== side) {
            legalMoves.push(getFullSquareInfo(i));
            break;
        } else {
            break;
        }
    }

    // All square to bottom left
    for(let i = square.index; i <= bottomLeftLimit; i += 7) {
        const squareInfo = position.find((pos) => pos.square.index === i);

        if(i === square.index) {
            continue;
        }

        if (!squareInfo?.piece) {
            legalMoves.push(getFullSquareInfo(i));
            continue;
        }

        if (squareInfo?.side && squareInfo.side !== side) {
            legalMoves.push(getFullSquareInfo(i));
            break;
        } else {
            break;
        }
    }

    // All square to bottom right
    for(let i = square.index; i <= bottomRightLimit; i += 9) {
        const squareInfo = position.find((pos) => pos.square.index === i);

        if(i === square.index) {
            continue;
        }

        if (!squareInfo?.piece) {
            legalMoves.push(getFullSquareInfo(i));
            continue;
        }

        if (squareInfo?.side && squareInfo.side !== side) {
            legalMoves.push(getFullSquareInfo(i));
            break;
        } else {
            break;
        }
    }

    return legalMoves;
}