import { FloofiClient } from "../client/FloofiClient";
import { ReturnableParserType } from "./SyntaxParser";
export interface SyntaxTypeOptions {
    optional: boolean;
    rest: boolean;
}
export declare const DEFAULT_SYNTAX_OPTIONS: SyntaxTypeOptions;
/**
 * Class for representing syntax types
 */
export declare class SyntaxType<Type extends ReturnableParserType> {
    /**
     * Returns whether the argument is rest
     */
    readonly rest: boolean;
    /**
     * Gets whether the argument is optional
     */
    readonly optional: boolean;
    typeName: string;
    name: string;
    options: SyntaxTypeOptions;
    constructor(name: string, extras?: Partial<SyntaxTypeOptions>);
    /**
     * Makes the argument rest, or sets rest mode to the provided arg
     * @param toggle Whether the argument is rest or not
     */
    isRest(toggle?: boolean): void;
    /**
     * Makes the argument optional, or sets optional status to the provided arg
     * @param toggle Whether the argument is optional or not
     */
    isOptional(toggle?: boolean): void;
    parse(client: FloofiClient, value: string, index: number): Type;
}
