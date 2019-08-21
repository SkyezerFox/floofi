import { SyntaxType } from "./SyntaxType";

/**
 * Error for representing floofi syntax errors
 */
export class SyntaxParseError extends Error {
	public type:
		| "RANGE_ERROR"
		| "PARSE_ERROR"
		| "VALUE_ERROR"
		| "INTERNAL_ERROR";

	public arg?: string;
	public syntax?: SyntaxType<any>;
	public position?: number;

	constructor(
		type: "RANGE_ERROR" | "PARSE_ERROR" | "VALUE_ERROR" | "INTERNAL_ERROR",
		arg?: string,
		syntax?: SyntaxType<any>,
		position?: number,
	) {
		super("SyntaxParseError");
		this.type = type;

		this.arg = arg;
		this.syntax = syntax;
		this.position = position;
	}
}
