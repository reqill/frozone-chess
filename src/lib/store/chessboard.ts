import { writable } from 'svelte/store';
import type { ChessBoardStoreValueType } from '$lib/types/store.types';
import { getSquareBoundaries } from '$lib/utils/getSquareBoundaries';
import type { Piece, PieceType, SquareInfoType } from '$lib/types/chess.types';
import type { MousePositionType } from '$lib/types/common.types';
import { game } from './game';
import { getFullSquareInfo } from '$lib/utils/fenNotationParser/getFullSquareInfo';
import { StringifiedMap } from '$lib/common/map';
import { SQUARES } from '$lib/constants/chess.constants';

const createChessBoard = () => {
	const { subscribe, set, update } = writable<ChessBoardStoreValueType>({
		boundaries: {
			top: -1,
			right: -1,
			bottom: -1,
			left: -1,
		},
		highlightedSquares: [],
		arrows: [],
		squareBoundaries: new StringifiedMap(),
		selectedSquare: null,
		intersectedSquare: null,
		dragPosition: {
			x: -1,
			y: -1,
		},
		lastMove: null,
		isDragging: false,
		isDrawing: false,
		viewSide: 'white',
		squares: [...SQUARES],
		selectedPiece: null,
		pendingPromotion: null,
	});

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

	const setLastMove = (from?: SquareInfoType, to?: SquareInfoType) => {
		update((chessboard) => {
			if (from && to) {
				chessboard.lastMove = { from, to };
			} else {
				chessboard.lastMove = null;
			}
			return chessboard;
		});
	};

	const startDrag = (square: SquareInfoType, { x, y }: MousePositionType, piece?: PieceType) => {
		update((chessboard) => {
			chessboard.selectedSquare = square;
			chessboard.isDragging = true;

			if (piece) {
				chessboard.selectedPiece = piece;
			}

			return chessboard;
		});

		onDrag(square, { x, y });
	};

	const stopDrag = () => {
		update((chessboard) => {
			if (
				!chessboard.isDragging ||
				!chessboard.selectedSquare ||
				!chessboard.selectedPiece?.meta.possibleMoves.some(
					(move) => move.index === chessboard.intersectedSquare?.index
				)
			)
				return chessboard;

			if (
				chessboard.selectedPiece &&
				chessboard.selectedPiece.type === 'pawn' &&
				chessboard.intersectedSquare &&
				(chessboard.intersectedSquare?.index >= 56 || chessboard.intersectedSquare?.index <= 7)
			) {
				chessboard.pendingPromotion = {
					from: chessboard.selectedSquare,
					to: chessboard.intersectedSquare,
				};
			} else if (!chessboard?.pendingPromotion) {
				game.move(chessboard.selectedSquare, chessboard.intersectedSquare);
			}

			chessboard.selectedSquare = null;
			chessboard.dragPosition = { x: 0, y: 0 };
			chessboard.isDragging = false;
			chessboard.selectedPiece = null;

			return chessboard;
		});
	};

	const selectSquare = (square: SquareInfoType, piece?: PieceType) => {
		update((chessboard) => {
			if (chessboard.selectedSquare && !chessboard.isDragging) {
				if (
					chessboard.selectedPiece &&
					chessboard.selectedPiece.type === 'pawn' &&
					(square.index >= 56 || square.index <= 7)
				) {
					chessboard.pendingPromotion = { from: chessboard.selectedSquare, to: square };
				} else if (!chessboard?.pendingPromotion) {
					game.move(chessboard.selectedSquare, square);
				}

				chessboard.selectedPiece = null;
				chessboard.selectedSquare = null;
				chessboard.dragPosition = { x: 0, y: 0 };
				chessboard.isDragging = false;
			} else {
				chessboard.selectedSquare = square;
				chessboard.isDragging = false;

				if (piece) {
					chessboard.selectedPiece = piece;
				}
			}

			return chessboard;
		});
	};

	const highlight = (square?: SquareInfoType | null) => {
		update((chessboard) => {
			if (!square) {
				return chessboard;
			}

			if (chessboard.highlightedSquares.some((s) => s.index === square.index)) {
				chessboard.highlightedSquares = chessboard.highlightedSquares.filter(
					(s) => s.index !== square.index
				);
			} else {
				chessboard.highlightedSquares.push(square);
			}

			return chessboard;
		});
	};

	const startArrow = (e: MouseEvent) => {
		const { clientX: x, clientY: y } = e;
		let startSquare: SquareInfoType | null = null;
		let startCenter: { x: number; y: number } | null = null;

		update((chessboard) => {
			if (chessboard.isDrawing) return chessboard;

			chessboard.isDrawing = true;
			chessboard.squareBoundaries.forEach((boundaries, square) => {
				if (
					y >= boundaries.top &&
					y <= boundaries.bottom &&
					x >= boundaries.left &&
					x <= boundaries.right
				) {
					if (chessboard.viewSide === 'white') {
						startSquare = square;
					} else {
						startSquare = getFullSquareInfo(63 - square.index);
					}

					startCenter = {
						x: boundaries.left,
						y: boundaries.top,
					};
				}
			});

			chessboard.arrows.filter((arrow) => arrow.to !== null);

			if (startSquare) {
				chessboard.arrows.push({
					from: startSquare,
					to: null,
					drawingStart: startCenter,
					drawingEnd: null,
				});
			}

			return chessboard;
		});
	};

	const stopArrow = (e: MouseEvent) => {
		const { clientX: x, clientY: y } = e;
		let endSquare: SquareInfoType | null = null;
		let endCenter: { x: number; y: number } | null = null;

		update((chessboard) => {
			if (!chessboard.isDrawing) {
				chessboard.arrows = chessboard.arrows.filter((arrow) => arrow.to !== null);
				return chessboard;
			}

			chessboard.squareBoundaries.forEach((boundaries, square) => {
				if (
					y >= boundaries.top &&
					y <= boundaries.bottom &&
					x >= boundaries.left &&
					x <= boundaries.right
				) {
					if (chessboard.viewSide === 'white') {
						endSquare = square;
					} else {
						endSquare = getFullSquareInfo(63 - square.index);
					}

					endCenter = {
						x: boundaries.left,
						y: boundaries.top,
					};
				}
			});

			const arrow = chessboard.arrows.find((arrow) => arrow.to === null);

			if (arrow && arrow?.from.index === endSquare?.index) {
				chessboard.isDrawing = false;

				highlight(endSquare);
				chessboard.arrows = chessboard.arrows.filter((arrow) => arrow.to !== null);
				return chessboard;
			}

			if (arrow && endSquare) {
				arrow.to = endSquare;
				arrow.drawingEnd = endCenter;
			} else {
				highlight(endSquare);

				chessboard.arrows = chessboard.arrows.filter((arrow) => arrow.to !== null);
				return chessboard;
			}

			chessboard.arrows = chessboard.arrows.filter(
				(arrow, index, self) =>
					index ===
					self.findIndex(
						(a) => a.from.index === arrow.from.index && a.to?.index === arrow.to?.index
					)
			);

			chessboard.arrows = chessboard.arrows.filter((arrow) => arrow.to !== null);

			chessboard.arrows = chessboard.arrows.filter(
				(arrow) => arrow?.to?.index !== arrow.from.index
			);
			chessboard.isDrawing = false;
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
			chessboard.selectedPiece = null;
			chessboard.intersectedSquare = null;
			chessboard.isDragging = false;

			return chessboard;
		});
	};

	const promote = (piece: Piece) => {
		update((chessboard) => {
			if (!chessboard.pendingPromotion) return chessboard;

			game.move(chessboard.pendingPromotion.from, chessboard.pendingPromotion.to, piece);
			chessboard.pendingPromotion = null;
			chessboard.selectedSquare = null;
			chessboard.selectedPiece = null;
			chessboard.dragPosition = { x: 0, y: 0 };
			chessboard.isDragging = false;

			return chessboard;
		});
	};

	const clearOverlays = () => {
		update((chessboard) => {
			chessboard.selectedSquare = null;
			chessboard.selectedPiece = null;
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
		setLastMove,
		setBoundaries,
		reset: () =>
			set({
				boundaries: {
					top: -1,
					right: -1,
					bottom: -1,
					left: -1,
				},
				highlightedSquares: [],
				arrows: [],
				squareBoundaries: new StringifiedMap(),
				selectedSquare: null,
				intersectedSquare: null,
				dragPosition: {
					x: -1,
					y: -1,
				},
				isDrawing: false,
				lastMove: null,
				isDragging: false,
				viewSide: 'white',
				squares: [...SQUARES],
				selectedPiece: null,
				pendingPromotion: null,
			}),
	};
};

export const chessboard = createChessBoard();
