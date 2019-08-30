import { Message } from "discord.js";

import { FloofiClient } from "../../FloofiClient";
import { SyntaxType } from "../SyntaxType";

/**
 * Syntax type used to effectively disable syntax parsing.
 */
export class VCType extends SyntaxType<any> {
	public typeName = "vc";

	public parse(client: FloofiClient, message: Message, arg: string) {
		return arg;
	}
}
