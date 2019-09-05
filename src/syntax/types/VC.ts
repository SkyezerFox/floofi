import { Channel, GuildChannel, Message, TextChannel, VoiceChannel } from "discord.js";

import { FloofiClient } from "../../FloofiClient";
import { SyntaxParserError } from "../SyntaxParserError";
import { SyntaxType } from "../SyntaxType";

/**
 * Syntax type used to effectively disable syntax parsing.
 */
export class VCType extends SyntaxType<VoiceChannel> {
	public static typeName = "channel";

	public parse(
		client: FloofiClient,
		message: Message,
		arg: string,
		index: number,
	) {
		const name = arg.match(/#[a-zA-Z0-9 \-]+/);
		const validSnowflake = arg.match(/(?<=<#)[0-9]+(?=>)/);

		if (!validSnowflake && !name) {
			throw new SyntaxParserError("PARSE_ERROR", {
				arg,
				index,
				syntax: this,
			});
		}
		let channel: GuildChannel | undefined;

		if (validSnowflake) {
			const value = validSnowflake[0];
			channel = message.guild.channels.get(value);
		} else if (name) {
			channel = message.guild.channels.find(
				(namedChannel) => namedChannel.name === name[0],
			);
		}

		if (!channel) {
			throw new SyntaxParserError("VALUE_ERROR", {
				arg,
				index,
				syntax: this,
			});
		}

		if (channel.type !== "voice") {
			throw new SyntaxParserError("VALUE_ERROR", {
				arg,
				index,
				syntax: this,
			});
		}

		return channel as VoiceChannel;
	}
}
