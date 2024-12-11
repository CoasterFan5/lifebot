import type { LifebotCommand } from "../types/commandTypes";
import { balance } from "./balance";
import { crime } from "./crime";
import { invite } from "./invite";
import { pay } from "./pay";
import { petstore } from "./petStore";
import { pets } from "./pets";
import { ping } from "./ping";
import { rank } from "./rank";
import { source } from "./source";
import { work } from "./work";
import {buypet} from "./buyPet";


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
  rank,
  pets,
  buypet,
};
