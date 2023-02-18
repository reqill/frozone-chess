import type { PiecePositionInfoType, SquareInfoType } from "$lib/types/chess.types";
import { getFullSquareInfo } from "./getFullSquareInfo";
import { getPieceFromString } from "./getPieceFromString";

export const stringPositionToObject = (position: string): PiecePositionInfoType[] => {
    const rows = position.split("/");
    const pieces: PiecePositionInfoType[] = [];

    if(rows.length !== 8) {
        throw new Error("Invalid position");
    }

    rows.forEach((row, rowIdx) => {
        let fileIndex = 0;

        for (let i = 0; i < row.length; i++) {
            const char = row[i];
            const charCode = char.charCodeAt(0);

            if (charCode >= 48 && charCode <= 57) {
                fileIndex += parseInt(char);
                
            } else {
                const piece = getPieceFromString(char);
                const index = 63 - ((7 - rowIdx) * 8 + (7 - fileIndex));
                pieces.push({ ...piece, square: getFullSquareInfo(index) as Required<SquareInfoType> });
                fileIndex++;
            }
        }
    });

    return pieces;
};