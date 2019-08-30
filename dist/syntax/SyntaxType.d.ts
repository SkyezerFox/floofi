import { Message } from "discord.js";
import { FloofiClient } from "../FloofiClient";
import { ParseableType } from "./SyntaxParser";
export declare type SyntaxTypeConstructor = new (name: string, extras?: Partial<SyntaxTypeOptions>) => SyntaxType<any>;
export interface SyntaxTypeOptions {
    concat: boolean;
    optional: boolean;
    rest: boolean;
}
export declare const DEFAULT_SYNTAX_OPTIONS: SyntaxTypeOptions;
/**
 * Class for representing syntax types
 */
export declare abstract class SyntaxType<Type extends ParseableType> {
    /**
     * Returns whether the argument is rest
     */
    readonly rest: boolean;
    /**
     * Gets whether the argument is optional
     */
    readonly optional: boolean;
    readonly concat: boolean;
    typeName: string;
    name: string;
    options: SyntaxTypeOptions;
    constructor(name: string, extras?: Partial<SyntaxTypeOptions>);
    /**
     * Makes the argument rest, or sets rest mode on this arg.
     * @param toggle Whether the argument is rest or not
     */
    isRest(toggle?: boolean): void;
    /**
     * Makes the argument optional, or sets optional status on this arg.
     * @param toggle Whether the argument is optional or not
     */
    isOptional(toggle?: boolean): void;
    /**
     * Makes the argument concatenable, or sets concatenation enabled on this arg.
     * @param toggle Whether or not the argument is concatenable
     */
    isConcat(toggle?: boolean): void;
    /**
     * Attempt to parse the given string argument into the type's output
     * @param {FloofiClient} client - The client object
     * @param {string} value - Value parsed from the message
     * @param {number} index - Current index of the argument
     */
    parse(client: FloofiClient, message: Message, value: string, index: number): Type;
}
