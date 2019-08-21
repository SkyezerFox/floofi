import {
	Attachment,
	Message,
	MessageOptions,
	RichEmbed,
	TextChannel,
} from "discord.js";

/**
 * Create a self destructing message in the speicified channel that detonates after the specified time
 * @param {TextChannel} channel - The channel to send the message in
 * @param {*} content - Message content
 * @param {number} [time=5e3] - Time after which the message should explode
 * @param {MessageOptions | RichEmbed | Attachment} options - Extra options
 */
export const SelfDestructingMessage = (
	channel: TextChannel,
	content: any,
	time = 5e3,
	options?: MessageOptions | RichEmbed | Attachment,
): Promise<Message | Message[]> => {
	const messagePromise = channel.send(content, options);

	messagePromise.then((msg) => {
		msg instanceof Message
			? msg.delete(time)
			: msg.forEach((v) => v.delete(time));
	});

	return messagePromise;
};
