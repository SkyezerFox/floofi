import { Message } from "discord.js";

import { FloofiClient } from "../../FloofiClient";
import { SyntaxType } from "../SyntaxType";

export class StringType extends SyntaxType<string> {
	public static typeName = "string";

	public parse(
		client: FloofiClient,
		message: Message,
		arg: string,
		index: number,
	) {
		return arg;
	}
}
