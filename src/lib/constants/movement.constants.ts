const UP_MOVE_INDEX_CHANGE = -8;
const DOWN_MOVE_INDEX_CHANGE = 8;

const LEFT_MOVE_INDEX_CHANGE = -1;
const RIGHT_MOVE_INDEX_CHANGE = 1;

const UP_LEFT_MOVE_INDEX_CHANGE = DOWN_MOVE_INDEX_CHANGE + LEFT_MOVE_INDEX_CHANGE;
const UP_RIGHT_MOVE_INDEX_CHANGE = DOWN_MOVE_INDEX_CHANGE + RIGHT_MOVE_INDEX_CHANGE;

const DOUBLE_UP = 2 * UP_MOVE_INDEX_CHANGE;
const DOUBLE_DOWN = 2 * DOWN_MOVE_INDEX_CHANGE;

const DOWN_LEFT_MOVE_INDEX_CHANGE = UP_MOVE_INDEX_CHANGE + LEFT_MOVE_INDEX_CHANGE;
const DOWN_RIGHT_MOVE_INDEX_CHANGE = UP_MOVE_INDEX_CHANGE + RIGHT_MOVE_INDEX_CHANGE;

const KNIGHT_UP_UP_LEFT = DOUBLE_UP + LEFT_MOVE_INDEX_CHANGE;
const KNIGHT_UP_UP_RIGHT = DOUBLE_UP + RIGHT_MOVE_INDEX_CHANGE;
const KNIGHT_UP_LEFT_LEFT = UP_MOVE_INDEX_CHANGE + LEFT_MOVE_INDEX_CHANGE + LEFT_MOVE_INDEX_CHANGE;
const KNIGHT_UP_RIGHT_RIGHT =
	UP_MOVE_INDEX_CHANGE + RIGHT_MOVE_INDEX_CHANGE + RIGHT_MOVE_INDEX_CHANGE;
const KNIGHT_DOWN_DOWN_LEFT = DOUBLE_DOWN + LEFT_MOVE_INDEX_CHANGE;
const KNIGHT_DOWN_DOWN_RIGHT = DOUBLE_DOWN + RIGHT_MOVE_INDEX_CHANGE;
const KNIGHT_DOWN_LEFT_LEFT =
	DOWN_MOVE_INDEX_CHANGE + LEFT_MOVE_INDEX_CHANGE + LEFT_MOVE_INDEX_CHANGE;
const KNIGHT_DOWN_RIGHT_RIGHT =
	DOWN_MOVE_INDEX_CHANGE + RIGHT_MOVE_INDEX_CHANGE + RIGHT_MOVE_INDEX_CHANGE;

export const MOVE_INDEX_CHANGE = {
	UP: UP_MOVE_INDEX_CHANGE,
	DOWN: DOWN_MOVE_INDEX_CHANGE,
	LEFT: LEFT_MOVE_INDEX_CHANGE,
	RIGHT: RIGHT_MOVE_INDEX_CHANGE,
	UP_LEFT: UP_LEFT_MOVE_INDEX_CHANGE,
	UP_RIGHT: UP_RIGHT_MOVE_INDEX_CHANGE,
	DOWN_LEFT: DOWN_LEFT_MOVE_INDEX_CHANGE,
	DOWN_RIGHT: DOWN_RIGHT_MOVE_INDEX_CHANGE,
	DOUBLE_UP,
	DOUBLE_DOWN,
	KNIGHT_UP_UP_LEFT,
	KNIGHT_UP_UP_RIGHT,
	KNIGHT_UP_LEFT_LEFT,
	KNIGHT_UP_RIGHT_RIGHT,
	KNIGHT_DOWN_DOWN_LEFT,
	KNIGHT_DOWN_DOWN_RIGHT,
	KNIGHT_DOWN_LEFT_LEFT,
	KNIGHT_DOWN_RIGHT_RIGHT,
} as const;
