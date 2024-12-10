import { Message, OmitPartialGroupDMChannel } from "discord.js";

export type QuickTimeEvent = (
  message: OmitPartialGroupDMChannel<Message<boolean>>,
) => Promise<void>;
