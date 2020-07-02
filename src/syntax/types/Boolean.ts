import { Message } from "discord.js";

import { FloofiClient } from "../../FloofiClient";
import { SyntaxParserError } from "../SyntaxParserError";
import { SyntaxType } from "../SyntaxType";

/**
 * Syntax type used to represent boolean values.
 */
export class BooleanType extends SyntaxType<boolean> {
	public static typeName = "boolean";

	public parse(
		client: FloofiClient,
		message: Message,
		arg: string,
		index: number,
	) {
		const normalized = arg.toLowerCase();

		if (/(yes|no|on|off|true|false|0|1|y|n)/.test(normalized)) {
			throw new SyntaxParserError("PARSE_ERROR", {
				arg,
				index,
				syntax: this,
			});
		}

		return /(yes|on|true|0|y)/.test(normalized);
	}
}
