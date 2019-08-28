import { SyntaxType } from "./SyntaxType";

/**
 * Error for representing floofi syntax errors
 */
export class SyntaxParserError extends Error {
	public type:
		| "RANGE_ERROR"
		| "PARSE_ERROR"
		| "VALUE_ERROR"
		| "INTERNAL_ERROR";

	public arg?: string;
	public message: string;
	public index?: number;
	public syntax?: SyntaxType<any>;

	constructor(
		type: "RANGE_ERROR" | "PARSE_ERROR" | "VALUE_ERROR" | "INTERNAL_ERROR",
		data: {
			arg?: string;
			syntax?: SyntaxType<any>;
			index?: number;
			message?: string;
		},
	) {
		super("SyntaxParseError");
		this.type = type;

		this.arg = data.arg;
		this.syntax = data.syntax;
		this.index = data.index;
		this.message = data.message || "";
	}
}
