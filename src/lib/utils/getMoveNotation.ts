import type { Piece, PieceType, SquareInfoType } from '$lib/types/chess.types';
import type { PositionStoreValueType } from '$lib/types/store.types';
import { getLetterForPiece } from './fenNotationParser/getLetterForPiece';

// need to take start and en d square, capture info, promotion info check, castling info.
export const getMoveNotation = (
	startSquare: SquareInfoType,
	endSquare: SquareInfoType,
	meta: {
		newPositions: PositionStoreValueType;
		oldPositions?: PositionStoreValueType;
		captured?: PieceType | null;
		promotion?: Piece | null;
		check: boolean;
		checkmate: boolean;
		win?: 'white' | 'black' | null;
		draw: boolean;
		castling?: 'kingside' | 'queenside' | null;
	}
) => {
	const { newPositions, oldPositions, captured, promotion, check, checkmate, castling, draw, win } =
		meta;

	if (!oldPositions) {
		throw new Error('Cannot create move notation without previous positions');
	}

	const movedPiece = newPositions.get(endSquare);
	const sideMoved = movedPiece?.side;
	const pieceMoved = movedPiece?.type;
	const movedPieceNotation =
		pieceMoved && pieceMoved !== 'pawn' ? getLetterForPiece(pieceMoved) : '';
	const startPosition = startSquare.code;
	const finalPosition = endSquare.code;
	const captureNotation = captured ? `x` : '';
	const checkOrCheckmate = checkmate ? '#' : check ? '+' : '';
	const winNotation = win ? `${win === 'white' ? ' 1-0' : ' 0-1'}` : draw ? ' 1/2-1/2' : '';

	const disambiguatedNotation = '';

	if (castling) {
		return `${castling === 'kingside' ? 'O-O' : 'O-O-O'}${checkOrCheckmate}${winNotation}`;
	}

	if (promotion) {
		const pawnMoveNotation = captured ? startSquare.code[0] : '';
		return `${pawnMoveNotation}${captureNotation}${finalPosition}=${getLetterForPiece(
			promotion
		)}${checkOrCheckmate}${winNotation}`;
	}

	const returnDisambiguation = (addon: string) => {
		return (
			movedPieceNotation + addon + captureNotation + finalPosition + checkOrCheckmate + winNotation
		);
	};

	if (pieceMoved === 'pawn' && captured) {
		return returnDisambiguation(startPosition[0]);
	}

	if (pieceMoved === 'pawn') {
		return returnDisambiguation('');
	}

	let shouldDisambiguateByColumn = false;
	let shouldDisambiguateByRow = false;

	oldPositions.forEach((piece, square) => {
		if (
			piece.side === sideMoved &&
			piece.type === pieceMoved &&
			square.index !== startSquare.index &&
			piece.meta.possibleMoves.some((move) => move.index === endSquare.index)
		) {
			if (square.index % 8 === startSquare.index % 8) {
				shouldDisambiguateByColumn = true;
			}

			if (Math.floor(square.index / 8) === Math.floor(startSquare.index / 8)) {
				shouldDisambiguateByRow = true;
			}
		}
	});

	if (shouldDisambiguateByColumn && shouldDisambiguateByRow) {
		return returnDisambiguation(startPosition);
	}

	if (shouldDisambiguateByColumn) {
		return returnDisambiguation(startPosition[1]);
	}

	if (shouldDisambiguateByRow) {
		return returnDisambiguation(startPosition[0]);
	}

	return (
		movedPieceNotation +
		disambiguatedNotation +
		captureNotation +
		finalPosition +
		checkOrCheckmate +
		winNotation
	);
};
