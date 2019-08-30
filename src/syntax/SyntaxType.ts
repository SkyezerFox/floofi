import { Message } from "discord.js";

import { FloofiClient } from "../FloofiClient";
import { ParseableType } from "./SyntaxParser";

export type SyntaxTypeConstructor = new (
	name: string,
	extras?: Partial<SyntaxTypeOptions>,
) => SyntaxType<any>;

export interface SyntaxTypeOptions {
	concat: boolean;
	optional: boolean;
	rest: boolean;
}

export const DEFAULT_SYNTAX_OPTIONS: SyntaxTypeOptions = {
	concat: false,
	optional: false,
	rest: false,
};

/**
 * Class for representing syntax types
 */
export abstract class SyntaxType<Type extends ParseableType> {
	/**
	 * Returns whether the argument is rest
	 */
	get rest() {
		return this.options.rest;
	}

	/**
	 * Gets whether the argument is optional
	 */
	get optional() {
		return this.options.optional;
	}

	get concat() {
		return this.options.concat;
	}

	public typeName = "SyntaxType";
	public name: string;

	public options: SyntaxTypeOptions;

	constructor(name: string, extras?: Partial<SyntaxTypeOptions>) {
		if (this.constructor.name === "SyntaxType") {
			throw Error("The SyntaxType class may not be instantiated.");
		}
		this.name = name;

		this.options = Object.assign(DEFAULT_SYNTAX_OPTIONS, extras);
	}

	/**
	 * Makes the argument rest, or sets rest mode on this arg.
	 * @param toggle Whether the argument is rest or not
	 */
	public isRest(toggle = true) {
		this.options.rest = toggle;
	}

	/**
	 * Makes the argument optional, or sets optional status on this arg.
	 * @param toggle Whether the argument is optional or not
	 */
	public isOptional(toggle = true) {
		this.options.optional = toggle;
	}

	/**
	 * Makes the argument concatenable, or sets concatenation enabled on this arg.
	 * @param toggle Whether or not the argument is concatenable
	 */
	public isConcat(toggle = true) {
		this.options.concat = toggle;
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
	): Type {
		throw Error("The SyntaxType class has no parse method");
	}
}
