import { Message } from "discord.js";

import { FloofiClient } from "../../FloofiClient";
import { SyntaxType } from "../SyntaxType";

/**
 * Syntax type used to effectively disable syntax parsing.
 */
export class AnyType extends SyntaxType<any> {
	public typeName = "any";

	public parse(client: FloofiClient, message: Message, arg: string) {
		return arg;
	}
}
