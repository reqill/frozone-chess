import type { FenNotationObjectType,  PiecePositionInfoType } from "$lib/types/chess.types";
import { getFullSquareInfo } from "./fenNotationParser/getFullSquareInfo";


export const updateGameObject = (gameObject: FenNotationObjectType, oldPosition?: PiecePositionInfoType, newPosition?: PiecePositionInfoType ) => {
    if(!newPosition || !oldPosition || oldPosition.square.index === newPosition.square.index) return gameObject;

    const tmpGameObject = {...gameObject};

    if (!oldPosition) {
        throw new Error(`No piece found at ${oldPosition}`);
    }

    tmpGameObject.position = tmpGameObject.position.filter((pos) => pos !== oldPosition);

    const pieceToCapture = tmpGameObject.position.find((pos) => pos.square.index === newPosition.square.index);

    if (pieceToCapture) {
        tmpGameObject.position = tmpGameObject.position.filter((pos) => pos !== pieceToCapture);
    }

    //TODO: add capturing logic
    //TODO: check legality of move

    // Disable castling if king moved
    if(oldPosition.piece === "king") {
        tmpGameObject.castling[oldPosition.side].kingSide = false;
        tmpGameObject.castling[oldPosition.side].queenSide = false;
    }

    // Disable castling if queen rook moved
    if(oldPosition.piece === "rook" && oldPosition.square.index % 8 === 0) {
        tmpGameObject.castling[oldPosition.side].queenSide = false;
    }

    // Disable castling if king rook moved
    if(oldPosition.piece === "rook" && oldPosition.square.index % 8 === 7) {
        tmpGameObject.castling[oldPosition.side].kingSide = false;
    }

    // check if pawn did double move so en passant is possible
    if (oldPosition.piece === "pawn" && Math.abs(oldPosition.square.index - newPosition.square.index) === 16) {
        tmpGameObject.enPassant = getFullSquareInfo((oldPosition.square.index + newPosition.square.index) / 2);
    } else {
        tmpGameObject.enPassant = getFullSquareInfo("-")
    }

    // check if pawn did en passant capture on left side
    if (oldPosition.piece === "pawn" && Math.abs(oldPosition.square.index % 8 - newPosition.square.index % 8) === 1 && !pieceToCapture) {
        const enPassantCaptureSquare = getFullSquareInfo(newPosition.square.index + (newPosition.side === "white" ? 8 : -8));
        const enPassantCapturePiece = tmpGameObject.position.find((pos) => pos.square.index === enPassantCaptureSquare.index);

        if (enPassantCapturePiece) {
            tmpGameObject.position = tmpGameObject.position.filter((pos) => pos !== enPassantCapturePiece);
        }
    } 

    tmpGameObject.position.push(newPosition);

    tmpGameObject.move = tmpGameObject.move === "white" ? "black" : "white";

    return tmpGameObject;
}