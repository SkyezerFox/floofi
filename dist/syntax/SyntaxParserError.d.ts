import { SyntaxType } from "./SyntaxType";
/**
 * Error for representing floofi syntax errors
 */
export declare class SyntaxParserError extends Error {
    type: "RANGE_ERROR" | "PARSE_ERROR" | "VALUE_ERROR" | "INTERNAL_ERROR";
    arg?: string;
    message: string;
    index?: number;
    syntax?: SyntaxType<any>;
    constructor(type: "RANGE_ERROR" | "PARSE_ERROR" | "VALUE_ERROR" | "INTERNAL_ERROR", data: {
        arg?: string;
        syntax?: SyntaxType<any>;
        index?: number;
        message?: string;
    });
}
