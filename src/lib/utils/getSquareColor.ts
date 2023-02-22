import type { SquareColor, SquareInfoType } from '$lib/types/chess.types';
import { getFullSquareInfo } from './fenNotationParser/getFullSquareInfo';

export const getSquareColor = (square?: number | string | SquareInfoType): SquareColor => {
	let index: number | undefined = undefined;

	if (typeof square === 'object' && square?.index) {
		index = square?.index;
	} else if (typeof square === 'object' && square.code) {
		index = getFullSquareInfo(square.code)!.index;
	} else if (typeof square === 'string') {
		index = getFullSquareInfo(square)!.index;
	} else if (typeof square === 'number') {
		index = square;
	}

	if (index === undefined) {
		throw new Error('Invalid square');
	}

	const row = Math.floor(index / 8);
	const column = index % 8;

	return (row + column) % 2 === 0 ? 'light' : 'dark';
};
