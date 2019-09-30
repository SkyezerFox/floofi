import { GuildMember, Message } from "discord.js";

import { FloofiClient } from "../../FloofiClient";
import { SyntaxParserError } from "../SyntaxParserError";
import { SyntaxType } from "../SyntaxType";

/**
 * Syntax type used to effectively disable syntax parsing.
 */
export class MemberType extends SyntaxType<GuildMember> {
	public typeName = "member";

	public parse(
		client: FloofiClient,
		message: Message,
		arg: string,
		index: number,
	) {
		const name = arg.match(/@.*#[0-9]{4}/);
		const validSnowflake = arg.match(/(?<=<@!?)[0-9]+(?=>)/);

		if (!validSnowflake && !name) {
			throw new SyntaxParserError("PARSE_ERROR", {
				arg,
				index,
				syntax: this,
			});
		}

		let member: GuildMember | undefined;

		if (validSnowflake) {
			const value = validSnowflake[0];
			member = message.guild.members.get(value);
		} else if (name) {
			member = message.guild.members.find(
				(namedMember) => namedMember.user.tag === name[0],
			);
		}

		if (!member) {
			throw new SyntaxParserError("VALUE_ERROR", {
				arg,
				index,
				syntax: this,
			});
		}

		return member;
	}
}
