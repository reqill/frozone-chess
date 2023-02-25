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
		case 'queen':
			return queen(positions, piece, meta);
		case 'rook':
			return rook(positions, piece, meta);
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
		throw new Error(`King of side ${checkKingSide} not found in positions`);
	}

	positions.forEach((piece, _) => {
		if (piece.side !== checkKingSide) {
			const {
				meta: { attackMoves },
			} = piece;

			attackMoves.forEach((move) => {
				if (move.index === kingSquare.index) {
					return true;
				}
			});
		}
	});

	return false;
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
	/*
		positions.forEach((piece, square) => {
			const {
				meta: { possibleMoves },
			} = piece;
	
			possibleMoves.filter((move) => {
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
	*/
	return positions;
};
