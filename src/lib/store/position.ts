import { DEFAULT_POSITION } from '$lib/constants/store.constants';
import type { Piece, Side, SquareInfoType } from '$lib/types/chess.types';
import type { PositionStoreValueType } from '$lib/types/store.types';
import { writable } from 'svelte/store';
import { captured } from './captured';
import { history } from './history';
import { PICE_VALUE } from '$lib/constants/chess.constants';
import { getFullSquareInfo } from '$lib/utils/fenNotationParser/getFullSquareInfo';
import { game } from './game';
import { updateAllPossibleMoves } from '$lib/utils/movement';
import type { PieceMoveMetaType } from '$lib/types/utils.types';
import { copyStringifiedMap } from '$lib/utils/copyStringifiedMap';

const createPosition = () => {
	const { subscribe, set, update } = writable<PositionStoreValueType>(
		copyStringifiedMap(DEFAULT_POSITION)
	);

	const move = (
		startPos: SquareInfoType,
		endPos: SquareInfoType,
		meta: PieceMoveMetaType,
		promoteTo?: Piece
	) => {
		update((position) => {
			const piece = position.get(startPos);

			if (!piece) return position;

			position.delete(startPos);

			const isMoveLegal = piece.meta.possibleMoves?.find((move) => move.index === endPos.index);

			if (!isMoveLegal) return position;

			const capture = position.get(endPos);

			if (capture) {
				captured.capture(capture);
				position.delete(endPos);
			}

			piece.position = endPos;
			piece.meta.firstMove = false;

			// ! this could be problematic | maybe move into separate function later
			if (promoteTo && piece.type === 'pawn' && (endPos.index < 8 || endPos.index > 55)) {
				piece.type = promoteTo;
				piece.meta.value = PICE_VALUE[promoteTo];
			}

			position.set(endPos, piece);
			let castling: null | 'kingside' | 'queenside' = null;

			// Handle castling
			if (piece.type === 'king') {
				const kingMove = endPos.index - startPos.index;
				const rookKingSideSquare = getFullSquareInfo(startPos.index + 3)!;
				const rookQueenSideSquare = getFullSquareInfo(startPos.index - 4)!;

				if (kingMove === 2) {
					const rook = position.get(rookKingSideSquare);

					if (rook) {
						rook.meta.firstMove = false;
						rook.position = getFullSquareInfo(startPos.index + 1)!;
						position.set(rook.position, rook);
						position.delete(rookKingSideSquare);
						castling = 'kingside';
					}
				} else if (kingMove === -2) {
					const rook = position.get(rookQueenSideSquare);

					if (rook) {
						rook.meta.firstMove = false;
						rook.position = getFullSquareInfo(startPos.index - 1)!;
						position.set(rook.position, rook);
						position.delete(rookQueenSideSquare);
						castling = 'queenside';
					}
				}
			}

			let enPassantCapture = null;

			// Handle en passant
			if (
				piece.type === 'pawn' &&
				Math.abs((endPos.index % 8) - (startPos.index % 8)) === 1 &&
				!capture
			) {
				const enPassantSquare = getFullSquareInfo(endPos.index + (piece.side === 'white' ? 8 : -8));
				if (!enPassantSquare) throw new Error('En passant square is out of range');

				enPassantCapture = position.get(enPassantSquare);

				if (enPassantCapture) {
					captured.capture(enPassantCapture);
					position.delete(enPassantSquare);
				}
			}

			// Update possible moves / attacks (with exclusion of moves that would cause check)
			position = updateAllPossibleMoves(position, meta, false);

			// Check if move caused check
			let didMoveCausedCheck = false;
			const enemyKingSquare = Array.from(position).find(
				([_, p]) => p.type === 'king' && p.side !== piece.side
			)?.[0];

			position.forEach((piece) => {
				const pieceAttack = piece.meta.attackMoves.find(
					(move) => move.index === enemyKingSquare?.index
				);

				if (pieceAttack) {
					didMoveCausedCheck = true;
				}
			});

			let checkmate = false;
			let stalemate = true;
			let win: Side | null = null;

			if (didMoveCausedCheck) {
				game.setCheck();

				const enemyKing = position.get(enemyKingSquare!);
				if (!enemyKing) throw new Error('Enemy king not found');

				if (enemyKing.meta.possibleMoves.length === 0) {
					checkmate = true;
					win = piece.side;
				}
			} else {
				game.resetCheck();

				position.forEach((piece) => {
					if (piece.side !== meta.turn && piece.meta.possibleMoves.length > 0) {
						stalemate = false;
					}
				});
			}

			history.add(position, {
				startSquare: startPos,
				endSquare: endPos,
				promotion: promoteTo,
				capture: capture || enPassantCapture,
				check: didMoveCausedCheck,
				castling,
				checkmate,
				draw: stalemate,
				win,
			});

			position.forEach((piece, square) => {
				if (piece.side !== meta.turn) {
					position.set(square, {
						...piece,
						meta: { ...piece.meta, possibleMoves: [], attackMoves: [] },
					});
				}
			});

			game.updatePosition(position);

			if (capture) {
				game.playSound('capture');
			} else {
				game.playSound('move');
			}

			if (checkmate) {
				game.end('checkmate', win!);
			} else if (stalemate) {
				game.end('stalemate');
			}

			return position;
		});
	};

	const exportData = () => {
		return 'position';
	};

	return {
		subscribe,
		export: exportData,
		move,
		reset: () => set(copyStringifiedMap(DEFAULT_POSITION)),
		override: (position?: PositionStoreValueType) =>
			set(copyStringifiedMap(position || DEFAULT_POSITION)),
	};
};

export const position = createPosition();
