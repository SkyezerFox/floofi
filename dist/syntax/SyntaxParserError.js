"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Error for representing floofi syntax errors
 */
class SyntaxParserError extends Error {
    constructor(type, data) {
        super("SyntaxParseError");
        this.type = type;
        this.arg = data.arg;
        this.syntax = data.syntax;
        this.index = data.index;
        this.message = data.message || "";
    }
}
exports.SyntaxParserError = SyntaxParserError;
