import { DEFAULT_CHESSBOARD_STATE } from '$lib/constants/store.constants';
import { writable } from 'svelte/store';
import type { ChessBoardStoreValueType } from '$lib/types/store.types';
import { getSquareBoundaries } from '$lib/utils/getSquareBoundaries';

const createChessBoard = () => {
	const { subscribe, set, update } = writable<ChessBoardStoreValueType>(DEFAULT_CHESSBOARD_STATE);

	const setBoundaries = (boundaries: ChessBoardStoreValueType['boundaries']) => {
		update((chessboard) => {
			if (boundaries?.bottom && boundaries?.top && boundaries?.left && boundaries?.right) {
				chessboard.boundaries = boundaries;
				chessboard.squareBoundaries = getSquareBoundaries(boundaries);
			}

			return chessboard;
		});
	};

	const onDrag = (x: number, y: number) => {
		update((chessboard) => {
			const { boundaries } = chessboard;

			if (y >= boundaries.top && y <= boundaries.bottom) {
				chessboard.dragPosition.y = y;
			}

			if (x >= boundaries.left && x <= boundaries.right) {
				chessboard.dragPosition.x = x;
			}

			chessboard.squareBoundaries.forEach((boundaries, square) => {
				if (
					y >= boundaries.top &&
					y <= boundaries.bottom &&
					x >= boundaries.left &&
					x <= boundaries.right
				) {
					chessboard.intersectedSquare = square;
				}
			});

			return chessboard;
		});
	};

	return {
		subscribe,
		onDrag,
		setBoundaries,
		reset: () => set(DEFAULT_CHESSBOARD_STATE),
	};
};

export const chessboard = createChessBoard();
