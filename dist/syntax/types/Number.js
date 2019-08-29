"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxParserError_1 = require("../SyntaxParserError");
const SyntaxType_1 = require("../SyntaxType");
/**
 * Syntax type for representing numbers.
 */
class NumberType extends SyntaxType_1.SyntaxType {
    constructor() {
        super(...arguments);
        this.typeName = "number";
    }
    parse(client, message, arg, index) {
        const int = parseInt(arg, 10);
        if (isNaN(int)) {
            throw new SyntaxParserError_1.SyntaxParserError("PARSE_ERROR", {
                arg,
                index,
                syntax: this,
            });
        }
        return int;
    }
}
exports.NumberType = NumberType;
