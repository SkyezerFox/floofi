import { Message } from "discord.js";

import { FloofiClient } from "../../FloofiClient";
import { SyntaxParserError } from "../SyntaxParserError";
import { SyntaxType } from "../SyntaxType";

/**
 * Syntax type used to effectively disable syntax parsing.
 */
export class InviteType extends SyntaxType<any> {
	public typeName = "invite";

	public async parse(
		client: FloofiClient,
		message: Message,
		arg: string,
		index: number,
	) {
		if (!arg.match(/\b(https:\/\/)?(discord\.gg\/)?[a-zA-Z]+\b/)) {
			throw new SyntaxParserError("PARSE_ERROR", {
				arg,
				index,
				syntax: this,
			});
		}

		const syntax = await client.fetchInvite(arg).catch((err) => {
			throw new SyntaxParserError("VALUE_ERROR", {
				arg,
				index,
				syntax: this,
			});
		});
	}
}
