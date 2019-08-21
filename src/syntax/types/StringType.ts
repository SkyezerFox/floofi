import { FloofiClient } from "../../client/FloofiClient";
import { SyntaxParseError } from "../SyntaxParseError";
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
 * Syntax type for representing strings
 */
export class StringType extends SyntaxType<string> {
	public typeName = "string";
	public options: StringTypeOptions;

	constructor(name: string, extras?: Partial<StringTypeOptions>) {
		super(name, extras);

		this.options = Object.assign(DEFAULT_STRINGTYPE_OPTIONS, extras);
	}

	public parse(client: FloofiClient, arg: string, index: number) {
		if (this.options.maxLength !== -1) {
			if (arg.length > this.options.maxLength) {
				throw new SyntaxParseError("RANGE_ERROR", arg, this, index);
			}
		}

		if (this.options.minLength !== -1) {
			if (arg.length < this.options.minLength) {
				throw new SyntaxParseError("RANGE_ERROR", arg, this, index);
			}
		}

		return arg;
	}
}
