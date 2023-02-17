import type { COLORS, PIECES } from "$lib/constants/chess.constants";

export type HexColor = `#${string}`;

export type Piece = typeof PIECES[keyof typeof PIECES];
export type Side = typeof COLORS[keyof typeof COLORS];
export type ChessColorConfig = {
    [key in Side]?: {
        main?: HexColor;
        accent?: HexColor;
    }
}