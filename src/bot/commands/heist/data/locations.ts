type HeistLocation = {
	name: string;
	puzzleRooms: {
		min: number;
		max: number;
	};
	rooms: {
		min: number;
		max: number;
	};
};

export const heistLocations: {
	easy: HeistLocation[];
	medium: HeistLocation[];
	hard: HeistLocation[];
} = {
	easy: [
		{
			name: "apartment",
			rooms: {
				min: 2,
				max: 4,
			},
			puzzleRooms: {
				min: 1,
				max: 2,
			},
		},
	],
	medium: [
		{
			name: "apartment",
			rooms: {
				min: 2,
				max: 4,
			},
			puzzleRooms: {
				min: 1,
				max: 2,
			},
		},
	],
	hard: [
		{
			name: "apartment",
			rooms: {
				min: 2,
				max: 4,
			},
			puzzleRooms: {
				min: 1,
				max: 2,
			},
		},
	],
};
