import { FloofiClient } from "../../client/FloofiClient";
import { SyntaxType, SyntaxTypeOptions } from "../SyntaxType";
export interface NumberTypeOptions extends SyntaxTypeOptions {
    max: number;
    min: number;
}
export declare const DEFAULT_NUMBERTYPE_OPTIONS: NumberTypeOptions;
/**
 * Syntax type for representing strings
 */
export declare class NumberType extends SyntaxType<string> {
    typeName: string;
    options: NumberTypeOptions;
    constructor(name: string, extras?: Partial<NumberTypeOptions>);
    parse(client: FloofiClient, arg: string, index: number): string;
}
