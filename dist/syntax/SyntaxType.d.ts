import { Message } from "discord.js";
import { FloofiClient } from "../FloofiClient";
import { ParseableType } from "./SyntaxParser";
export declare type SyntaxTypeConstructor = new (name: string, optional: boolean, rest: boolean, extras?: Partial<{}>) => SyntaxType<any>;
/**
 * Class for representing syntax types
 */
export declare abstract class SyntaxType<Type extends ParseableType | Promise<ParseableType>> {
    readonly rest: boolean;
    readonly optional: boolean;
    readonly typeName = "SyntaxType";
    readonly argName: string;
    options: {};
    constructor(name: string, optional?: boolean, rest?: boolean, extras?: Partial<{}>);
    /**
     * Attempt to parse the given string argument into the type's output
     * @param {FloofiClient} client - The client object
     * @param {string} value - Value parsed from the message
     * @param {number} index - Current index of the argument
     */
    parse(client: FloofiClient, message: Message, value: string, index: number): Type | Promise<Type>;
}
