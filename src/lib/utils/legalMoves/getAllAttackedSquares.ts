import type { FenNotationObjectType, Side, SquareInfoType } from "$lib/types/chess.types";
import { getLegalMoves } from "./getLegalMoves";
import { getLegalPawnMoves } from "./getLegalPawnMoves";

export const getAllAttackedSquares = (gameObject: FenNotationObjectType, side: Side): SquareInfoType[] => {
    const attackedSquares: SquareInfoType[] = [];

    gameObject.position.forEach((pos) => {
        if (pos.piece !== "pawn" && pos.side === side) {
            const legalMoves = getLegalMoves(gameObject, pos);

            if(legalMoves.length > 0){
                attackedSquares.push(...legalMoves);
            }

        } else if (pos.piece === "pawn" && pos.side === side){
            const { legalAttacks } = getLegalPawnMoves(gameObject, pos);

            if(legalAttacks.length > 0){
                attackedSquares.push(...legalAttacks);
            }
        }
    });

    const uniqueAttackedSquares = attackedSquares.filter((square, index, self) => {
        return self.findIndex((s) => s.index === square.index) === index;
    });

    return uniqueAttackedSquares;
}