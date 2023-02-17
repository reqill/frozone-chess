export const HEX_COLOR_REGEX = /^#[0-9A-F]{6}$/i;

export const PIECES = {
    PAWN: 'pawn',
    ROOK: 'rook',
    KNIGHT: 'knight',
    BISHOP: 'bishop',
    QUEEN: 'queen',
    KING: 'king',
} as const;

export const COLORS = {
    WHITE: 'white',
    BLACK: 'black',
} as const;

export const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';