import { Attachment, Message, MessageOptions, RichEmbed, TextChannel } from "discord.js";
/**
 * Create a self destructing message in the speicified channel that detonates after the specified time
 * @param {TextChannel} channel - The channel to send the message in
 * @param {*} content - Message content
 * @param {number} [time=5e3] - Time after which the message should explode
 * @param {MessageOptions | RichEmbed | Attachment} options - Extra options
 */
export declare const SelfDestructingMessage: (channel: TextChannel, content: any, time?: number, options?: Attachment | RichEmbed | MessageOptions | undefined) => Promise<Message | Message[]>;
