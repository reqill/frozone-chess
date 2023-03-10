import { StringifiedMap } from '$lib/common/map';

export const copyStringifiedMap = <T extends Record<string, unknown>, P>(
	map: StringifiedMap<T, P>
) => {
	return new StringifiedMap<T, P>(JSON.parse(JSON.stringify(Array.from(map))));
};
