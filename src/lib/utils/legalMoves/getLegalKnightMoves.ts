import type {
	FenNotationObjectType,
	PiecePositionInfoType,
	SquareInfoType,
} from '$lib/types/chess.types';
import { getFullSquareInfo } from '../fenNotationParser/getFullSquareInfo';

export const getLegalKnightMoves = (
	gameObject: FenNotationObjectType,
	pieceInfo: PiecePositionInfoType
) => {
	const { side, square } = pieceInfo;
	const { position } = gameObject;

	const legalMoves: SquareInfoType[] = [];

	const canPerformLongUpLeftMove = square.index - 16 >= 0 && square.index % 8 !== 0;
	const canPerformShortUpLeftMove =
		square.index - 8 >= 0 && square.index % 8 !== 0 && square.index % 8 !== 1;
	const canPerformLongUpRightMove = square.index - 16 >= 0 && square.index % 8 !== 7;
	const canPerformShortUpRightMove =
		square.index - 8 >= 0 && square.index % 8 !== 6 && square.index % 8 !== 7;

	const canPerformLongDownLeftMove = square.index + 16 <= 63 && square.index % 8 !== 0;
	const canPerformShortDownLeftMove =
		square.index + 8 <= 63 && square.index % 8 !== 0 && square.index % 8 !== 1;
	const canPerformLongDownRightMove = square.index + 16 <= 63 && square.index % 8 !== 7;
	const canPerformShortDownRightMove =
		square.index + 8 <= 63 && square.index % 8 !== 6 && square.index % 8 !== 7;

	const temporaryMoves: SquareInfoType[] = [];

	if (canPerformLongUpLeftMove) {
		temporaryMoves.push(getFullSquareInfo(square.index - 17));
	}

	if (canPerformShortUpLeftMove) {
		temporaryMoves.push(getFullSquareInfo(square.index - 10));
	}

	if (canPerformLongUpRightMove) {
		temporaryMoves.push(getFullSquareInfo(square.index - 15));
	}

	if (canPerformShortUpRightMove) {
		temporaryMoves.push(getFullSquareInfo(square.index - 6));
	}

	if (canPerformLongDownLeftMove) {
		temporaryMoves.push(getFullSquareInfo(square.index + 15));
	}

	if (canPerformShortDownLeftMove) {
		temporaryMoves.push(getFullSquareInfo(square.index + 6));
	}

	if (canPerformLongDownRightMove) {
		temporaryMoves.push(getFullSquareInfo(square.index + 17));
	}

	if (canPerformShortDownRightMove) {
		temporaryMoves.push(getFullSquareInfo(square.index + 10));
	}

	for (const move of temporaryMoves) {
		const squareInfo = position.find((pos) => pos.square.index === move.index);

		if (!squareInfo?.piece) {
			legalMoves.push(move);
			continue;
		}

		if (squareInfo?.side && squareInfo.side !== side) {
			legalMoves.push(move);
			continue;
		}
	}

	return legalMoves;
};
