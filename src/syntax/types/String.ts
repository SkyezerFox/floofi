import { Message } from "discord.js";

import { FloofiClient } from "../../FloofiClient";
import { SyntaxParserError } from "../SyntaxParserError";
import { DEFAULT_SYNTAX_OPTIONS, SyntaxType, SyntaxTypeOptions } from "../SyntaxType";

export interface StringTypeOptions extends SyntaxTypeOptions {
	maxLength: number;
	minLength: number;
}

export const DEFAULT_STRINGTYPE_OPTIONS: StringTypeOptions = Object.assign(
	DEFAULT_SYNTAX_OPTIONS,
	{
		maxLength: -1,
		minLength: -1,
	},
);

/**
 * Syntax type for representing strings.
 */
export class StringType extends SyntaxType<string> {
	public typeName = "string";
	public options: StringTypeOptions;

	constructor(name: string, extras?: Partial<StringTypeOptions>) {
		// Enable concat
		super(name, Object.assign(DEFAULT_STRINGTYPE_OPTIONS, extras));
		if (name === "description") {
			console.log(
				"SUPER CALLED",
				Object.assign(DEFAULT_SYNTAX_OPTIONS, extras),
			);
			console.log(Object.assign(DEFAULT_SYNTAX_OPTIONS, extras).rest);
			console.log("---------------------------");
		}

		this.options = Object.assign(DEFAULT_STRINGTYPE_OPTIONS, extras);
		if (name === "description") {
			console.log(
				"STRING ASSIGNED",
				Object.assign(DEFAULT_STRINGTYPE_OPTIONS, extras),
			);
			console.log(Object.assign(DEFAULT_STRINGTYPE_OPTIONS, extras).rest);
			console.log("---------------------------");
		}
	}

	public parse(
		client: FloofiClient,
		message: Message,
		arg: string,
		index: number,
	) {
		if (this.options.maxLength !== -1) {
			if (arg.length > this.options.maxLength) {
				throw new SyntaxParserError("RANGE_ERROR", {
					arg,
					index,
					syntax: this,
				});
			}
		}

		if (this.options.minLength !== -1) {
			if (arg.length < this.options.minLength) {
				throw new SyntaxParserError("RANGE_ERROR", {
					arg,
					index,
					syntax: this,
				});
			}
		}

		return arg;
	}
}
