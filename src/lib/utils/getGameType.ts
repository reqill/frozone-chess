export const getGameType = (time?: number, increment = 0) => {
	if (!time) return 'Unlimited';

	const estimatedTime = time + increment * 40;
	let gameType = '';

	if (estimatedTime < 180) {
		gameType = 'Bullet';
	} else if (estimatedTime > 900) {
		gameType = 'Rapid';
	} else {
		gameType = 'Blitz';
	}

	return `${gameType} ${time} | ${increment}`;
};
