import { StringifiedMap } from '$lib/common/map';
import type { PieceType, Side, SquareInfoType } from '$lib/types/chess.types';
import type { PositionStoreValueType } from '$lib/types/store.types';
import type { PieceMoveMetaType } from '$lib/types/utils.types';
import { bishop } from './bishop';
import { king } from './king';
import { knight } from './knight';
import { pawn } from './pawn';
import { queen } from './queen';
import { rook } from './rook';

const updatePossibleMoves = (
	positions: PositionStoreValueType,
	piece: PieceType,
	meta: PieceMoveMetaType
) => {
	const { type } = piece;

	switch (type) {
		case 'pawn':
			return pawn(positions, piece, meta);
		case 'knight':
			return knight(positions, piece, meta);
		case 'bishop':
			return bishop(positions, piece, meta);
		case 'rook':
			return rook(positions, piece, meta);
		case 'queen':
			return queen(positions, piece, meta);
		case 'king':
			return king(positions, piece, meta);
		default:
			throw new Error(`Invalid piece type: ${type} in ${piece}`);
	}
};

const isKingInCheck = (positions: PositionStoreValueType, checkKingSide: Side) => {
	const kingSquare = Array.from(positions).find(
		([_, piece]) => piece.type === 'king' && piece.side === checkKingSide
	)?.[0];

	if (!kingSquare) {
		console.error('King not found after simulated move');
		return true;
	}

	let result = false;

	positions.forEach((piece, _) => {
		if (piece.side !== checkKingSide) {
			const {
				meta: { attackMoves },
			} = piece;

			attackMoves.forEach((move) => {
				if (move.index === kingSquare.index) {
					result = true;
				}
			});
		}
	});

	return result;
};

// ! TODO: This function should be implemented more efficiently
export const updateAllPossibleMoves = (
	positions: PositionStoreValueType,
	meta: PieceMoveMetaType
) => {
	const positionsCopy = new StringifiedMap(
		JSON.parse(JSON.stringify(Array.from(positions)))
	) as PositionStoreValueType;
	const updatedPossibleMoves = new StringifiedMap<SquareInfoType, SquareInfoType[]>([]);

	positions.forEach((piece, square) => {
		positions.set(square, {
			...piece,
			meta: { ...piece.meta, ...updatePossibleMoves(positionsCopy, piece, meta) },
		});
	});

	// at this point we have all possible moves for all pieces with squares they can attack

	positions.forEach((piece, square) => {
		let possibleMoves = Array.from(piece.meta.possibleMoves);

		possibleMoves = possibleMoves.filter((move) => {
			const isChecked = isKingInCheck(positions, piece.side);

			if (
				isChecked &&
				piece.type === 'king' &&
				(move.index === square.index + 2 || move.index === square.index - 2)
			) {
				return false;
			}

			return true;
		});

		possibleMoves = possibleMoves.filter((move) => {
			const simulationCopy = new StringifiedMap(
				JSON.parse(JSON.stringify(Array.from(positions)))
			) as PositionStoreValueType;

			simulationCopy.delete(square);
			simulationCopy.set(move, { ...piece, position: move });

			const simulationSecondCopy = new StringifiedMap(
				JSON.parse(JSON.stringify(Array.from(simulationCopy)))
			) as PositionStoreValueType;

			simulationCopy.forEach((piece, square) => {
				simulationCopy.set(square, {
					...piece,
					meta: { ...piece.meta, ...updatePossibleMoves(simulationSecondCopy, piece, meta) },
				});
			});

			return !isKingInCheck(simulationCopy, piece.side);
		});

		if (
			piece.type === 'king' &&
			!possibleMoves.some((move) => move.index === square.index + 1 || move.index === square.index)
		) {
			possibleMoves = possibleMoves.filter((move) => move.index !== square.index + 2);
		}

		if (
			piece.type === 'king' &&
			!possibleMoves.some((move) => move.index === square.index - 1 || move.index === square.index)
		) {
			possibleMoves = possibleMoves.filter((move) => move.index !== square.index - 2);
		}

		updatedPossibleMoves.set(square, possibleMoves);
	});

	positions.forEach((piece, square) => {
		const newPossibleMoves = updatedPossibleMoves.get(square) || [];
		const newAttackMoves = piece.meta.attackMoves.filter((move) =>
			newPossibleMoves.some((possibleMove) => possibleMove.index === move.index)
		);

		positions.set(square, {
			...piece,
			meta: { ...piece.meta, possibleMoves: newPossibleMoves, attackMoves: newAttackMoves },
		});
	});

	// filter out every possible move and attack for the opposite side
	positions.forEach((piece, square) => {
		if (piece.side !== meta.turn) {
			positions.set(square, {
				...piece,
				meta: { ...piece.meta, possibleMoves: [], attackMoves: [] },
			});
		}
	});

	return positions;
};
