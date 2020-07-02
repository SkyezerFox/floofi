import { Message, User } from "discord.js";

import { FloofiClient } from "../../FloofiClient";
import { SyntaxParserError } from "../SyntaxParserError";
import { SyntaxType } from "../SyntaxType";

/**
 * Syntax type used to effectively disable syntax parsing.
 */
export class UserType extends SyntaxType<User> {
	public static typeName = "member";

	public parse(
		client: FloofiClient,
		message: Message,
		arg: string,
		index: number,
	) {
		const name = arg.match(/@.*#[0-9]{4}/);
		const validSnowflake = arg.match(/(?<=<@)[0-9]+(?=>)/);

		if (!validSnowflake && !name) {
			throw new SyntaxParserError("PARSE_ERROR", {
				arg,
				index,
				syntax: this,
			});
		}

		let user: User | undefined;

		if (validSnowflake) {
			const value = validSnowflake[0];
			user = client.users.get(value);
		} else if (name) {
			user = client.users.find((namedUser) => namedUser.tag === name[0]);
		}

		if (!user) {
			throw new SyntaxParserError("VALUE_ERROR", {
				arg,
				index,
				syntax: this,
			});
		}

		return user;
	}
}
