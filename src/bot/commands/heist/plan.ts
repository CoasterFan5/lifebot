import type { LifebotCommandHandler } from "../../types/commandTypes";
import { utils } from "../../utils/utils";
import { heistLocations } from "./data/locations";

export const plan: LifebotCommandHandler = async ({ interaction }) => {
	const easyLocation = utils.randomFromArray(heistLocations.easy);
	const mediumLocation = utils.randomFromArray(heistLocations.medium);
	const hardLocation = utils.randomFromArray(heistLocations.hard);
};
