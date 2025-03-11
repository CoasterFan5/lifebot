export type Material =
	| "Plastic"
	| "Stone"
	| "Plywood"
	| "Pinewood"
	| "Steel"
	| "Oak"
	| "Leather"
	| "Teakwood";

export const materials: Material[] = [
	"Plastic",
	"Stone",
	"Plywood",
	"Pinewood",
	"Steel",
	"Oak",
	"Leather",
	"Teakwood",
];

const matMap: Record<Material, number> = {
	Plastic: 1,
	Stone: 2,
	Plywood: 3,
	Pinewood: 4,
	Steel: 5,
	Oak: 6,
	Leather: 7,
	Teakwood: 8,
};

export const getMaterialScore = (material: Material) => {
	return matMap[material];
};
