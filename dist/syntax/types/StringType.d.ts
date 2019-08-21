import { FloofiClient } from "../../client/FloofiClient";
import { SyntaxType, SyntaxTypeOptions } from "../SyntaxType";
export interface StringTypeOptions extends SyntaxTypeOptions {
    maxLength: number;
    minLength: number;
}
export declare const DEFAULT_STRINGTYPE_OPTIONS: StringTypeOptions;
/**
 * Syntax type for representing strings
 */
export declare class StringType extends SyntaxType<string> {
    typeName: string;
    options: StringTypeOptions;
    constructor(name: string, extras?: Partial<StringTypeOptions>);
    parse(client: FloofiClient, arg: string, index: number): string;
}
