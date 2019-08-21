import { FloofiClient } from "../client/FloofiClient";
import { SyntaxType } from "./SyntaxType";
export declare type ReturnableParserType = string | number | boolean;
/**
 * Class for dealing with syntax
 */
export declare class SyntaxParser {
    types: Array<SyntaxType<ReturnableParserType>> | Array<Array<SyntaxType<ReturnableParserType>>>;
    constructor(syntax: string | string[] | string[][] | Array<SyntaxType<ReturnableParserType>> | Array<Array<SyntaxType<ReturnableParserType>>>);
    /**
     * Converts a syntax string array into
     * @param syntaxString The syntax string/type string array to convert to types
     */
    stringArrayToTypes(syntaxString: string | string[]): Array<SyntaxType<ReturnableParserType>>;
    /**
     * Parses strings to the arguments
     * @param args Arguments to parse
     */
    parse(client: FloofiClient, args: string[]): ReturnableParserType[];
    private _arrToTypes;
}
