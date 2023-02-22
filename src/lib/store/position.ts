import { DEFAULT_POSITION } from '$lib/constants/store.constants';
import type { Piece, SquareInfoType } from '$lib/types/chess.types';
import type { PositionStoreValueType } from '$lib/types/store.types';
import { writable } from 'svelte/store';
import { captured } from './captured';
import { history } from './history';
import { PICE_VALUE } from '$lib/constants/chess.constants';
import { getFullSquareInfo } from '$lib/utils/fenNotationParser/getFullSquareInfo';
import { getAllLegalMoves } from '$lib/utils/legalMoves/getAllLegalMoves';
import { game } from './game';

const createPosition = () => {
	const { subscribe, set, update } = writable<PositionStoreValueType>(DEFAULT_POSITION);

	const move = (startPos: SquareInfoType, endPos: SquareInfoType, promoteTo?: Piece) => {
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

			// Handle castling
			if (piece.type === 'king') {
				const kingMove = endPos.index - startPos.index;
				const rookKingSideSquare = getFullSquareInfo(startPos.index + 3);
				const rookQueenSideSquare = getFullSquareInfo(startPos.index - 4);

				if (kingMove === 2) {
					const rook = position.get(rookKingSideSquare);

					if (rook) {
						rook.meta.firstMove = false;
						rook.position = getFullSquareInfo(startPos.index + 1);
						position.set(rook.position, rook);
						position.delete(rookKingSideSquare);
					}
				} else if (kingMove === -2) {
					const rook = position.get(rookQueenSideSquare);

					if (rook) {
						rook.meta.firstMove = false;
						rook.position = getFullSquareInfo(startPos.index - 1);
						position.set(rook.position, rook);
						position.delete(rookQueenSideSquare);
					}
				}
			}

			// Handle en passant
			if (
				piece.type === 'pawn' &&
				Math.abs((endPos.index % 8) - (startPos.index % 8)) === 1 &&
				!capture
			) {
				const enPassantSquare = getFullSquareInfo(endPos.index + (piece.side === 'white' ? 8 : -8));

				const enPassantCapture = position.get(enPassantSquare);

				if (enPassantCapture) {
					captured.capture(enPassantCapture);
					position.delete(enPassantSquare);
				}
			}

			// Update possible moves / attacks
			position = getAllLegalMoves(position);

			// Check if move caused check
			let didMoveCausedCheck = false;
			const enemyKingSquare = Array.from(position).find(
				([_, p]) => p.type === 'king' && p.side !== piece.side
			)?.[0];

			position.forEach((piece) => {
				if (piece.meta.possibleMoves?.find((move) => move.index === enemyKingSquare?.index)) {
					didMoveCausedCheck = true;
				}
			});

			if (didMoveCausedCheck) {
				game.setCheck();
			} else {
				game.resetCheck();
			}

			history.add(position, capture);

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
		reset: () => set(DEFAULT_POSITION),
		override: (position?: PositionStoreValueType) => set(position || DEFAULT_POSITION),
	};
};

export const position = createPosition();
