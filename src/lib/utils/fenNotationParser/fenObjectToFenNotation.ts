import type { FenNotationObjectType, Side } from '$lib/types/chess.types';
import { getPositionStringFromPositions } from './getPositionStringFromPositions';

export const fenObjectToFenNotation = (gameObject: FenNotationObjectType): string => {
	const { position, turn, castlingRights, enPassant, halfMoveClock, fullMoveNumber } = gameObject;

	const halfMoveClockStr = halfMoveClock.toString();
	const fullMoveNumberStr = fullMoveNumber.toString();
	const moveStr = turn === 'white' ? 'w' : 'b';
	const enPassantStr = enPassant?.code ? enPassant.code : '-';

	const castlingStr = Object.keys(castlingRights).reduce((acc, side) => {
		const { queenSide, kingSide } = castlingRights[side as Side];

		if (kingSide) {
			acc += side === 'white' ? 'K' : 'k';
		}
		if (queenSide) {
			acc += side === 'white' ? 'Q' : 'q';
		}

		return acc;
	}, '');

	const positionStr = getPositionStringFromPositions(position);

	return `${positionStr} ${moveStr} ${castlingStr} ${enPassantStr} ${halfMoveClockStr} ${fullMoveNumberStr}`;
};
