import type {
	FenNotationObjectType,
	PiecePositionInfoType,
	SquareInfoType,
} from '$lib/types/chess.types';
import { getFullSquareInfo } from '../fenNotationParser/getFullSquareInfo';

export const getLegalRookMoves = (
	gameObject: FenNotationObjectType,
	pieceInfo: PiecePositionInfoType
) => {
	const { side, square } = pieceInfo;
	const { position } = gameObject;

	const legalMoves: SquareInfoType[] = [];

	// All squares to the bottom
	for (let i = square.index; i <= 63; i += 8) {
		const squareInfo = position.find((pos) => pos.square.index === i);

		if (i === square.index) {
			continue;
		}

		if (squareInfo?.side === side) {
			break;
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

	// All squares to the top
	for (let i = square.index; i >= 0; i -= 8) {
		const squareInfo = position.find((pos) => pos.square.index === i);

		if (i === square.index) {
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
	// All squares to the left
	for (let i = square.index; i >= square.index - (square.index % 8); i--) {
		const squareInfo = position.find((pos) => pos.square.index === i);

		if (i === square.index) {
			continue;
		}

		if (squareInfo?.side === side) {
			break;
		}

		if (!squareInfo?.piece) {
			legalMoves.push(getFullSquareInfo(i));
			continue;
		}

		if (squareInfo?.side && squareInfo.side !== side) {
			legalMoves.push(getFullSquareInfo(i));
			break;
		}
	}

	// All squares to the right
	for (let i = square.index; i <= square.index + 7 - (square.index % 8); i++) {
		const squareInfo = position.find((pos) => pos.square.index === i);

		if (i === square.index) {
			continue;
		}

		if (squareInfo?.side === side) {
			break;
		}

		if (!squareInfo?.piece) {
			legalMoves.push(getFullSquareInfo(i));
			continue;
		}

		if (squareInfo?.side && squareInfo.side !== side) {
			legalMoves.push(getFullSquareInfo(i));
			break;
		}
	}

	return legalMoves;
};
