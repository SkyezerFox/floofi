import { SyntaxType } from "./SyntaxType";
export declare class SyntaxParseError extends Error {
    type: "RANGE_ERROR" | "PARSE_ERROR" | "VALUE_ERROR" | "INTERNAL_ERROR";
    arg?: string;
    syntax?: SyntaxType<any>;
    position?: number;
    constructor(type: "RANGE_ERROR" | "PARSE_ERROR" | "VALUE_ERROR" | "INTERNAL_ERROR", arg?: string, syntax?: SyntaxType<any>, position?: number);
}
