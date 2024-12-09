import { ping } from "./ping";
import { LifebotCommand } from "../types/commandTypes";
import { source } from "./source";
import { balance } from "./balance";

export const commands: {
  [key: string]: LifebotCommand;
} = {
  ping,
  source,
  balance,
};
