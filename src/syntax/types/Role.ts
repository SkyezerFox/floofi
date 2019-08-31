import { Message, Role } from "discord.js";

import { FloofiClient } from "../../FloofiClient";
import { SyntaxParserError } from "../SyntaxParserError";
import { SyntaxType } from "../SyntaxType";

/**
 * Syntax type used to effectively disable syntax parsing.
 */
export class RoleType extends SyntaxType<Role> {
	public typeName = "role";

	public parse(
		client: FloofiClient,
		message: Message,
		arg: string,
		index: number,
	) {
		const name = arg.match(/@?.*#[0-9]{4}/);
		const validSnowflake = arg.match(/(?<=<@)[0-9]+(?=>)/);

		if (!validSnowflake && !name) {
			throw new SyntaxParserError("PARSE_ERROR", {
				arg,
				index,
				syntax: this,
			});
		}

		let role: Role | undefined;

		if (validSnowflake) {
			const value = validSnowflake[0];
			role = message.guild.roles.get(value);
		} else if (name) {
			role = message.guild.roles.find(
				(namedRole) => namedRole.name === name[0],
			);
		}

		if (!role) {
			throw new SyntaxParserError("VALUE_ERROR", {
				arg,
				index,
				syntax: this,
			});
		}

		return role;
	}
}
