"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxParseError_1 = require("../SyntaxParseError");
const SyntaxType_1 = require("../SyntaxType");
exports.DEFAULT_STRINGTYPE_OPTIONS = Object.assign(SyntaxType_1.DEFAULT_SYNTAX_OPTIONS, {
    maxLength: -1,
    minLength: -1,
});
/**
 * Syntax type for representing strings
 */
class StringType extends SyntaxType_1.SyntaxType {
    constructor(name, extras) {
        super(name, extras);
        this.typeName = "string";
        this.options = Object.assign(exports.DEFAULT_STRINGTYPE_OPTIONS, extras);
    }
    parse(client, arg, index) {
        if (this.options.maxLength !== -1) {
            if (arg.length > this.options.maxLength) {
                throw new SyntaxParseError_1.SyntaxParseError("RANGE_ERROR", arg, this, index);
            }
        }
        if (this.options.minLength !== -1) {
            if (arg.length < this.options.minLength) {
                throw new SyntaxParseError_1.SyntaxParseError("RANGE_ERROR", arg, this, index);
            }
        }
        return arg;
    }
}
exports.StringType = StringType;
