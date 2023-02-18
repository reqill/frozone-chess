import type { CastlingInfoType } from "$lib/types/chess.types";

export const getCastlingRightsFromString = (castling: string): CastlingInfoType => {
    const castlingRights: CastlingInfoType = {
        white: {
            kingSide: false,
            queenSide: false
        },
        black: {
            kingSide: false,
            queenSide: false
        }
    };

    if (castling === "-") {
        return castlingRights;
    }

    for (let i = 0; i < castling.length; i++) {
        const char = castling[i];

        if (char === "K") {
            castlingRights.white.kingSide = true;
        } else if (char === "Q") {
            castlingRights.white.queenSide = true;
        } else if (char === "k") {
            castlingRights.black.kingSide = true;
        } else if (char === "q") {
            castlingRights.black.queenSide = true;
        }
    }

    return castlingRights;
};