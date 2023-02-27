import { StringifiedMap } from '$lib/common/map';
import type { BoundariesType, SquareInfoType } from '$lib/types/chess.types';
import type { SquareBoundariesType } from '$lib/types/store.types';
import { getFullSquareInfo } from './fenNotationParser/getFullSquareInfo';

export const getSquareBoundaries = (boardBoundaries: BoundariesType) => {
	const { top, right, bottom, left } = boardBoundaries;

	const boardHeight = bottom - top;
	const boardWidth = right - left;

	const squareHeight = boardHeight / 8;
	const squareWidth = boardWidth / 8;

	const squareBoundaries = new StringifiedMap<SquareInfoType, SquareBoundariesType>();

	for (let i = 0; i < 64; i++) {
		const row = Math.floor(i / 8);
		const column = i % 8;

		const squareTop = top + row * squareHeight;
		const squareLeft = left + column * squareWidth;

		const inspectedSquare = getFullSquareInfo(i);
		if (!inspectedSquare) throw new Error('Invalid square');

		squareBoundaries.set(inspectedSquare, {
			top: squareTop,
			right: squareLeft + squareWidth,
			bottom: squareTop + squareHeight,
			left: squareLeft,
		});
	}

	return squareBoundaries;
};
