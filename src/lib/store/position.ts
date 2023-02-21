import { DEFAULT_POSITION } from '$lib/constants/store.constants';
import type { SquareInfoType } from '$lib/types/chess.types';
import type { PositionStoreValueType } from '$lib/types/store.types';
import { writable } from 'svelte/store';
import { captured } from './captured';
import { history } from './history';
import { game } from './game';

const createPosition = () => {
	const { subscribe, set, update } = writable<PositionStoreValueType>(DEFAULT_POSITION);

	const move = (startPos: SquareInfoType, endPos: SquareInfoType) => {
		update((position) => {
			const piece = position.get(startPos);

			if (!piece) return position;

			game.changeTurn();

			const isMoveLegal = piece.meta.possibleMoves?.find((move) => move.index === endPos.index);

			if (!isMoveLegal) return position;

			const capture = position.get(endPos);

			if (capture) {
				captured.capture(capture);
				position.delete(endPos);
			}

			piece.position = endPos;
			piece.meta.firstMove = false;

			// TODO: set new possible moves and attack moves for new position
			//  piece.meta.possibleMoves = NEW POSSIBLE MOVES
			//  piece.meta.attackMoves = NEW ATTACK MOVES

			history.add(position, capture);

			return position;
		});
	};

	return {
		subscribe,
		move,
		reset: () => set(DEFAULT_POSITION),
		override: (position?: PositionStoreValueType) => set(position || DEFAULT_POSITION),
	};
};

export const position = createPosition();
