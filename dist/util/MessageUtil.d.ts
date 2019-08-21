import { Attachment, Message, MessageOptions, RichEmbed, TextChannel } from "discord.js";
export declare const SelfDestructingMessage: (channel: TextChannel, content: any, time?: number, options?: Attachment | RichEmbed | MessageOptions | undefined) => Promise<Message | Message[]>;
