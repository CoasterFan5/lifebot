import type { LifebotCommand } from "../types/commandTypes";
import { balance } from "./balance";
import { crime } from "./crime";
import { invite } from "./invite";
import { pay } from "./pay";
import { petstore } from "./petStore";
import { ping } from "./ping";
import { source } from "./source";
import { work } from "./work";

export const commands: {
	[key: string]: LifebotCommand;
} = {
	ping,
	source,
	balance,
	work,
	invite,
	crime,
	pay,
	petstore,
};
