"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxParseError_1 = require("../SyntaxParseError");
const SyntaxType_1 = require("../SyntaxType");
exports.DEFAULT_NUMBERTYPE_OPTIONS = Object.assign(SyntaxType_1.DEFAULT_SYNTAX_OPTIONS, {
    max: -1,
    min: -1,
});
/**
 * Syntax type for representing strings
 */
class NumberType extends SyntaxType_1.SyntaxType {
    constructor(name, extras) {
        super(name, extras);
        this.typeName = "number";
        this.options = Object.assign(exports.DEFAULT_NUMBERTYPE_OPTIONS, extras);
    }
    parse(client, arg, index) {
        const value = parseInt(arg, 10);
        if (isNaN(value)) {
            throw new SyntaxParseError_1.SyntaxParseError("PARSE_ERROR", arg, this, index);
        }
        if (this.options.max !== -1) {
            if (arg.length > this.options.max) {
                throw new SyntaxParseError_1.SyntaxParseError("RANGE_ERROR", arg, this, index);
            }
        }
        if (this.options.min !== -1) {
            if (arg.length < this.options.min) {
                throw new SyntaxParseError_1.SyntaxParseError("RANGE_ERROR", arg, this, index);
            }
        }
        return arg;
    }
}
exports.NumberType = NumberType;
