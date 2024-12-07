import { ping } from "./ping";
import { LifebotCommand } from "../types/commandTypes";
import { source } from "./source";

export const commands: {
  [key: string]: LifebotCommand;
} = {
  ping,
  source,
};
