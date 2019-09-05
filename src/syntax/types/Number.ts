import { Message } from "discord.js";

import { FloofiClient } from "../../FloofiClient";
import { SyntaxParserError } from "../SyntaxParserError";
import { SyntaxType } from "../SyntaxType";

/**
 * Syntax type for representing numbers.
 */
export class NumberType extends SyntaxType<number> {
	public static typeName = "number";

	public parse(
		client: FloofiClient,
		message: Message,
		arg: string,
		index: number,
	) {
		const int = parseInt(arg, 10);

		if (isNaN(int)) {
			throw new SyntaxParserError("PARSE_ERROR", {
				arg,
				index,
				syntax: this,
			});
		}

		return int;
	}
}
