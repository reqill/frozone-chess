import type { BoundariesType, SquareBoundariesType } from '$lib/types/chess.types';

export const getSquareBoundaries = (boardBoundaries: BoundariesType) => {
	const { top, right, bottom, left } = boardBoundaries;

	const boardHeight = bottom - top;
	const boardWidth = right - left;

	const squareHeight = boardHeight / 8;
	const squareWidth = boardWidth / 8;

	const squareBoundaries: SquareBoundariesType = {};

	for (let i = 0; i < 64; i++) {
		const row = Math.floor(i / 8);
		const column = i % 8;

		const squareTop = top + row * squareHeight;
		const squareLeft = left + column * squareWidth;

		squareBoundaries[i] = {
			top: squareTop,
			right: squareLeft + squareWidth,
			bottom: squareTop + squareHeight,
			left: squareLeft,
		};
	}

	return squareBoundaries;
};
