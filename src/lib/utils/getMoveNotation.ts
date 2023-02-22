import type { PositionStoreValueType } from '$lib/types/store.types';

export const getMoveNotation = (
	newPostions: PositionStoreValueType,
	oldPositions?: PositionStoreValueType
) => {
	if (!oldPositions) return 'NaP';

	// TODO: implement this function
	return '';
};
