export const parseMillisecondsToGameTime = (milliseconds?: number): string => {
	if (milliseconds === undefined) return '0:00';

	const minutes = Math.floor(milliseconds / 60000);
	const seconds = Math.floor((milliseconds % 60000) / 1000);
	const ms = Math.floor((milliseconds % 1000) / 10);

	if (seconds < 10 && minutes === 0 && ms < 10) {
		return `${seconds}.0${Math.round(Math.floor(ms / 10) / 2) * 2}`;
	} else if (seconds < 10 && minutes === 0) {
		return `${seconds}.${ms}`;
	} else if (minutes === 0) {
		return `${seconds}.${Math.floor(ms / 10)}`;
	} else if (seconds < 10) {
		return `${minutes}:0${seconds}`;
	} else {
		return `${minutes}:${seconds}`;
	}
};
