import { FloofiClient } from "../../client/FloofiClient";
import { SyntaxParseError } from "../SyntaxParseError";
import {
	DEFAULT_SYNTAX_OPTIONS,
	SyntaxType,
	SyntaxTypeOptions,
} from "../SyntaxType";

/**
 * Syntax type for representing strings
 */
export class MemberType extends SyntaxType<string> {
	public typeName = "member";

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
