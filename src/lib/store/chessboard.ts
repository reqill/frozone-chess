import { DEFAULT_CHESSBOARD_STATE } from '$lib/constants/store.constants';
import { writable } from 'svelte/store';
import type { ChessBoardStoreValueType } from '$lib/types/store.types';
import { getSquareBoundaries } from '$lib/utils/getSquareBoundaries';
import type { Piece, SquareInfoType } from '$lib/types/chess.types';
import type { MousePositionType } from '$lib/types/common.types';
import { game } from './game';
import { getFullSquareInfo } from '$lib/utils/fenNotationParser/getFullSquareInfo';

const createChessBoard = () => {
	const { subscribe, set, update } = writable<ChessBoardStoreValueType>(DEFAULT_CHESSBOARD_STATE);

	const setBoundaries = (boundaries?: ChessBoardStoreValueType['boundaries']) => {
		update((chessboard) => {
			if (boundaries?.bottom && boundaries?.top && boundaries?.left && boundaries?.right) {
				chessboard.boundaries = boundaries;
				chessboard.squareBoundaries = getSquareBoundaries(boundaries);
			}

			return chessboard;
		});
	};

	const onDrag = (square: SquareInfoType, { x, y }: MousePositionType) => {
		update((chessboard) => {
			if (!chessboard.isDragging) return chessboard;

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
					if (chessboard.viewSide === 'white') {
						chessboard.intersectedSquare = square;
					} else {
						chessboard.intersectedSquare = getFullSquareInfo(63 - square.index);
					}
				}
			});

			return chessboard;
		});
	};

	const startDrag = (square: SquareInfoType, { x, y }: MousePositionType) => {
		update((chessboard) => {
			chessboard.selectedSquare = square;
			chessboard.isDragging = true;

			return chessboard;
		});

		onDrag(square, { x, y });
	};

	const stopDrag = (piece?: Piece) => {
		update((chessboard) => {
			if (!chessboard.isDragging || !chessboard.selectedSquare) return chessboard;

			// if (piece === "pawn" && chessboard.intersectedSquare && (chessboard.intersectedSquare?.index >= 56 || chessboard.intersectedSquare?.index <= 7)) {
			// 	console.log("should enable promotion on move from", chessboard.selectedSquare, "to", chessboard.intersectedSquare)
			// 	// chessboard.pendingPromotion = { from: chessboard.selectedSquare, to: chessboard.intersectedSquare };
			// } else {
			game.move(chessboard.selectedSquare, chessboard.intersectedSquare);
			// }

			chessboard.selectedSquare = null;
			chessboard.dragPosition = { x: 0, y: 0 };
			chessboard.isDragging = false;

			return chessboard;
		});
	};

	const selectSquare = (square: SquareInfoType, piece?: Piece) => {
		update((chessboard) => {
			if (chessboard.selectedSquare && !chessboard.isDragging) {
				// if (piece === "pawn" && (square.index >= 56 || square.index <= 7)) {
				// 	console.log("should enable promotion on move from", chessboard.selectedSquare, "to", square)
				// 	// chessboard.pendingPromotion = { from: chessboard.selectedSquare, to: square };
				// } else {
				game.move(chessboard.selectedSquare, square);
				// }

				chessboard.selectedSquare = null;
				chessboard.dragPosition = { x: 0, y: 0 };
				chessboard.isDragging = false;
			} else {
				chessboard.selectedSquare = square;
			}

			return chessboard;
		});
	};

	const highlight = (square: SquareInfoType) => {
		update((chessboard) => {
			if (chessboard.highlightedSquares.includes(square)) {
				chessboard.highlightedSquares = chessboard.highlightedSquares.filter((s) => s !== square);
			} else {
				chessboard.highlightedSquares.push(square);
			}

			return chessboard;
		});
	};

	const startArrow = (square: SquareInfoType) => {
		update((chessboard) => {
			chessboard.arrows.filter((arrow) => arrow.to !== null);

			chessboard.arrows.push({
				from: square,
				to: null,
			});

			return chessboard;
		});
	};

	const stopArrow = (square: SquareInfoType) => {
		update((chessboard) => {
			const arrow = chessboard.arrows.find((arrow) => arrow.to === null);

			if (arrow) {
				arrow.to = square;
			}

			const duplicateArrows = chessboard.arrows.filter((arrow) => {
				return (
					chessboard.arrows.filter((a) => a.from === arrow.from && a.to === arrow.to).length > 1
				);
			});

			chessboard.arrows = chessboard.arrows.filter((arrow) => {
				return !duplicateArrows.includes(arrow);
			});

			return chessboard;
		});
	};

	const resetHighlights = () => {
		update((chessboard) => {
			chessboard.highlightedSquares = [];
			chessboard.arrows = [];

			return chessboard;
		});
	};

	const clearSelection = () => {
		update((chessboard) => {
			chessboard.selectedSquare = null;
			chessboard.intersectedSquare = null;
			chessboard.isDragging = false;

			return chessboard;
		});
	};

	const promote = (piece: Piece) => {
		// update((chessboard) => {
		// 	if (!chessboard.pendingPromotion) return chessboard;
		// 	game.move(chessboard.pendingPromotion.from, chessboard.pendingPromotion.to, piece);
		// 	chessboard.pendingPromotion = null;
		// 	return chessboard;
		// });
	};

	const clearOverlays = () => {
		update((chessboard) => {
			chessboard.selectedSquare = null;
			chessboard.dragPosition = { x: 0, y: 0 };
			chessboard.isDragging = false;
			chessboard.intersectedSquare = null;
			chessboard.highlightedSquares = [];
			chessboard.arrows = [];

			return chessboard;
		});
	};

	const flip = () => {
		update((chessboard) => {
			if (chessboard.viewSide === 'white') {
				chessboard.viewSide = 'black';
			} else {
				chessboard.viewSide = 'white';
			}

			chessboard.squares = chessboard.squares.reverse();
			chessboard.squareBoundaries = getSquareBoundaries(chessboard.boundaries, true);

			return chessboard;
		});
	};

	return {
		subscribe,
		selectSquare,
		highlight,
		resetHighlights,
		startArrow,
		stopArrow,
		promote,
		clearSelection,
		clearOverlays,
		onDrag,
		flip,
		stopDrag,
		startDrag,
		setBoundaries,
		reset: () => set(DEFAULT_CHESSBOARD_STATE),
	};
};

export const chessboard = createChessBoard();
