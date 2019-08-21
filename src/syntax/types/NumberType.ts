import { FloofiClient } from "../../client/FloofiClient";
import { SyntaxParseError } from "../SyntaxParseError";
import { DEFAULT_SYNTAX_OPTIONS, SyntaxType, SyntaxTypeOptions } from "../SyntaxType";

export interface NumberTypeOptions extends SyntaxTypeOptions {
	max: number;
	min: number;
}

export const DEFAULT_NUMBERTYPE_OPTIONS: NumberTypeOptions = Object.assign(
	DEFAULT_SYNTAX_OPTIONS,
	{
		max: -1,
		min: -1,
	},
);

/**
 * Syntax type for representing strings
 */
export class NumberType extends SyntaxType<string> {
	public typeName = "number";
	public options: NumberTypeOptions;

	constructor(name: string, extras?: Partial<NumberTypeOptions>) {
		super(name, extras);

		this.options = Object.assign(DEFAULT_NUMBERTYPE_OPTIONS, extras);
	}

	public parse(client: FloofiClient, arg: string, index: number) {
		const value = parseInt(arg, 10);

		if (isNaN(value)) {
			throw new SyntaxParseError("PARSE_ERROR", arg, this, index);
		}

		if (this.options.max !== -1) {
			if (arg.length > this.options.max) {
				throw new SyntaxParseError("RANGE_ERROR", arg, this, index);
			}
		}

		if (this.options.min !== -1) {
			if (arg.length < this.options.min) {
				throw new SyntaxParseError("RANGE_ERROR", arg, this, index);
			}
		}

		return arg;
	}
}
