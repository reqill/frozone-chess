import { DEFAULT_CONFIGURATION } from '$lib/constants/store.constants';
import type { ConfigurationStoreValueType } from '$lib/types/store.types';
import { writable } from 'svelte/store';

const createConfiguration = () => {
	const { subscribe, set, update } = writable<ConfigurationStoreValueType>(DEFAULT_CONFIGURATION);

	const changePieceStyle = ({ pieceColors }: Pick<ConfigurationStoreValueType, 'pieceColors'>) => {
		update((configuration) => {
			configuration.pieceColors = pieceColors;

			return configuration;
		});
	};

	const changeBoardStyle = ({
		boardSquares,
	}: Pick<ConfigurationStoreValueType, 'boardSquares'>) => {
		update((configuration) => {
			configuration.boardSquares = boardSquares;

			return configuration;
		});
	};

	const changeOutlineStyle = ({
		outlineColors,
	}: Pick<ConfigurationStoreValueType, 'outlineColors'>) => {
		update((configuration) => {
			configuration.outlineColors = outlineColors;

			return configuration;
		});
	};

	const shouldFlipBoard = () => {
		let shouldFlip;

		update((configuration) => {
			shouldFlip = configuration.flipOnMove;

			return configuration;
		});

		return shouldFlip;
	};

	const changeHighlightStyle = ({
		highlightColors,
	}: Pick<ConfigurationStoreValueType, 'highlightColors'>) => {
		update((configuration) => {
			configuration.highlightColors = highlightColors;

			return configuration;
		});
	};

	const changePieceSize = ({ pieceSize }: Pick<ConfigurationStoreValueType, 'pieceSize'>) => {
		update((configuration) => {
			configuration.pieceSize = pieceSize;

			return configuration;
		});
	};

	const changeFlipOnMove = ({ flipOnMove }: Pick<ConfigurationStoreValueType, 'flipOnMove'>) => {
		update((configuration) => {
			configuration.flipOnMove = flipOnMove;

			return configuration;
		});
	};

	const showTileLabels = ({
		showTileLabels,
	}: Pick<ConfigurationStoreValueType, 'showTileLabels'>) => {
		update((configuration) => {
			configuration.showTileLabels = showTileLabels;

			return configuration;
		});
	};

	return {
		changePieceStyle,
		changeBoardStyle,
		changeOutlineStyle,
		showTileLabels,
		shouldFlipBoard,
		changeHighlightStyle,
		changeFlipOnMove,
		changePieceSize,
		subscribe,
		reset: () => set(DEFAULT_CONFIGURATION),
	};
};

export const configuration = createConfiguration();
