import { FloofiClient } from "../client/FloofiClient";
import { SyntaxParseError } from "./SyntaxParseError";
import { SyntaxType } from "./SyntaxType";
import { AnyType } from "./types/AnyType";
import { NumberType } from "./types/NumberType";
import { StringType } from "./types/StringType";

export type ReturnableParserType = string | number | boolean | any;

/**
 * Class for dealing with syntax
 */
export class SyntaxParser {
	public types:
		| Array<SyntaxType<ReturnableParserType>>
		| Array<Array<SyntaxType<ReturnableParserType>>>;

	constructor(
		syntax:
			| string
			| string[]
			| string[][]
			| Array<SyntaxType<ReturnableParserType>>
			| Array<Array<SyntaxType<ReturnableParserType>>>,
	) {
		if (syntax instanceof Array) {
			if (syntax.slice(0, 1)[0] instanceof SyntaxType) {
				this.types = syntax as Array<SyntaxType<ReturnableParserType>>;
			} else {
				this.types = (syntax as string[][]).map((v) =>
					this.stringArrayToTypes(v as string[]),
				);
			}
		} else {
			this.types = this.stringArrayToTypes(syntax as string | string[]);
		}

		// If multiple syntaxes are provided - ensures the longest matching syntax is always tested first
		if (
			this.types instanceof Array &&
			this.types.slice(0, 1)[0] instanceof Array
		) {
			(this.types as Array<Array<SyntaxType<ReturnableParserType>>>).sort(
				(a, b) => b.length - a.length,
			);
		}
	}

	/**
	 * Converts a syntax string array into
	 * @param syntaxString The syntax string/type string array to convert to types
	 */
	public stringArrayToTypes(
		syntaxString: string | string[],
	): Array<SyntaxType<ReturnableParserType>> {
		if (syntaxString instanceof Array) {
			return this._arrToTypes(syntaxString);
		} else {
			return this._arrToTypes(syntaxString.split(" "));
		}
	}

	/**
	 * Parses strings to the arguments
	 * @param args Arguments to parse
	 */
	public parse(client: FloofiClient, args: string[]): ReturnableParserType[] {
		let normalArgs: string[] = [];
		let restArgs: string[] = [];

		// If multiple syntaxes are provided
		if (
			this.types instanceof Array &&
			this.types.slice(0, 1)[0] instanceof Array
		) {
			const errors: SyntaxParseError[] = [];
			let parsedArgs;

			for (let i = 0; i < this.types.length; i++) {
				try {
					const syntax = (this.types as Array<
						Array<SyntaxType<ReturnableParserType>>
					>)[i];

					normalArgs = args;

					if (args.length > syntax.length) {
						if (!syntax[syntax.length - 1].rest) {
							throw new SyntaxParseError("INTERNAL_ERROR");
						}

						normalArgs = args.slice(0, syntax.length - 1);
						restArgs = args.slice(syntax.length - 1);
					} else if (args.length < syntax.length) {
						// Missing required arguments
						if (!syntax[args.length].optional) {
							throw new SyntaxParseError("PARSE_ERROR");
						}
					}
					// Map the args with assigned syntaxes to their parsed values - parse the rest values to the rest type
					parsedArgs = normalArgs
						.map((v, j) => {
							return syntax[j].parse(client, v, j);
						})
						.concat(
							restArgs.map((v, j) =>
								syntax[syntax.length - 1].parse(client, v, j),
							),
						);
					break;
				} catch (err) {
					errors.push(err);
				}
			}

			if (!parsedArgs && errors.length >= 1) {
				throw errors[0];
			} else {
				return args as ReturnableParserType[];
			}
		}

		const syntax = this.types as Array<SyntaxType<ReturnableParserType>>;

		if (args.length > syntax.length) {
			if (!syntax[syntax.length - 1].rest) {
				throw new SyntaxParseError("INTERNAL_ERROR");
			}

			normalArgs = args.slice(0, syntax.length - 1);
			restArgs = args.slice(syntax.length - 1);
		}

		return normalArgs
			.map((v, j) => syntax[j].parse(client, v, j))
			.concat(
				restArgs.map((v, i) =>
					syntax[syntax.length - 1].parse(client, v, i),
				),
			);
	}

	// Convert an array of strings to SyntaxTypes
	private _arrToTypes(
		str: string[],
	): Array<SyntaxType<ReturnableParserType>> {
		return str
			.map((v) => {
				if (v === "") {
					return undefined;
				}

				let rest = false;

				const nameArr = v.split(":");

				if (
					v
						.split(":")[1]
						.split(/[\]>]/)[0]
						.endsWith("...")
				) {
					rest = true;
				}
				const type = rest
					? nameArr[1].endsWith(">") || nameArr[1].endsWith("]")
						? nameArr[1].slice(0, -4)
						: nameArr[1].slice(3)
					: nameArr[1].endsWith(">") || nameArr[1].endsWith("]")
					? nameArr[1].slice(0, -1)
					: nameArr[1];

				const name =
					nameArr[0].startsWith("<") || nameArr[0].startsWith("[")
						? nameArr[0].slice(1)
						: nameArr[0];

				switch (type as "string" | "number" | "boolean" | "any") {
					case "any": {
						return new AnyType(name, { rest });
					}
					case "string": {
						return new StringType(name, {
							rest,
						});
					}
					case "number": {
						return new NumberType(name, {
							rest,
						});
					}
					default: {
						throw Error(`Invalid type "${v}"`);
					}
				}
			})
			.filter((v) => v !== undefined) as Array<
			SyntaxType<ReturnableParserType>
		>;
	}
}
