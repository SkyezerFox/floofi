"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SyntaxParseError extends Error {
    constructor(type, arg, syntax, position) {
        super("SyntaxParseError");
        this.type = type;
        this.arg = arg;
        this.syntax = syntax;
        this.position = position;
    }
}
exports.SyntaxParseError = SyntaxParseError;
