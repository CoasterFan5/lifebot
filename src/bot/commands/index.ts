import type { LifebotCommand } from "../types/commandTypes";
import { balance } from "./balance";
import { buypet } from "./buyPet";
import { crime } from "./crime";
import { invite } from "./invite";
import { pay } from "./pay";
import { petstore } from "./petStore";
import { pets } from "./pets";
import { ping } from "./ping";
import { rank } from "./rank";
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
  rank,
};
