import { ping } from "./ping";
import { LifebotCommand } from "../types/commandTypes";
import { source } from "./source";
import { balance } from "./balance";
import { work } from "./work";
import { invite } from "./invite";
import { crime } from "./crime";
import { petstore } from "./petstore";

export const commands: {
  [key: string]: LifebotCommand;
} = {
  ping,
  source,
  balance,
  work,
  invite,
  crime,
  petstore,
};
