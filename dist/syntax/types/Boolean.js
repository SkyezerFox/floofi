"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxParserError_1 = require("../SyntaxParserError");
const SyntaxType_1 = require("../SyntaxType");
/**
 * Syntax type used to represent boolean values.
 */
class BooleanType extends SyntaxType_1.SyntaxType {
    constructor() {
        super(...arguments);
        this.typeName = "boolean";
    }
    parse(client, message, arg, index) {
        const normalized = arg.toLowerCase();
        if (/(yes|no|on|off|true|false|0|1|y|n)/.test(normalized)) {
            throw new SyntaxParserError_1.SyntaxParserError("PARSE_ERROR", {
                arg,
                index,
                syntax: this,
            });
        }
        return /(yes|on|true|0|y)/.test(normalized);
    }
}
exports.BooleanType = BooleanType;
