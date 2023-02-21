import { readable } from 'svelte/store';

export const time = readable(0, function start(set) {
	const beginning = new Date();
	const beginningTime = beginning.getTime();

	const interval = setInterval(() => {
		const current = new Date();
		const currentTime = current.getTime();
		set(currentTime - beginningTime);
	}, 100);

	return function stop() {
		set(0);
		clearInterval(interval);
	};
});
