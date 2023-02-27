import type { SquareInfoType } from '$lib/types/chess.types';

export const getFullSquareInfo = (info: string | number): SquareInfoType | null => {
	if (typeof info === 'string') {
		const [file, rank] = info.split('');
		const index = (8 - parseInt(rank)) * 8 + (file.charCodeAt(0) - 97);

		if (index < 0 || index > 63) return null;

		return { index, code: info };
	} else if (typeof info === 'number') {
		const file = String.fromCharCode(97 + (info % 8));
		const rank = 8 - Math.floor(info / 8);
		const code = `${file}${rank}`;

		if (info < 0 || info > 63) return null;

		return { index: info, code };
	}

	return null;
};
