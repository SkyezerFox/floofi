import { Message } from "discord.js";

import { FloofiClient } from "../FloofiClient";
import { ParseableType } from "./SyntaxParser";

export type SyntaxTypeConstructor = new (
	name: string,
	optional: boolean,
	rest: boolean,
	extras?: Partial<{}>,
) => SyntaxType<any>;

/**
 * Class for representing syntax types
 */
export abstract class SyntaxType<
	Type extends ParseableType | Promise<ParseableType>
> {
	public readonly rest: boolean;
	public readonly optional: boolean;

	public readonly typeName = "SyntaxType";
	public readonly argName: string;

	public options: {};

	constructor(
		name: string,
		optional = true,
		rest = false,
		extras?: Partial<{}>,
	) {
		if (this.constructor.name === "SyntaxType") {
			throw Error("The SyntaxType class may not be instantiated.");
		}
		this.argName = name;

		this.optional = optional;
		this.rest = rest;

		this.options = Object.assign({}, extras);
	}
	/**
	 * Attempt to parse the given string argument into the type's output
	 * @param {FloofiClient} client - The client object
	 * @param {string} value - Value parsed from the message
	 * @param {number} index - Current index of the argument
	 */
	public parse(
		client: FloofiClient,
		message: Message,
		value: string,
		index: number,
	): Type | Promise<Type> {
		throw Error("The SyntaxType class has no parse method");
	}
}
