import { fenObjectToFenNotation } from './fenObjectToFenNotation';
import { parseFenNotation } from './parseFenNotation';

export const parseFEN = {
	toObject: parseFenNotation,
	toString: fenObjectToFenNotation,
};
