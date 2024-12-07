import { ping } from "./ping";
import { LifebotCommand } from "../types/commandTypes";

export const commands: {
  [key: string]: LifebotCommand;
} = {
  ping,
};
