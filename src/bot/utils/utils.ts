import { camelCaseToTitle } from "./camelCaseToTitle";
import { Color } from "./colors";
import { nFormat } from "./nFormat";
import { getPersonalizedEmbed } from "./personalizedEmbed";

export const utils = {
	nFormat: nFormat,
	Color,
	camelCaseToTitle,
	getPersonalizedEmbed,
	formatMoney: (amt: number) => {
		return `$${nFormat(amt)}`;
	},
	randomFromArray: (arr: Array<unknown>) => {
		return arr[Math.floor(Math.random() * arr.length)];
	},
};
