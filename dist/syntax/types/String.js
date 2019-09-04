"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxParserError_1 = require("../SyntaxParserError");
const SyntaxType_1 = require("../SyntaxType");
exports.DEFAULT_STRINGTYPE_OPTIONS = Object.assign(SyntaxType_1.DEFAULT_SYNTAX_OPTIONS, {
    maxLength: -1,
    minLength: -1,
});
/**
 * Syntax type for representing strings.
 */
class StringType extends SyntaxType_1.SyntaxType {
    constructor(name, extras) {
        // Enable concat
        super(name, Object.assign(exports.DEFAULT_STRINGTYPE_OPTIONS, extras));
        this.typeName = "string";
        if (name === "description") {
            console.log("SUPER CALLED", Object.assign(SyntaxType_1.DEFAULT_SYNTAX_OPTIONS, extras));
            console.log(Object.assign(SyntaxType_1.DEFAULT_SYNTAX_OPTIONS, extras).rest);
            console.log("---------------------------");
        }
        this.options = Object.assign(exports.DEFAULT_STRINGTYPE_OPTIONS, extras);
        if (name === "description") {
            console.log("STRING ASSIGNED", Object.assign(exports.DEFAULT_STRINGTYPE_OPTIONS, extras));
            console.log(Object.assign(exports.DEFAULT_STRINGTYPE_OPTIONS, extras).rest);
            console.log("---------------------------");
        }
    }
    parse(client, message, arg, index) {
        if (this.options.maxLength !== -1) {
            if (arg.length > this.options.maxLength) {
                throw new SyntaxParserError_1.SyntaxParserError("RANGE_ERROR", {
                    arg,
                    index,
                    syntax: this,
                });
            }
        }
        if (this.options.minLength !== -1) {
            if (arg.length < this.options.minLength) {
                throw new SyntaxParserError_1.SyntaxParserError("RANGE_ERROR", {
                    arg,
                    index,
                    syntax: this,
                });
            }
        }
        return arg;
    }
}
exports.StringType = StringType;
